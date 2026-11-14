---
title: Split the work into independent workstreams joined by written contracts
date: 2026-11-14
status: accepted
deciders: Nyansapo Systems (all six)
issue: "#7"
ai_used: yes
---

# Split the work into independent workstreams joined by written contracts

## Context

Six people, six weeks, and the 10 Dec core-demo checkpoint. If the frontend waits for the backend, and the backend waits for the model, most of the team sits idle.

## Decision

- The work is split into workstreams (labels `ws: …`): product, requirements-ux, architecture, backend, intelligence, frontend, quality, scrum, paper, presentation, brand, knowledge.
- Each workstream owns its own folder and can merge without waiting for anyone else.
- Workstreams meet only at **written contracts**: the API contract `docs/architecture/openapi.yaml` and the intelligent component's interface, both produced first in #7.
- Until a real part exists, build against a **mock or stub** of its contract: the frontend uses a mock server, the backend uses a model stub.
- A real dependency is written in the plan's `depends_on` and on the issue. Anything not listed there is not a dependency.

## Options we rejected

- **Build in layers, one after the other:** too slow for six weeks.
- **Everyone works on everything:** nobody owns anything, and reviews become impossible.

## Consequences

- #7 has to publish the contract early, even as a rough first version. It unblocks #8, #9 and #10.
- Contract changes need a `decisions/` file and a heads-up on the affected issues.
- Integration (#18) is a planned task, not a surprise at the end.

## AI use

Claude Code proposed the workstream split from the brief and rubric. The team reviews it at Sprint 1 planning.
