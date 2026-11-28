---
issue: 46
title: "Predictor interface: agree the port with Henry"
workstream: architecture
owner: Eric Sunu
status: in-progress
milestone: M2 Core demo
depends_on: none
---

# Predictor interface: agree the port with Henry

Issue: [#46](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/46). Part of [#7](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/7).

## Goal

Fix how the backend asks for a predicted wait, so Henry (#9) and the backend (#51) can each build their side alone. This is the "interface for the intelligent component" in #7. Rubric: System Design (8%).

## Done when

- [x] `docs/architecture/predictor-interface.md` defines an in-process `predict(snapshot) -> WaitRange`.
- [x] Inputs listed: position, staff on duty, rolling mean service time, time of day, weekday, recent service rate.
- [x] Output: a low to high range and the method, matching `WaitRange` in the contract.
- [x] Latency budget under 50 ms at p95, with a fall back to the naive rule.
- [x] How the learned model ships: a joblib file loaded behind the same port.
- [ ] Henry agrees, in a comment or a review.

## Inputs and outputs

- **Uses:** the proposal's intelligent component section, the contract's `WaitRange` (#44), the scope cut.
- **Produces:** `docs/architecture/predictor-interface.md`, used by #9 and #51.

## Steps

1. Write the port, inputs, output, budget and fallback.
2. State what Henry's file must contain.
3. Ask Henry four questions in the PR, and change the doc to his answers.

## Out of scope

- The adapters' code and their range formulas (#51).
- Training or evaluating the model (#9).

## Log

- 2026-11-24: Draft written; PR opened for Henry's review.
