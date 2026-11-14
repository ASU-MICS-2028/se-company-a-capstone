---
issue: 8
title: Backend: API and database built to the contract
workstream: backend
owner: unassigned
status: todo
milestone: M2 Core demo
depends_on: #7
---

# Backend: API and database built to the contract

Issue: [#8](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/8)

## Goal

Implement the API from the contract. Rubric: Functionality (10%), Code Quality (5%).

## Done when

- [ ] Every endpoint in `openapi.yaml` implemented and returning the documented shapes
- [ ] Database migrations
- [ ] Calls the intelligent component through its interface, with a stub until #9 is ready
- [ ] Unit tests run in CI
- [ ] Build and run instructions in the README

## Inputs and outputs

- **Uses:** `docs/architecture/openapi.yaml`
- **Produces:** `backend/` (folder confirmed in #7)

## Steps

1. Scaffold and health endpoint
2. Endpoints, one PR each
3. Stub the model interface
4. Tests

## Out of scope

- UI

## Log

- 2026-11-14: Plan created with the repository setup.
