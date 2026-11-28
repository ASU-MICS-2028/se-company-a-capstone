---
title: "Staff actions on the board: call next, check in, done, missed, move up, and a log"
date: 2026-11-27
owner: Kobina Opei Jr.
contributors: none
issue: "#10"
pr: "#67"
ai_used: yes
---

# Staff actions on the board: call next, check in, done, missed, move up, and a log

## What changed

- **Call next patient**: one button above the list. It calls the first patient who has **checked in**, never someone still travelling (contract v0.2). If nobody has checked in, it says so.
- **Row buttons**, by status:
  - Booked: Check in, Move up. Mark missed appears only once the patient is Late (their hold window has passed), and never when their text failed, so staff hold that place.
  - Arrived: Move up.
  - At desk: Mark done, Mark missed.
- **Mark missed asks first** ("Yes, mark B-005 missed" or "Keep"), because it can't be undone.
- **Move up** opens a dialog: new place, a reason (Priority, Emergency, Correcting a mistake, Other) and an optional note that warns "Don't write symptoms or a diagnosis". The reason is required.
- **Logged today**: every staff action, newest first, with the time, what happened, the reason for a move and who did it.
- **Safe on a weak network**: each tap gets its own idempotency key. If the answer is lost, the board retries once with the same key, so the action can't happen twice. A second tap while the first is running is ignored.
- The mock backend now does all six staff writes with the contract's rules: allowed moves, 409 for a forbidden move, 422 for a bad request, repeats that are harmless, and an event for every change.

## Why

Step 4 of the #10 plan: "Add buttons to call the next patient, mark a no-show and move someone up, and log every move."

## Who did what

| Person | Part |
|---|---|
| Kobina Opei Jr. | Owns #10, set the step, reviews and merges |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| Mock staff writes | Claude Code | Wrote the six actions from the contract's state table and "Safe to repeat" rules | Not yet checked |
| Buttons, dialog, log | Claude Code | Built them from the S02, S04, S05 and S07 prototypes, within what the contract supports | Not yet checked |
| Review fixes from Joseph's review | Claude Code | Focus now lands on "Yes, mark … missed" and returns to "Mark missed" after Keep. The double-tap guard uses a ref. The Move up dialog can't close while a move is on its way. The 15-second refresh asks only for new log events (`after=<last seq>`). Three new tests, each checked to fail without its fix. | Not yet checked |
| Tests (36 new, 69 in all) | Claude Code | Wrote tests for every action, refusals, the retry with the same key, double taps, the dialog's keyboard use and focus. Checked that the retry and double-tap tests fail when their guards are removed. | Not yet checked |

## How to check it

```bash
cd frontend
npm ci
npm run lint && npm run typecheck && npm test && npm run build
npm run dev   # open http://localhost:5173/staff
```

Tests end with `69 passed | 3 skipped`. On the page: press "Call next patient" and B-006 turns "At desk", and "Logged today" shows it. Press "Move up" on B-013, pick a reason, and it moves to place 1, with the reason logged. Press Escape in the dialog and focus goes back to the button.
