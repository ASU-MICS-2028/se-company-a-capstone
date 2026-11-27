---
issue: 49
title: "Backend scaffold: FastAPI, Postgres, Alembic, /health and tests"
workstream: backend
owner: Eric Sunu
status: in-progress
milestone: M2 Core demo
depends_on: 45
---

# Backend scaffold: FastAPI, Postgres, Alembic, /health and tests

Issue: [#49](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/49). Part of [#8](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/8).

## Goal

Set up `backend/` so every later endpoint is a small PR: an app, a database, migrations, tests and CI that runs them.
It is Sprint 2 backlog item 6 (`docs/scrum/sprint-2-backlog.md`). Rubric: Functionality (10%) and Code Quality (5%), through #8.

## Done when

- [x] `backend/` with a FastAPI app and `backend/requirements.txt`.
- [x] Docker Compose runs PostgreSQL 16 locally, with `DATABASE_URL` as in CI.
- [x] Alembic set up, with a first migration.
- [x] `GET /health` returns the contract's shape, including when the database is down.
- [x] pytest and ruff pass locally and in CI.
- [x] A test fails if the app serves a route the contract doesn't list (contract drift).
- [x] `backend/README.md`: how to run and test it.

## Inputs and outputs

- **Uses:** the stack proposed in #45 (PR #57, not yet agreed); `/health` in `docs/architecture/openapi.yaml`, which is the same in v0.1 (`main`) and v0.2 (PR #55); CI in `.github/workflows/code.yml`.
- **Produces:** `backend/`, which #50 (tables), the endpoint issues and #52 (outbox worker) build on.

## Steps

1. Pin the stack in `backend/requirements.txt`, from a clean Python 3.12 install.
2. Write the tests first and watch them fail: `/health` up, `/health` with the database down, contract drift, migrations.
3. Add the database engine and `GET /health`, until the tests pass.
4. Set up Alembic with an empty baseline migration.
5. Add Compose for a local PostgreSQL 16, and the README.
6. Run ruff and pytest the way CI does, then open the PR.

## Out of scope

- Tables and models (#50), and every endpoint other than `/health`.
- The outbox worker (#52), staff login and hosting (#45).
- Changing the contract. The 503 body question goes to PR #55.

## Log

- 2026-11-27: Plan created. Scaffold built and tested locally; PR #65 opened; CI green (4 tests passed).
