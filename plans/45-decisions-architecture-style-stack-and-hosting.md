---
issue: 45
title: "Decisions: architecture style, stack and hosting"
workstream: architecture
owner: Eric Sunu
status: in-progress
milestone: M2 Core demo
depends_on: none
---

# Decisions: architecture style, stack and hosting

Issue: [#45](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/45). Part of [#7](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/7).

## Goal

Record the system's shape and tools as decisions, so the team builds one thing and the paper can cite why. Rubric: Architecture and Design (5%).

## Done when

- [x] Decision: modular monolith with a hexagonal core and a transactional outbox; microservices and serverless rejected, with reasons.
- [x] A trade-off table by optimisation goal and operating cost.
- [x] Decision: FastAPI on Python 3.12, synchronous endpoints, SQLAlchemy 2, psycopg 3, Alembic, PostgreSQL 16.
- [x] Decision: the outbox worker is a separate polling process with `SKIP LOCKED`; no Redis, Celery or Kafka.
- [x] Decision: tunnel for development and a **named** free host for the demo (the host is chosen by 30 Nov).
- [ ] Team agrees, and each decision's status is set to accepted.

## Inputs and outputs

- **Uses:** the proposal (§6), Eric's stack review, the lecture notes on styles, threads and processes, outbox and idempotency.
- **Produces:** four files in `decisions/`, used by #48, #49, #51 and #52.

## Steps

1. Write one decision per idea, building on the proposal's style rather than replacing it.
2. Open a PR for the team to review, and raise it at the next stand-up.
3. Check the hosting candidates and name the host by 30 Nov.

## Out of scope

- Building any of it (#49 onward).
- The frontend's hosting (Kobina, #10), unless it shares the demo host.

## Log

- 2026-11-24: Four decisions drafted as proposed; PR opened for team review.
- 2026-11-27: Hosting candidates checked against official pages. Named Oracle Cloud Always Free (Arm VM) for the demo, Azure for Students as the no-card fallback, and ngrok's free dev domain for development. Still proposed; a teammate tries the Oracle sign-up by 30 Nov.
