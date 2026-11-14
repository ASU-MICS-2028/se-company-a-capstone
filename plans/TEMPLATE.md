---
issue: <GitHub issue number, no #>
title: <Same title as the issue>
workstream: <product | requirements-ux | architecture | backend | intelligence | frontend | quality | scrum | paper | presentation | brand | knowledge>
owner: <name, or "unassigned">
status: <todo | in-progress | blocked | done>
milestone: <M1 Proposal | M2 Core demo | M3 Final>
depends_on: <issue numbers this cannot start without, or "none">
---

# <Same title>

<!--
File name: <issue number>-<kebab-title>.md, e.g. 7-architecture-and-api-contract.md
The GitHub issue is where status and discussion live. This file is the plan: how we'll do it and what "done" means.
Keep "status" in step with the issue's labels. When the issue closes, set status: done.
-->

## Goal

<One or two sentences: what this delivers, and which rubric line it earns marks on.>

## Done when

- [ ] <A check someone else can verify without asking you>

## Inputs and outputs

- **Uses:** <files, contracts or decisions this needs. If one doesn't exist yet, work against a stub or mock and say so>
- **Produces:** <files other workstreams will use, and where they live>

## Steps

1. <Small step, checkable on its own>

## Out of scope

- <What we are deliberately not doing>

## Log

<!-- Dated one-liners as work happens. The details go in changes/, decisions/ and learnings/; link them here. -->
