---
title: Layered (N-tier) architecture
tags: [architecture]
source: "Lecture 15"
---

# Layered (N-tier) architecture

A **layered** or **N-tier** architecture stacks the system in tiers, each talking only to the one below. The common form is **three-tier**: presentation (what the user sees), business logic (the rules), and data (storage). Client-server is the simplest N-tier system. Java Enterprise Edition and .NET applications, and many university systems, are built this way.

**Benefits**

- Clear ownership: "presentation layer, you are the UX team".
- Testing is approachable, one layer at a time.
- Strong policy boundaries and good governance per layer.

**Costs**

- Latency, because each request crosses every tier.
- Duplicated models. The lecturer's example: reaching a publisher's journals through the library needs two separate logins, the institution's and the publisher's.
- Rigid releases. A change at the top may need changes all the way down to the database before it can ship.
- Tight coupling between neighbouring layers.

## Use it in the capstone

Twɛn is three-tier: the React PWA (presentation), FastAPI (business logic), PostgreSQL (data). In #7, say this directly, and keep each owner to their tier: frontend #10, backend #8. Keep the API contract stable so a UI change does not force a schema change.

## Related

- [Start with a modular monolith](start-with-a-modular-monolith.md)
- [Model-view-controller](model-view-controller.md)
