---
title: A plain postgresql:// URL makes SQLAlchemy use psycopg2, so name psycopg 3 in code
date: 2026-11-27
owner: Eric Sunu
tags: [backend, database, ci]
issue: "#49"
---

# A plain postgresql:// URL makes SQLAlchemy use psycopg2, so name psycopg 3 in code

## What happened

The backend scaffold (#49, PR #65) installs psycopg 3, the newer PostgreSQL driver. CI and most hosts give the database address as `postgresql://...`. With that plain prefix, SQLAlchemy reaches for the older psycopg2 driver, which we don't install, so the app can't connect.

## What we learned

The driver is part of the URL: `postgresql+psycopg://` means psycopg 3, while plain `postgresql://` means psycopg2. Rather than make every environment spell the driver, `backend/app/db.py` reads `DATABASE_URL` as given and sets the driver in one place (`make_url(...).set(drivername="postgresql+psycopg")`). Alembic reuses the same engine, so migrations and the app always agree.

## Do this next time

Keep `DATABASE_URL` in the plain form everywhere (CI, Compose, the demo host) and let `app/db.py` choose the driver. Never build a second engine with its own URL handling.

## Related

- [Backend stack decision](../decisions/2026-11-24-backend-stack-sync-fastapi-and-postgres.md) (in PR #57)
