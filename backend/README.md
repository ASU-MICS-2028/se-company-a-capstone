# Backend

The Twɛn API, built to the contract in [`docs/architecture/openapi.yaml`](../docs/architecture/openapi.yaml).
The stack is the one proposed in PR #57 (not yet agreed by the team): Python 3.12, FastAPI with synchronous
endpoints, SQLAlchemy 2 with the psycopg 3 driver, Alembic migrations and PostgreSQL 16.

For now it serves one route, `GET /health`. Tables come in #50, the other endpoints after that.

## What each file does

| File | What it does |
|---|---|
| `app/main.py` | The API's routes. Each one must match an operation in the contract. |
| `app/db.py` | The one database engine, built from `DATABASE_URL`. The API and Alembic both use it. |
| `migrations/` | Alembic. `versions/0001_baseline.py` is an empty starting point; #50 adds the tables. |
| `alembic.ini` | Alembic settings. It has no database URL: that comes from `DATABASE_URL`. |
| `tests/` | pytest: `/health`, the contract-drift check and the migrations. |
| `compose.yaml` | A local PostgreSQL 16 with the same user, password and database as CI. |
| `requirements.txt` | Pinned dependencies. CI installs this file plus ruff and pytest, nothing else. |
| `pytest.ini`, `ruff.toml` | Make plain `pytest -q` (in `backend/`) and `ruff check backend` (from the repo root) work as in CI. |

## Run it

You need Python 3.12 (the version CI uses) and Docker. From `backend/`:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt ruff pytest
docker compose up -d --wait
alembic upgrade head
uvicorn app.main:app --reload
```

Open http://localhost:8000/health. You should see `{"status":"ok","database":"ok"}`.
Stop the database (`docker compose stop`) and it answers 503 with `{"status":"ok","database":"down"}`.
FastAPI also shows its own view of the API at http://localhost:8000/docs, but the contract file is the source of truth.

## Test it

With the database running, from `backend/`:

```bash
pytest -q
```

With no database, the two database tests are skipped on a laptop. In CI (where `CI=true`) they fail instead,
because a missing database there means the pipeline is broken.

From the repo root, the way CI runs it:

```bash
ruff check backend
```

## The database URL

`DATABASE_URL` defaults to CI's value, `postgresql://postgres:postgres@localhost:5432/twen_test`.
Set it to use another database. A plain `postgresql://` URL is fine: `app/db.py` switches it to the psycopg 3 driver.

**Port 5432 already taken?** If PostgreSQL already runs on your machine, Compose can't use 5432. Use 5433 instead,
in the same terminal, before the commands above:

```bash
export TWEN_DB_PORT=5433
export DATABASE_URL=postgresql://postgres:postgres@localhost:5433/twen_test
```

## Add a migration

```bash
alembic revision -m "add tickets"
alembic upgrade head
```

Alembic runs `ruff check --fix` on each new migration file, so it passes CI's lint.
Once #50 sets `target_metadata` in `migrations/env.py`, add `--autogenerate` to write the changes for you.

## Stop

```bash
docker compose down -v
```

This deletes the container and its data. The next `up` starts with an empty database.
