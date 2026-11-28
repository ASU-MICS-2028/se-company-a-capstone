"""Contract drift: the app must not serve a route that docs/architecture/openapi.yaml doesn't list.

Only this direction is checked. Routes in the contract that aren't built yet are fine until #8 is done.
"""

from pathlib import Path

import yaml
from fastapi.routing import APIRoute

from app.main import app

CONTRACT = Path(__file__).resolve().parents[2] / "docs" / "architecture" / "openapi.yaml"
HTTP_METHODS = {"get", "put", "post", "delete", "patch", "head", "options", "trace"}


def test_app_serves_only_routes_the_contract_lists():
    paths = yaml.safe_load(CONTRACT.read_text(encoding="utf-8"))["paths"]
    listed = {(method.upper(), path) for path, item in paths.items() for method in item if method in HTTP_METHODS}
    # Our routes are APIRoutes. FastAPI's own /docs, /redoc and /openapi.json are plain routes, so they're skipped.
    # A route hidden from FastAPI's docs (include_in_schema=False) is still an APIRoute, so it is still checked.
    served = {(method, route.path) for route in app.routes if isinstance(route, APIRoute) for method in route.methods}
    assert served - listed == set(), "The app serves routes that openapi.yaml doesn't list"
