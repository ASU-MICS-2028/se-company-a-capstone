---
title: Microservices trade autonomy for delivery maturity
tags: [architecture]
source: "Lecture 15"
---

# Microservices trade autonomy for delivery maturity

Moving from a central system to a cloud-native one means **decoupling**: breaking it into parts that can change on their own. It takes a lot of work, but each part then has its own control.

- **Service-oriented architecture (SOA)** is the concept: a central coordinator talks to services through **contracts**. Early contracts used SOAP and were heavy. REST made them lighter and **stateless** (each request carries everything the server needs).
- **Microservices**, popular since the 2010s, push this further. Each service is deployed on its own and matches one business capability. Netflix and Amazon are the usual examples. They are faster to change and fail more gracefully.

The catch: team autonomy demands mature delivery, meaning automated tests, CI/CD and monitoring for every service. Services split along the wrong lines create more problems than they solve.

## Use it in the capstone

Six people over six weeks cannot run several services well, so Twɛn stays one service (see the modular monolith note). Our API contract (#7) is the SOA idea on a small scale: the frontend and backend agree on it before either is built. In the paper, give "not enough delivery maturity yet" as the honest reason for not choosing microservices.

## Related

- [Start with a modular monolith](start-with-a-modular-monolith.md)
- [Know the alternatives to every tool](know-the-alternatives-to-every-tool.md)
