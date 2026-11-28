---
title: "Backend stack: FastAPI with synchronous endpoints, SQLAlchemy 2, psycopg 3, Alembic and PostgreSQL 16"
date: 2026-11-24
status: proposed
deciders: Eric Sunu (#8), for the team to agree
issue: "#45"
ai_used: yes
---

# Backend stack: FastAPI with synchronous endpoints, SQLAlchemy 2, psycopg 3, Alembic and PostgreSQL 16

## Context

The proposal (§6) picked FastAPI, PostgreSQL and scikit-learn, and described the programming model as "async webhook handlers". CI already runs Python 3.12 against PostgreSQL 16 (`.github/workflows/code.yml`). The brief asks for a programming-model justification: thread-based or event-loop async, and why ([threads vs processes](../knowledge/threads-vs-processes.md)). Load is one clinic: at most a few requests a second.

## Decision

- **Python 3.12 and FastAPI**, because Henry's model is scikit-learn and the predictor runs in-process ([predictor interface](../docs/architecture/predictor-interface.md)).
- **Synchronous endpoints (`def`, not `async def`).** FastAPI runs each synchronous endpoint on a thread from its pool, so one slow request does not block the others. That is the thread-based model, and it is plenty for one clinic.
- **PostgreSQL 16**, reached through **SQLAlchemy 2** with the **psycopg 3** driver. Schema changes go through **Alembic** migrations.
- **Concurrency is the database's job.** Each request is one transaction. `call-next` locks the row it calls (`SELECT ... FOR NO KEY UPDATE SKIP LOCKED`), so two nurses tapping at the same moment call two different patients, never the same one twice. The lighter `FOR NO KEY UPDATE` matters: a test for the data model (#47, PR #62) showed that plain `FOR UPDATE` also skips a ticket while an event about it is being saved. The outbox worker locks its rows the same way, so the code uses one lock mode everywhere.

This changes one line of the proposal: the handlers are synchronous, not async.

## Options we rejected

- **Async endpoints (`async def`, asyncpg):** async pays off with thousands of open connections. At clinic scale it adds a second way to block (one sync call inside async code stalls everything), and it is harder to test and to explain at ASERC.
- **SQLite:** it has no `SKIP LOCKED`, which the outbox worker and `call-next` rely on, and CI already provides PostgreSQL.
- **Supabase as the backend:** fine as a hosted PostgreSQL for staging, but the queue rules, the outbox and idempotency must live in our code, where we can test and defend them.
- **Django:** more built in than we need, and the contract-first OpenAPI flow fits FastAPI better.

## Consequences

- #49 sets up `backend/requirements.txt` with these libraries pinned, Docker Compose for a local PostgreSQL 16, and a first Alembic migration.
- The contract stays hand-written in `docs/architecture/openapi.yaml`. A test in #49 compares it with the app's routes, so they cannot drift.
- If load ever needs async, FastAPI allows moving one endpoint at a time.

## AI use

Claude Code drafted this record from Eric's stack review notes and the proposal. The team reviews it in the pull request.
