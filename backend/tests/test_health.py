"""GET /health, as the contract defines it (operationId getHealth)."""

from fastapi.testclient import TestClient
from sqlalchemy import create_engine

from app import main
from app.db import database_url

client = TestClient(main.app)


def test_health_ok_with_the_real_database(database):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "database": "ok"}


def test_health_says_database_down_when_it_is_unreachable(monkeypatch):
    # Port 1 on this machine is closed, so the connection is refused at once (CI can't stop its database).
    dead = create_engine(
        database_url("postgresql://postgres:postgres@127.0.0.1:1/twen_test"),
        connect_args={"connect_timeout": 2},
    )
    monkeypatch.setattr(main, "engine", dead)
    response = client.get("/health")
    assert response.status_code == 503
    assert response.json() == {"status": "ok", "database": "down"}
