---
title: Backend scaffold with GET /health, Alembic and tests
date: 2026-11-27
owner: Eric Sunu
contributors: none
issue: "#49"
pr: "#<PR number, once open>"
ai_used: yes
---

# Backend scaffold with GET /health, Alembic and tests

## What changed

`backend/` now exists, so CI starts running ruff and pytest on it.

- A FastAPI app with one route, `GET /health`. It answers 200 `{"status":"ok","database":"ok"}` when the database works, and 503 `{"status":"ok","database":"down"}` when it doesn't.
- One database engine (`app/db.py`), built from `DATABASE_URL`. A plain `postgresql://` URL, as CI gives, is switched to the psycopg 3 driver.
- Alembic, with an empty baseline migration (`0001`). #50 adds the tables.
- `compose.yaml` for a local PostgreSQL 16 with the same database as CI.
- Four tests: health with the real database, health with the database unreachable, contract drift (the app may not serve a route `openapi.yaml` doesn't list), and Alembic upgrade then downgrade.
- `backend/README.md` with the run and test commands.

It follows the stack proposed in PR #57 (not yet agreed). If the team changes that decision, this scaffold changes with it.

## Why

Sprint 2 backlog item 6 and issue #49: a walking skeleton, so each later endpoint is a small PR with tests already in place.

## A question for the contract (PR #55)

`/health` is the same in v0.1 and v0.2; v0.2 only adds a description. The contract's 503 ("Database unreachable") has no body, but the 200 body lists `down` as a value of `database`. The app sends the health body with the 503, with `database` set to `down`. Proposal for the v0.2 review: give the 503 the same schema, or drop `down` from the 200. `openapi.yaml` is not edited here, because PR #55 is changing it.

## Who did what

| Person | Part |
|---|---|
| Eric Sunu | Owns #49 and #8; reviews and defends the scaffold |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| App, database engine, Alembic, Compose, pinned requirements | Claude Code | Wrote them, following the stack proposed in PR #57 and the contract's `/health` | not yet checked |
| Tests | Claude Code | Wrote the four tests, ran each one failing before its code existed, then passing, against PostgreSQL 16 from `compose.yaml` | not yet checked |
| README, plan and this file | Claude Code | Drafted them | not yet checked |

## How to check it

From `backend/`, with Python 3.12 and Docker:

```bash
python3.12 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt ruff pytest
docker compose up -d --wait
pytest -q
```

You should see `4 passed`. Then, from the repo root, `ruff check backend` should say `All checks passed!`.
On this PR, the `code / python (backend)` check should show the four tests passing, not "skipping".
