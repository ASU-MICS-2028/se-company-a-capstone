---
title: CI lints and tests the code folders on every PR
date: 2026-11-23
owner: Joseph Etse
contributors: none
issue: "#11"
pr: "#41"
ai_used: yes
---

# CI lints and tests the code folders on every PR

## What changed

Added `.github/workflows/code.yml`, with three jobs:

- **python** checks `backend/` and `intelligence/`. It runs ruff and pytest, with a PostgreSQL 16 database available at `DATABASE_URL`.
- **frontend** runs `npm ci`, then lint, typecheck and test if those scripts exist, then `npm run build`.
- **api-contract** lints `docs/architecture/openapi.yaml` with Redocly.

Each job skips its steps until its folder exists, so the workflow passes today.

## Why

Sprint 2 backlog item 10 is "a PR fails when a test fails". This sets up that check before the first code arrives.

## What code owners need to do

- **Backend and intelligence:** put dependencies in `<folder>/requirements.txt`, and put tests anywhere pytest finds them.
- **Frontend:** commit `package-lock.json`. Name the scripts `lint`, `typecheck`, `test` and `build`.

## Who did what

| Person | Part |
|---|---|
| Joseph Etse | Asked for it, and reviews it |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| Workflow | Claude Code | Wrote the workflow based on the stack in the proposal (FastAPI, PostgreSQL, scikit-learn, React with TypeScript and Vite) | Joseph checks that the Actions run passes on this PR |

## How to check it

Open this PR's Checks tab. `code / python (backend)`, `code / python (intelligence)`, `code / frontend` and `code / api-contract` should all pass and say "skipping".
