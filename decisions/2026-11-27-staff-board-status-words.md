---
title: The staff board shows the contract's ticket statuses with the five words from the prototypes
date: 2026-11-27
status: proposed
deciders: Kobina Opei Jr.
issue: "#10"
ai_used: yes
---

# The staff board shows the contract's ticket statuses with the five words from the prototypes

## Context

The API contract (v0.2, PR #55) has seven ticket statuses: `waiting`, `notified`, `arrived`, `called`, `seen`, `no_show`, `cancelled`. The approved prototypes (27 Nov) use five words staff understand: Booked, Arrived, At desk, Done, Missed. The board must show one and send the other.

## Decision

| Contract status | Staff see |
|---|---|
| `waiting` | Booked |
| `notified` | Booked, with "Texted to come" under it (or "Late" once `holdUntil` has passed) |
| `arrived` | Arrived |
| `called` | At desk |
| `seen` | Done |
| `no_show` | Missed |
| `cancelled` | Cancelled (hidden from the default list) |

A failed "come now" text shows "Text failed" under the status, so staff hold the place. The mapping lives in one file, `frontend/src/staff/status.ts`.

## Options we rejected

- **Show the contract's words as they are:** "notified" and "no_show" are developer words, and they don't match the prototypes staff were shown.
- **Ask Eric to rename the statuses:** the contract is about to freeze, and the names are fine for the backend. Only the words on screen need to change.

## Consequences

- If the contract adds a status, TypeScript flags this table as incomplete, so it can't be forgotten.
- The prototypes also show a separate "Called" step (called, but not yet at the desk, with a grace timer). The contract has no such state: `called` means at the desk. The grace timer is left out until the team decides whether it needs a contract change.

## AI use

Claude Code proposed the mapping and drafted this record. Kobina accepts or rejects it in the PR review.
