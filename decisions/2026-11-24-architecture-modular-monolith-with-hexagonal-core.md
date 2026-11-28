---
title: Twɛn is a modular monolith with a hexagonal core and a transactional outbox
date: 2026-11-24
status: proposed
deciders: Eric Sunu (#7), for the team to agree
issue: "#45"
ai_used: yes
---

# Twɛn is a modular monolith with a hexagonal core and a transactional outbox

## Context

The proposal (§6) already sets the style: client-server, an event-driven path for notifications, and a local-first board later. It does not say how the backend is deployed or how its code is divided. The rubric asks us to combine styles and justify each one ([architectural trade-off reasoning](../knowledge/architectural-trade-off-reasoning.md)). Six people have about two and a half weeks to the 10 Dec demo, for one clinic.

## Decision

We combine four styles, each where it pays off:

| Where | Style | What it means for Twɛn |
|---|---|---|
| Deployment | **Modular monolith** | One FastAPI app and one PostgreSQL database, with modules for `queue`, `notify`, `predict` and `gateway` ([note](../knowledge/start-with-a-modular-monolith.md)). The worker runs the same code as a second process. |
| Inside the app | **Hexagonal core** (ports and adapters) | The queue rules import no vendor library. Ports exist only where we really swap things: **SMS** (Africa's Talking, or a fake for tests and the demo) and the **predictor** (naive, M/M/c, the learned model). The USSD callback is an inbound adapter that turns the provider's format into core commands ([note](../knowledge/hexagonal-architecture-ports-and-adapters.md)). |
| Notifications | **Event-driven, through a transactional outbox** | The worker moves a ticket to `notified` and adds its "send SMS" row in one transaction, then sends the message in a later step ([worker decision](2026-11-24-outbox-worker-is-a-separate-polling-process.md)). Delivery is at least once, with an idempotent consumer ([outbox](../knowledge/transactional-outbox.md), [idempotent consumers](../knowledge/event-driven-consumers-must-be-idempotent.md)). |
| Staff board | **Client-server, polling the event log** | The board polls `/events?after=`. Later (a Should), the same log and the repeat-safe writes become the offline sync channel. |

**No database port.** We will never swap PostgreSQL, and CI tests against a real one, so the core uses a plain data module instead of an interface. This is a deliberate change from #45's first wording, following the lecture note's advice not to add ports for things we will never swap.

**Mediator, not just observer.** The outbox worker does not simply react to events: it decides *when* to send, from the predicted wait and the travel band. That makes it closer to a mediator than a pure observer.

**First module to split out**, if ever needed: `notify`, when SMS volume or several clinics make the worker the bottleneck.

## Options we rejected

The trade-off, by what each style optimises and what it would cost us to run:

| Style | Optimises for | Operating cost for us | Verdict |
|---|---|---|---|
| **Modular monolith + hexagonal core + outbox** | Simple deployment, one transaction across modules, testable without the SMS provider | Low: one app, one database, one worker | **Chosen** |
| Microservices | Teams deploying and scaling on their own | High: CI, monitoring and network failures for every service; six people for six weeks ([note](../knowledge/microservices-trade-autonomy-for-delivery-maturity.md)) | Rejected |
| Serverless (functions) | Paying only per call | Low cost, but cold starts slow the USSD reply, functions are stateless, and it is cloud-only while the board must work offline ([note](../knowledge/serverless-means-stateless-functions.md)) | Rejected for the core. A nightly retraining job could be a function later |
| Message broker (Kafka, Redis, Celery) | High throughput, many consumers | Another service to host and monitor | Rejected: an outbox table gives the same guarantee at a few hundred SMS a day |
| Plain layered app, no ports | Least code | Low, but SMS calls leak into the queue rules and tests need the provider | Rejected: the SMS and predictor ports are cheap and the tests need them |

## Consequences

- The C4 diagrams (#48) show these four styles at levels 2 and 3.
- #49 creates the module folders. #51 builds the predictor port ([interface](../docs/architecture/predictor-interface.md), #46). #52 builds the SMS port with a fake adapter.
- We trade strong consistency for queue availability, as the proposal says. Every write (staff moves, USSD and web joins, the worker) goes through our backend into one PostgreSQL database, and row locks serialise writes that touch the same ticket.

## AI use

Claude Code drafted this record from Eric's stack review notes, the proposal and the lecture notes linked above. The team reviews it in the pull request.
