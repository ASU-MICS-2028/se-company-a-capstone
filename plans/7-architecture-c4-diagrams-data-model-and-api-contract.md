---
issue: 7
title: Architecture: C4 diagrams, data model and API contract
workstream: architecture
owner: Eric Sunu
status: todo
milestone: M2 Core demo
depends_on: #1
---

# Architecture: C4 diagrams, data model and API contract

Issue: [#7](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/7)

## Goal

Fix the system's shape and the API contract early, so backend, frontend and the intelligent component can be built in parallel against it. Rubric: System Design (8%), Architecture and Design (5%).

## Done when

- [ ] C4 level 1 and 2 diagrams (plus level 3 for the core service)
- [ ] Data model / schema
- [ ] API contract as `docs/architecture/openapi.yaml`, with example payloads
- [ ] Interface for the intelligent component (input, output, latency budget)
- [ ] Tech stack and programming-model rationale in `decisions/`
- [ ] Deployment assumptions

## Inputs and outputs

- **Uses:** #1, #5 (draft is enough)
- **Produces:** `docs/architecture/`; `decisions/` for the stack and style

## Steps

1. Pick the architecture style and record it as a decision
2. Write the contract first and share it the same day. It unblocks #8, #9 and #10
3. Then the diagrams and the schema

## Out of scope

- Implementation

## Log

- 2026-11-14: Plan created with the repository setup.
