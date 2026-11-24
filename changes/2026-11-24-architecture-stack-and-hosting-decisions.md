---
title: Architecture style, backend stack, outbox worker and hosting decisions (proposed)
date: 2026-11-24
owner: Eric Sunu
contributors: none
issue: "#45"
pr: "#57"
ai_used: yes
---

# Architecture style, backend stack, outbox worker and hosting decisions (proposed)

## What changed

Four new decision files, all marked proposed until the team agrees:

- [Modular monolith with a hexagonal core and a transactional outbox](../decisions/2026-11-24-architecture-modular-monolith-with-hexagonal-core.md), with a trade-off table.
- [Backend stack: synchronous FastAPI and PostgreSQL](../decisions/2026-11-24-backend-stack-sync-fastapi-and-postgres.md), including the programming-model justification.
- [The outbox worker is a separate polling process](../decisions/2026-11-24-outbox-worker-is-a-separate-polling-process.md).
- [A tunnel for development and an always-on free demo host](../decisions/2026-11-24-dev-tunnel-and-an-always-on-free-demo-host.md), with the host itself still to be chosen by 30 Nov.

## Why

#7 needs the stack and programming-model rationale in `decisions/`, and the rubric asks us to combine styles and justify each one. See [#45](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/45).

## Who did what

| Person | Part |
|---|---|
| Eric Sunu | The stack review these records come from (sync FastAPI, PostgreSQL, a separate worker, deciding hosting now). Dropping the database port, the fixed-address tunnel and the host candidates are Claude Code's proposals. Final check: not yet done |
| The team | Reviews and agrees, or proposes changes |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| The four decision files | Claude Code | Drafted them from Eric's stack review notes, the proposal and the lecture notes; suggested the hosting candidates (unverified) | not yet checked |

## How to check it

Read the four files. Each should state one decision, the options rejected and why, and link the lecture note it relies on. `python3 scripts/index.py --check` should pass.
