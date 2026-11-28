"""The Twɛn API. Each route matches an operation in docs/architecture/openapi.yaml."""

import logging

from fastapi import FastAPI, Response
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.db import engine

log = logging.getLogger(__name__)
app = FastAPI(title="Twɛn Queue API")


@app.get("/health", operation_id="getHealth")
def get_health(response: Response):
    """Liveness and database check.

    The process answers, so status is always "ok". If the database can't run `select 1`,
    the answer is 503 with database "down", so monitoring can tell the two apart.
    """
    try:
        with engine.connect() as conn:
            conn.execute(text("select 1"))
    except SQLAlchemyError as exc:
        log.warning("health check: database unreachable: %s", exc)
        response.status_code = 503
        return {"status": "ok", "database": "down"}
    return {"status": "ok", "database": "ok"}
