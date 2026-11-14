---
issue: 10
title: Frontend: screens built against a mock of the API contract
workstream: frontend
owner: unassigned
status: todo
milestone: M2 Core demo
depends_on: #6, #7
---

# Frontend: screens built against a mock of the API contract

Issue: [#10](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/10)

## Goal

The user interface, built in parallel with the backend by mocking the contract. Rubric: Functionality (10%), Visuals.

## Done when

- [ ] Core screens from #6 implemented
- [ ] Runs against a mock server generated from `openapi.yaml`, then against the real backend
- [ ] Accessibility checks: labels, contrast, keyboard and screen reader

## Inputs and outputs

- **Uses:** `docs/ux/` wireframes; `docs/architecture/openapi.yaml`
- **Produces:** `frontend/`

## Steps

1. Scaffold and mock server
2. Screens, one PR each
3. Accessibility pass

## Out of scope

- Backend logic

## Log

- 2026-11-14: Plan created with the repository setup.
