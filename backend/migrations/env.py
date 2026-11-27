"""Alembic runs each migration against the app's own database engine (app/db.py)."""

from logging.config import fileConfig

from alembic import context

from app.db import engine

if context.config.config_file_name is not None:
    # Keep loggers that already exist (the app's), so running migrations from a test doesn't silence them.
    fileConfig(context.config.config_file_name, disable_existing_loggers=False)

# #50 sets this to the tables' MetaData, so `alembic revision --autogenerate` can compare them.
target_metadata = None

# Simplification: online mode only (no `alembic upgrade --sql` scripts). Add offline mode if we need SQL files to review.
with engine.connect() as connection:
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()
