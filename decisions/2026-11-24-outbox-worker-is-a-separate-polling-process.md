---
title: The SMS outbox worker is a separate process that polls PostgreSQL
date: 2026-11-24
status: proposed
deciders: Eric Sunu (#8), for the team to agree
issue: "#45"
ai_used: yes
---

# The SMS outbox worker is a separate process that polls PostgreSQL

## Context

The "come now" SMS goes through an outbox table ([transactional outbox](../knowledge/transactional-outbox.md)): the ticket change and the message row commit together, and something else sends the message later. The proposal's rule is never to call an external service inside the committing request. That something else needs a shape: a thread, a process, or a message broker. Volume is a few hundred messages a day for one clinic.

## Decision

- The worker is a **separate process** running the same code base (`python -m app.worker`), next to the API.
- It **polls** the outbox every 1 to 2 seconds. It takes due rows with `SELECT ... FOR UPDATE SKIP LOCKED`, sends each through the SMS port, marks it sent, and commits. Two workers can run at once without taking the same row.
- Failed sends are **retried with backoff**: each row keeps its attempt count and the time of its next try.
- Each message carries an **idempotency key** (`ticketId + eventType + seq`, from the proposal), and the table has a unique constraint on it, so a duplicate row can never be created.
- **What we can and cannot promise.** If the worker crashes after the provider accepts a message but before our commit, it may send that message again. The duplicate window is only that moment. The paper reports it as at least once delivery with a narrow window, and the fault-injection test (a Should) measures it.

## Options we rejected

- **A thread inside the API process:** cheaper to start, but a hung SMS call or a crash then takes the API down with it. A separate process is isolated and restarts on its own ([threads vs processes](../knowledge/threads-vs-processes.md)).
- **Redis with Celery, or Kafka:** a second service to host, secure and monitor, for a volume a table handles easily. PostgreSQL already gives us the locking we need.
- **Sending inside the request:** a slow provider would freeze the board, and a crash between commit and send loses the message.

## Consequences

- Hosting must run two processes, the API and the worker ([hosting decision](2026-11-24-dev-tunnel-and-an-always-on-free-demo-host.md)).
- #52 builds the worker, the Africa's Talking adapter, and a test with two workers proving no ticket gets two texts.
- The worker decides *when* to send, from the predicted wait and the travel band, so it acts as a mediator rather than a plain observer.

## AI use

Claude Code drafted this record from Eric's stack review notes, the proposal and the lecture notes linked above. The team reviews it in the pull request.
