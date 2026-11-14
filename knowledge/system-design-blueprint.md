---
title: System design blueprint
tags: [architecture, reading]
source: "System Design Blueprint: The Ultimate Guide (ByteByteGo infographic)"
---

# System design blueprint

A one-page map of a large web system, following a request from the phone to storage:

1. **DNS:** resolver → root → top-level-domain → authoritative nameserver returns the IP.
2. **Request and response:** compression (gzip), request IDs, **idempotency keys**; status codes (2xx, 4xx, 5xx), pagination, cookies, expiry headers. Metrics: response time, failed status codes.
3. **Edge:** [API gateway](api-gateway.md) (validation, auth, rate limiting, TLS termination, metering); [load balancer](load-balancing.md); frontend servers holding live connections (WebSocket, SSE, long polling); **CDN/edge servers** for static content and streaming.
4. **Backend servers:** horizontal and vertical scaling; concurrency control (serial, pessimistic or optimistic locking); leader-follower or leaderless replication; distributed ID generation (UUID, Snowflake); distributed locks (Redlock, ZooKeeper).
5. **Caching:** in-memory and distributed caches with write and eviction policies. See [caching strategies](caching-strategies-and-eviction.md).
6. **Data:** SQL, NoSQL, time-series and graph databases; [sharding and replication](database-sharding-and-replication.md); cold storage; RBAC, encryption, audit trail.
7. **Async processing:** object storage + [message queue](message-queues-and-pub-sub.md) + workers for uploads; pub/sub fan-out to recommendation, search, analytics, notification and payment services, payments with [idempotency keys](idempotency-keys.md).

The colour key marks **metrics** (what to monitor), **security** and **options/algorithms** at each layer.

## Use it in the capstone

Use it as a checklist when drawing our C4 container diagram. Pick only the boxes we need, and list the rest as "scaling path" under deployment strategy. The rubric's "scalable, secure" system design needs that story.

## Related

- [Load balancing](load-balancing.md)
- [Caching strategies and eviction](caching-strategies-and-eviction.md)
- [Message queues and pub/sub](message-queues-and-pub-sub.md)
- [Monitoring and maintenance](monitoring-and-maintenance.md)
