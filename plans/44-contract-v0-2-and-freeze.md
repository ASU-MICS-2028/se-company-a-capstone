---
issue: 44
title: "Contract v0.2: fix the ticket states and the gaps, then freeze"
workstream: architecture
owner: Eric Sunu
status: in-progress
milestone: M2 Core demo
depends_on: "#43"
---

# Contract v0.2: fix the ticket states and the gaps, then freeze

Issue: [#44](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/44). Part of [#7](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/7).

## Goal

Turn Joseph's draft (#43) into a contract that backend (#8), frontend (#10) and the availability maths (#12) can build against without it moving. Rubric: System Design (8%).

## Done when

- [x] Ticket states are `waiting → notified → arrived → called → seen`, plus `no_show` and `cancelled`. Desk tickets start as `arrived`.
- [x] `call-next` takes the first arrived ticket in queue order.
- [x] Notified patients keep their place until a hold window runs out, and the window is stated (`holdUntil`, `graceMinutes`).
- [x] Staff can set staff on duty (`PATCH /clinics/{clinicId}`).
- [x] A ticket shows its SMS delivery state (`smsStatus`).
- [x] Every event carries `actorId`.
- [x] Repeating a transition returns 200, not 409. Every board write accepts `Idempotency-Key`.
- [x] Ticket code format stated, with a daily counter per clinic.
- [x] USSD replies have a stated length limit.
- [x] Redocly passes with no warnings (two deliberate ignores in `.redocly.lint-ignore.yaml`).
- [ ] Callback-secret risk raised on #11.
- [ ] Reviewed by Kobina, Henry and Joseph, then the freeze decision set to accepted.

## Inputs and outputs

- **Uses:** the v0.1 draft (#43), the scope cut decision, the proposal's use case (step 6, delayed SMS).
- **Produces:** `docs/architecture/openapi.yaml` v0.2, two decision files, `.redocly.lint-ignore.yaml`.

## Steps

1. Branch from #43's branch, so the work doesn't wait for #43 to merge.
2. Apply the review points from #43, one at a time, and lint after each.
3. Check by script that every staff write takes an `Idempotency-Key`.
4. Open the PR against #43's branch and ask the three consumers to review.

## Out of scope

- Implementing any endpoint (that is #49 onward).
- The predictor's internal interface (#46).

## Log

- 2026-11-24: v0.2 written and linted; PR opened for review.
