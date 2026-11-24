# Predictor interface: how the backend asks for a wait time

**Status:** proposed, for Henry (#9) to agree. Issue [#46](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/46), part of [#7](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/7).

## What it is

The backend asks one question many times a minute: *how long will this ticket wait?* It asks through one **port**, an interface written in the queue's own terms ([hexagonal architecture](../../knowledge/hexagonal-architecture-ports-and-adapters.md)). Three **adapters** can answer:

| Adapter | `method` | What it does | Built in |
|---|---|---|---|
| Naive | `naive` | position × mean service time ÷ staff on duty (proposal, intelligent component) | #51 |
| M/M/c | `mmc` | the queueing formula (Erlang C) | #51 |
| Learned model | `gbm` | Henry's gradient-boosting model, loaded from a file | #9 trains it, #51 loads it |

The queue code never knows which one answered. That lets Henry's model replace M/M/c without touching the queue, and it lets the paper compare all three on the same inputs.

## The port

```python
from dataclasses import dataclass
from datetime import datetime
from typing import Literal, Protocol

@dataclass(frozen=True)
class QueueSnapshot:
    position: int                # 1 = first in calling order
    staff_on_duty: int           # the c in M/M/c; always 1 or more here
    mean_service_minutes: float  # rolling mean of recent consultations
    recent_service_rate: float   # patients seen per hour in the last 60 minutes; 0 if none
    at: datetime                 # when the prediction is made, timezone-aware (UTC)

@dataclass(frozen=True)
class WaitRange:
    low_minutes: int             # 0 <= low_minutes <= high_minutes
    high_minutes: int
    method: Literal["naive", "mmc", "gbm"]

class Predictor(Protocol):
    def predict(self, snapshot: QueueSnapshot) -> WaitRange: ...
```

## Inputs

| Field | Where the backend gets it |
|---|---|
| `position` | the ticket's place among `waiting`, `notified` and `arrived` tickets (`Ticket.position` in the [contract](openapi.yaml)) |
| `staff_on_duty` | `Clinic.staffOnDuty`, set by staff during the day. When it is 0, the backend does not call `predict`, and `predictedWait` is null |
| `mean_service_minutes` | `Clinic.meanServiceMinutes`: the mean of recent consultations (`calledAt` to `closedAt` of `seen` tickets). #51 sets how many it averages |
| `recent_service_rate` | the count of `seen` events in the last 60 minutes |
| `at` | the clock. Adapters derive the hour of day and the weekday from it. Ghana is UTC+0 all year, so local time equals UTC |

These are the features the proposal lists for the model: time of day, weekday, position, staff on duty and recent service times.

## Output

A `WaitRange` in whole minutes, with `0 <= low_minutes <= high_minutes`. The backend turns it into the contract's `WaitRange` by adding clock times (`expectedFrom = at + low_minutes`). It is always a range, never one number (proposal §5). Each adapter documents how it picks its range.

## Speed budget and fallback

- `predict` runs **in-process**: no network call and no disk read per call. Adapters load anything they need once, at start-up.
- **Budget: under 50 ms at the 95th percentile** (95 calls in 100 finish within it). #51 measures it with a test over 1,000 snapshots.
- If an adapter raises an error, returns a bad range, or goes over budget, the backend answers with the **naive** adapter instead, sets `method: naive`, and logs why. The naive rule is the fallback because it is plain arithmetic and cannot fail on valid input.
- Which adapter is active is one setting: `PREDICTOR=mmc` (the default), `naive` or `gbm`.

## The learned model's file

Serving the model live is a **Should** in the scope cut. Henry's must-have is the offline evaluation. When the model is ready to serve, Henry ships two files in `intelligence/models/`:

- `wait_gbm.joblib`: a dict `{"low": model, "high": model}`. Each is a scikit-learn regressor with `.predict(X)`, for example `GradientBoostingRegressor(loss="quantile", alpha=0.25)` for `low` and `alpha=0.75` for `high`.
- `wait_gbm.json`: the feature order, the scikit-learn version, the training date, and the held-out MAE and share within ±15 minutes.

The feature order is `[position, staff_on_duty, mean_service_minutes, recent_service_rate, hour_of_day, weekday]`. `hour_of_day` is a decimal (9.5 means 09:30), and `weekday` runs from 0 (Monday) to 6.

Two rules come with the file:

- **Pin the same scikit-learn version** in `backend/requirements.txt` and `intelligence/requirements.txt`. A joblib file saved under one version may fail to load, or predict differently, under another.
- **Load only our own file.** `joblib.load` can run code stored in the file, so the backend never loads one from an upload or a URL.

## Who builds what

- **Eric (#51):** the port, the naive and M/M/c adapters, the adapter that loads Henry's file, the fallback and the speed test.
- **Henry (#9):** the model, its offline evaluation against both baselines, and the two files above.

## Questions for Henry

1. Are these six features (the snapshot's five fields, with `at` split into hour and weekday) the ones your model uses? Is anything missing that the backend can supply?
2. Is a dict of two quantile models workable, or would you rather ship one point estimate plus an error band?
3. Which percentiles should make the range? This draft proposes the 25th and 75th.
4. Is 50 ms at p95 realistic for your model on a laptop?
