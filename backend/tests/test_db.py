"""database_url() picks psycopg 3 for PostgreSQL and refuses any other database. No database needed."""

import pytest

from app.db import database_url


@pytest.mark.parametrize(
    "raw",
    [
        "postgresql://u:p@db:5432/twen",
        "postgresql+psycopg2://u:p@db:5432/twen",
        "postgres://u:p@db:5432/twen",
    ],
)
def test_postgres_urls_use_psycopg_3(raw):
    url = database_url(raw)
    assert url.drivername == "postgresql+psycopg"
    assert (url.host, url.database) == ("db", "twen")


@pytest.mark.parametrize("raw", ["sqlite:///twen.db", "mysql://u:p@db/twen"])
def test_other_databases_are_refused(raw):
    with pytest.raises(ValueError, match="PostgreSQL"):
        database_url(raw)
