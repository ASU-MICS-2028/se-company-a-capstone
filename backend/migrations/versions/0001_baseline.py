"""Baseline: an empty schema.

Later migrations start from here. #50 adds the tables.

Revision ID: 0001
Revises:
Create Date: 2026-11-27 22:09:55.676177

"""

from collections.abc import Sequence

# revision identifiers, used by Alembic.
revision: str = "0001"
down_revision: str | Sequence[str] | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Nothing to create yet."""


def downgrade() -> None:
    """Nothing to drop."""
