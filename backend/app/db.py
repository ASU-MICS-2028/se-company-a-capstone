"""The one database engine, shared by the API and by Alembic."""

import os

from sqlalchemy import create_engine
from sqlalchemy.engine import URL, make_url

# Same database as CI (.github/workflows/code.yml) and compose.yaml.
DEFAULT_URL = "postgresql://postgres:postgres@localhost:5432/twen_test"


def database_url(raw: str | None = None) -> URL:
    """DATABASE_URL, set to use the psycopg 3 driver.

    CI and most hosts give a plain postgresql:// URL. SQLAlchemy would open that with the
    older psycopg2 driver, which we don't install, so we name psycopg 3 here.
    """
    return make_url(raw or os.environ.get("DATABASE_URL", DEFAULT_URL)).set(drivername="postgresql+psycopg")


# pool_pre_ping: test a pooled connection before use, so a database restart doesn't break the next request.
# ponytail: connect_timeout=2 s keeps /health quick when the database is gone; raise it if a remote host is slow to connect.
engine = create_engine(database_url(), pool_pre_ping=True, connect_args={"connect_timeout": 2})
