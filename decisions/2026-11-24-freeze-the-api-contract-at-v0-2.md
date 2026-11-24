---
title: Freeze the API contract at v0.2 once its three consumers approve it
date: 2026-11-24
status: proposed
deciders: Eric Sunu (#7), with Joseph Etse (#12), Kobina Opei Jr. (#10) and Henry Kofi Brandoh (#9)
issue: "#44"
ai_used: yes
---

# Freeze the API contract at v0.2 once its three consumers approve it

## Context

Backend (#8), frontend (#10) and the availability maths (#12) are built in parallel against `docs/architecture/openapi.yaml` ([independent workstreams](2026-11-14-independent-workstreams.md)). If the contract keeps moving, each change breaks someone's mock or code. Sprint 3 starts on 30 Nov, and the demo is on 10 Dec.

## Decision

When Kobina, Henry and Joseph approve the v0.2 pull request, the contract is frozen at 0.2.0. Set this file to accepted on that day. After that:

- Any change needs its own `decisions/` file and a version bump: 0.2.x for additions that break nobody, 0.3.0 for anything that breaks a consumer.
- A breaking change needs a yes from every affected consumer before it merges.
- Fields marked `x-scope: should` are part of the freeze, even if they are never built.

## Options we rejected

- **No freeze, change as we go:** fastest for the backend, but the frontend's mock and Joseph's calculations drift, and we find out at integration (#18), which is the worst time.
- **Freeze v0.1 as drafted:** its state order would have to change later anyway (see [the arrival decision](2026-11-24-patients-arrive-before-they-are-called.md)).

## Consequences

- #49 adds a test that fails if the app serves a route the contract doesn't list, so the code cannot drift from the frozen file.
- Kobina can generate TypeScript types from the file once and trust them.

## AI use

Claude Code drafted this record and proposed the freeze rule. Eric has not yet reviewed it; he confirms it when he checks the pull request, and the three reviewers confirm it by approving.
