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
- **The worker also queues the message.** When a waiting ticket's turn nears, the worker moves it `waiting → notified`, inserts its outbox row and appends the `notified` event, all in one transaction. The API never decides when to text; it records joins and staff moves.
- It **polls** the outbox every 1 to 2 seconds. It takes due rows with `SELECT ... FOR NO KEY UPDATE SKIP LOCKED`, sends each through the SMS port, marks it sent, and commits. Two workers can run at once without taking the same row. This is the same lock mode as `call-next` ([stack decision](2026-11-24-backend-stack-sync-fastapi-and-postgres.md)), so the code uses one lock mode everywhere.
- Failed sends are **retried with backoff**: each row keeps its attempt count and the time of its next try.
- Each message carries an **idempotency key** (`ticketId + eventType + seq`, from the proposal), and the table has a unique constraint on it, so a duplicate row can never be created.
- **What we can and cannot promise.** A message can go out twice in two cases. The worker crashes after the provider accepts it but before our commit. Or the call to the provider times out, so we can't tell whether it was sent, and the retry sends it again. The timeout is the likelier case, since networks fail more often than our process does. So the paper claims at least once delivery, never exactly once, and the fault-injection test (a Should) measures how often a duplicate happens.

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
