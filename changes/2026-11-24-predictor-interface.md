---
title: Predictor interface draft, for Henry to agree
date: 2026-11-24
owner: Eric Sunu
contributors: none
issue: "#46"
pr: "#PR"
ai_used: yes
---

# Predictor interface draft, for Henry to agree

## What changed

New file `docs/architecture/predictor-interface.md`. It defines the one port the backend uses to ask for a wait time, `predict(snapshot) -> WaitRange`: its five inputs, its output, a 50 ms budget, the fall back to the naive rule, and what Henry's model file must contain.

## Why

#7 must state the interface for the intelligent component. Henry (#9) and the backend (#51) can then build their sides without waiting for each other. See [#46](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/46).

## Who did what

| Person | Part |
|---|---|
| Eric Sunu | The port's shape, inputs and budget, from his review of #43 |
| Henry Kofi Brandoh | Reviews it and answers the four questions |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| `predictor-interface.md` | Claude Code | Wrote the doc from Eric's notes and the proposal, including the model-file rules and the questions for Henry | not yet checked |

## How to check it

Read `docs/architecture/predictor-interface.md`. The inputs should match the features in the proposal's intelligent component section. The output should match `WaitRange` in `docs/architecture/openapi.yaml` (PR #55).
