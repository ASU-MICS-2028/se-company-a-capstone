---
title: Each clinic's events take their seq from a counter row, so seq order is commit order
date: 2026-11-27
status: proposed
deciders: Eric Sunu (#7), for review in the data model pull request
issue: "#47"
ai_used: yes
---

# Each clinic's events take their seq from a counter row, so seq order is commit order

## Context

The staff board refreshes by polling `GET /clinics/{clinicId}/events?after=<last seq seen>` (contract v0.2, [PR #55](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/55)). Later, the same log is meant to become the offline sync channel. So a board must never skip an event.

A unique `(clinic_id, seq)` is not enough for that. With an ordinary counter (an identity column or a PostgreSQL sequence), transaction A can take seq 5, transaction B take seq 6 and commit first, and a board that polls in between moves past 6. When A commits seq 5, that board never asks for it. The check script in [data-model.md](../docs/architecture/data-model.md) shows this happening on PostgreSQL 16.

## Decision

- Each clinic row holds `last_event_seq`. Appending an event adds 1 to it and inserts the event with the new value, in the same transaction as the change it records.
- That `update` locks the clinic row until the transaction commits, so a second append waits. A higher seq is always committed after a lower one, and seqs have no gaps.
- Appending the event is the last write of every transaction (with any outbox row), so the clinic row is locked for the shortest time and the lock order stays the same everywhere (see Lock order in the data model).

## Options we rejected

- **Identity column or sequence:** numbers are handed out at the start, but transactions commit in any order, so the poll can skip an event for good.
- **`max(seq) + 1`:** two transactions read the same maximum, one fails on the primary key, and the backend has to catch the error and retry. The counter row gives the same order with a short wait instead of an error.
- **Poll by time (`at`) instead of seq:** a transaction's timestamp is when it started, not when it committed, so the same skip can happen.
- **An advisory lock per clinic:** the same effect, but one more mechanism to explain. We need a place for the number anyway, and locking that row does both jobs.
- **A separate counter table:** it behaves the same, and a column on `clinics` is one table fewer.

## Consequences

- Event appends for one clinic happen one at a time, for the few milliseconds between the append and the commit. At a few writes a second for one clinic, nobody will notice.
- The ceiling: hundreds of writes a second for one clinic would queue behind this lock. Then we would switch the poll to a method that is safe without serialising writes, for example polling by transaction snapshot. Several clinics don't hit the ceiling, because each has its own counter.
- #49's migration creates `clinics.last_event_seq`. #50 appends events only through one function that does the `update` and the `insert` together.

## AI use

Claude Code proposed this design while drafting the data model, wrote this record, and ran the two-session test that shows both the skip and the fix. Eric's check: not yet done.
