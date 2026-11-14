---
title: "AOS notifications: publish-subscribe with a queue"
tags: [prior-work, architecture, patterns, notifications]
source: "AOS Notification System Peak Concurrency Design Report, Joseph Etse (2 Nov 2026); AOS design flow"
---

# AOS notifications: publish-subscribe with a queue

**Problem.** At peak, every student orders at once (peak concurrency). That causes two failures:
- **Tight coupling (structural):** if placing an order waits for the notification to send, a slow provider freezes ordering.
- **Notification flooding (behavioural):** one alert per order overwhelms kitchen staff and their device.

**Pattern.** **Publish-Subscribe** with queued **Producer-Consumer** processing. The order service *publishes* an `OrderPlaced` event and returns; notification *workers* (consumers) pull events from a queue at a controlled rate. This gives decoupling, **load levelling** (a spike becomes a backlog, not a freeze) and independent scaling (add workers without touching ordering).

**Transactional Outbox** protects the hand-off: the order row and its event are saved in one database transaction, so a crash cannot leave a paid order with no notification.

**Why not plain GoF Observer?** Its `notify()` usually runs inside the same request, so it brings back the blocking problem.

**Data structures.** One **durable FIFO queue** per priority lane, so "Order ready" can overtake "Order received" (O(1) per operation; a heap would cost O(log n) for no gain with fixed lanes). A **hash map** `restaurantId → {pendingCount, windowOpen}` for coalescing. Reliability adds exponential-backoff retries and an idempotency key such as `orderId + eventType` so duplicates are dropped.

**Trade-off.** A short backlog buys stability; order is guaranteed only within a lane. It protects the system, not kitchen capacity.

## Use it in the capstone

Any capstone feature that sends messages after a user action should publish an event and let a worker send it.

## Related

- [Coalescing restaurant alerts with a throttle window](coalescing-restaurant-alerts-with-a-throttle-window.md)
- [Order notifications must be async (transactional outbox)](../learnings/order-notifications-must-be-async-transactional-outbox.md)
- [Akornor box-and-line subsystem diagram](akornor-box-and-line-subsystem-diagram.md)
- [Publish-subscribe with queued workers](publish-subscribe-with-queued-workers.md)
