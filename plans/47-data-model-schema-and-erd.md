---
issue: 47
title: "Data model: schema and ERD"
workstream: architecture
owner: Eric Sunu
status: in-progress
milestone: M2 Core demo
depends_on: "#44"
---

# Data model: schema and ERD

Issue: [#47](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/47). Part of [#7](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/7).

## Goal

Design the PostgreSQL tables behind API contract v0.2, with the rules the database itself enforces, so the backend (#49, #50, #52) builds on a schema that is already tested. Rubric: System Design (8%).

## Done when

- [x] Tables for clinic, ticket, event (append-only, `seq` per clinic), outbox and staff user, plus whatever idempotency needs.
- [x] Keys, constraints and indexes stated, including the daily ticket counter per clinic and a unique idempotency key.
- [x] An ERD in `docs/architecture/`, kept as editable source (Mermaid, in `data-model.md`).
- [ ] Matches contract v0.2 field for field. The field map in `data-model.md` matches v0.2 as it stood in PR #55 on 27 Nov. Tick this once the contract is frozen and the map is rechecked.

## Inputs and outputs

- **Uses:** contract v0.2 (PR #55, not yet frozen), the stack and outbox decisions (PR #57), the predictor interface (PR #56).
- **Produces:** `docs/architecture/data-model.md` (tables, ERD, rules, field map, open questions), `docs/architecture/data-model-check.sh` (40 checks on PostgreSQL 16), one decision (event seq) and one learning (`SKIP LOCKED`).

## Steps

1. Read the contract and the proposed decisions, and list every field the API returns.
2. Write the tables, and check each against PostgreSQL 16 in Docker.
3. Prove each rule with two sessions where there is a race: one active ticket per phone, the daily counter, seq order, the outbox key, `call-next`, idempotency keys.
4. Open a draft PR, and update it if the contract review changes v0.2.
5. Get the open questions answered in review.

## Out of scope

- The Alembic migration and the SQLAlchemy models (#49).
- The endpoints and the state table in code (#50), and the worker (#52).
- New contract fields, such as an endpoint to close the day (open question 1).

## Log

- 2026-11-27: Draft written and tested (40 checks pass on PostgreSQL 16); draft PR opened.
