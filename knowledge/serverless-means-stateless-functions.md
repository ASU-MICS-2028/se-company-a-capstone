---
title: Serverless means stateless functions
tags: [architecture]
source: "Lecture 15"
---

# Serverless means stateless functions

**Serverless**, or **function as a service**, does not just mean that the provider manages the servers. A small virtual machine you rent, such as an EC2 micro instance, is not serverless. What defines serverless is **stateless functions**: each call starts fresh, so the request must carry everything needed, such as an auth token.

On AWS Lambda:

- A function runs when something triggers it: an API Gateway endpoint, a file dropped in a storage bucket, or a message on a queue.
- Each call runs in a tiny virtual machine (Firecracker). **Layers** hold shared packages.
- A **warm start** reuses a runtime that is already running. A **cold start** builds a new one, which is slower.
- The main benefit is cost. You pay only while a function runs, not for an always-on instance. Coca-Cola is a cited user.

The course moves from dedicated instances to Docker, Kubernetes and then Lambda, and ends on DevOps.

## Use it in the capstone

Twɛn's live queue needs an always-on API and database, so the core is not a serverless fit. A nightly job that retrains the wait-time model, or sends a daily clinic summary, could run as a function. Mention this when we choose hosting in Sprint 4.

## Related

- [Microservices trade autonomy for delivery maturity](microservices-trade-autonomy-for-delivery-maturity.md)
- [Deploy demos to a staging server](deploy-demos-to-a-staging-server.md)
