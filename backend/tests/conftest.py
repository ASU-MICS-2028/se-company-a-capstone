"""Shared test setup."""

import os

import pytest
from sqlalchemy.exc import OperationalError

from app.db import engine


@pytest.fixture
def database():
    """Skip a test that needs PostgreSQL when none is running on this machine.

    In CI (GitHub sets CI=true) a missing database is a broken pipeline, not a reason to skip,
    so the error is raised and the test fails.
    """
    try:
        with engine.connect():
            pass
    except OperationalError:
        if os.environ.get("CI"):
            raise
        pytest.skip("PostgreSQL is not running (see backend/README.md)")
    return engine
