---
title: Message queues and pub/sub
tags: [architecture, data]
source: "System Design Blueprint (ByteByteGo infographic)"
---

# Message queues and pub/sub

A **message queue** (RabbitMQ, SQS, Redis lists) lets a producer drop work for a consumer to pick up later. The two are decoupled in time and speed. **Pub/sub** (publish/subscribe) delivers each published event to *every* subscriber: the "fan-out" on the blueprint, where one event feeds recommendation, logging, search, analytics, notification and payment services.

Why: slow or failure-prone work (media processing, ML inference, notifications) leaves the request path. Spikes are absorbed. A crashed worker doesn't lose work.

Metrics from the blueprint: message count, consumption rate, in-transit (waiting for acknowledgement), queue limit.

Reliability details: **acknowledgements** (delete a message only after successful processing), retries with backoff, **dead-letter queues** for poison messages, and idempotent consumers (see [idempotency keys](idempotency-keys.md)), because messages can arrive twice.

This is the [Observer pattern](observer-pattern.md) and the [producer-consumer](producer-consumer-bounded-buffer.md) problem at system scale.

## Use it in the capstone

If inference takes more than a second, use a background task queue (Celery, RQ or FastAPI background tasks) and show the async flow in the sequence diagram.

## Related

- [Stacks and queues](stacks-and-queues.md)
- [Producer-consumer and the bounded buffer](producer-consumer-bounded-buffer.md)
- [System design blueprint](system-design-blueprint.md)
- [Publish-subscribe with queued workers](publish-subscribe-with-queued-workers.md)
- [Kafka and message queues](kafka-and-message-queues.md)
