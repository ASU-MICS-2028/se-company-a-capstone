---
date: 2026-11-27
title: For call-next, SKIP LOCKED removes the wait, and the lock should be FOR NO KEY UPDATE
owner: Eric Sunu
tags: [architecture, concurrency, data]
issue: "#47"
---

# For call-next, SKIP LOCKED removes the wait, and the lock should be FOR NO KEY UPDATE

## What happened

While testing the data model (#47), we expected that without `SKIP LOCKED`, the second of two nurses tapping *call next* at once would get nobody (a wrong 204). We ran it on PostgreSQL 16 with two sessions, and that guess was wrong. A second test then showed a skip we had not expected.

## What we found

- **Without `SKIP LOCKED`,** nurse B waits until nurse A's transaction commits. PostgreSQL then re-checks B's row, sees it is no longer `arrived`, and moves on to the next arrived patient. Nobody is called twice. This relies on READ COMMITTED, PostgreSQL's default isolation level.
- **With `SKIP LOCKED`,** B skips A's locked row at once and calls the next patient without waiting.
- **`FOR UPDATE` is too strong a lock.** Saving an event that points at a ticket (a delivery report, for example) puts a light foreign-key lock on that ticket. `FOR UPDATE SKIP LOCKED` treated that as locked and called the second patient instead of the first. `FOR NO KEY UPDATE SKIP LOCKED`, the lock an ordinary `UPDATE` takes, called the first patient as it should.

## What to do

- At ASERC, defend `SKIP LOCKED` as the reason no nurse waits on another, not as the only way to avoid calling a patient twice.
- Use `FOR NO KEY UPDATE SKIP LOCKED` in `call-next` (#50).
- The tests are in [the data model check](../docs/architecture/data-model-check.sh). The measured table is in [data-model.md](../docs/architecture/data-model.md).
