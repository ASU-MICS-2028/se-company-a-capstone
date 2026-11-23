---
title: Hexagonal architecture (ports and adapters)
tags: [architecture, patterns]
source: "Lecture 15"
---

# Hexagonal architecture (ports and adapters)

**Hexagonal architecture**, from Alistair Cockburn, puts the business rules at the centre and keeps technology at the edges.

- A **port** is an interface that states what the core needs, in its own terms. For example: "send a message to a patient".
- An **adapter** translates a port to one real technology. For example: an SMS provider's API, a database, or a web framework.

The core never imports a vendor library. Swap a provider and you write a new adapter, while the rules stay untouched. The cost is extra code and indirection up front. The pay-off is stability and lower operating cost later. The lecturer left it for self-study.

## Use it in the capstone

Use one port where it matters most: a `Notifier` interface in the backend (#8), with an Africa's Talking adapter for real SMS and a fake adapter for tests and the demo. If we switch SMS providers, or add WhatsApp, the queue logic does not change. Don't add ports for things we will never swap.

## Related

- [Know the alternatives to every tool](know-the-alternatives-to-every-tool.md)
- [Event-driven consumers must be idempotent](event-driven-consumers-must-be-idempotent.md)
