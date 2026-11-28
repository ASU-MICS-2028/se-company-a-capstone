"""Alembic can upgrade the real database to the newest migration, back down again, and up again."""

from pathlib import Path

from alembic import command
from alembic.config import Config
from alembic.script import ScriptDirectory
from sqlalchemy import text

ALEMBIC_INI = Path(__file__).resolve().parents[1] / "alembic.ini"


def test_upgrade_to_head_then_downgrade_to_base(database):
    config = Config(str(ALEMBIC_INI))
    head = ScriptDirectory.from_config(config).get_current_head()

    try:
        command.upgrade(config, "head")
        with database.connect() as conn:
            assert conn.execute(text("select version_num from alembic_version")).scalar_one() == head

        command.downgrade(config, "base")
        with database.connect() as conn:
            assert conn.execute(text("select count(*) from alembic_version")).scalar_one() == 0
    finally:
        # Leave the database at head, whatever happened above, so later table tests find their tables.
        command.upgrade(config, "head")
