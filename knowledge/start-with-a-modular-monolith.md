---
title: Start with a modular monolith
tags: [architecture]
source: "Lecture 15"
---

# Start with a modular monolith

A **monolith** is one deployable unit: the backend, the frontend it serves and the calls between them ship together. The lecturer stressed that a monolith is not outdated. It is a valid starting point until real scaling problems appear.

Not all monoliths are alike:

- **Single-process:** one program, one deployment.
- **Distributed monolith:** split across machines but still released together. It has the costs of both styles and the benefits of neither.
- **Third-party black box:** a bought system you cannot change inside.
- **Big ball of mud:** no internal structure at all.
- **Modular monolith:** one deployment, but the code is divided into modules with clear boundaries. Shopify and GitHub still run this way.

A modular monolith keeps deployment simple and lets you split a module into its own service later, if load or team size demands it.

## Use it in the capstone

Twɛn is one FastAPI app and one PostgreSQL database, with modules for queue, notifications and prediction. In the architecture section (#7), name it a modular monolith and say which module we would split out first (notifications) and what would trigger it.

## Related

- [Architectural trade-off reasoning](architectural-trade-off-reasoning.md)
- [Microservices trade autonomy for delivery maturity](microservices-trade-autonomy-for-delivery-maturity.md)
