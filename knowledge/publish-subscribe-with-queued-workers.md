---
title: Publish-subscribe with queued workers
tags: [architecture, patterns, messaging, scalability]
source: "Lecture 10; Lecture 3"
---

# Publish-subscribe with queued workers

**Problem (food app at peak).** When every student orders at once:

1. **Tight coupling.** If placing an order waits for the notification to send, a slow SMS provider blocks the request and freezes ordering.
2. **Notification flooding.** Even if every send works, the restaurant's single device gets one alert per order, overloads, and staff lose track.

**Pattern: publish-subscribe with producer-consumer queueing.** The order service *publishes* an "order placed" event to a FIFO (first in, first out) queue and returns at once. A separate **notification worker**, subscribed to the queue, *consumes* events at a controlled rate. This works asynchronously: the order does not wait for the notification.

Benefits: **decoupling** (orders are accepted even when notifications lag), **load leveling** (a slow provider creates a backlog, not a crash), and **independent scaling** (add workers, even on different SMS providers, without touching ordering).

**Why plain Observer is not enough.** In the classic Gang of Four Observer, `notify` runs inside the same request, so it has the same blocking problem. The team kept Observer as an instant, priority route for disabled users, with pub-sub as the default.

To stop alert floods, the restaurant side **coalesces** alerts in a throttle window (see the coalescing note). A hash map keyed by restaurant ID is only needed when there are several restaurants.

## Use it in the capstone

Use this for any notification or background job in our system, so slow external services (SMS, AI APIs) never block the user. Show the queue and the workers on the C4 container diagram.

## Also in Lecture 3

The lecturer first introduced **publish-subscribe** (pub/sub) while drawing the cafeteria's box-and-line diagram. A customer *subscribes* to the cafeteria; each morning, when the menu is *published*, subscribers get a push notification so they can plan lunch. Transaction receipts (email, notification, paper receipt) came from the same box. Because notifications touch almost every subsystem, he placed the notification box at the top of the diagram instead of drawing a line to everything. See [Box-and-line diagrams](box-and-line-diagrams.md).

## Related

- [Observer pattern](observer-pattern.md)
- [Transactional outbox](transactional-outbox.md)
- [Idempotency keys](idempotency-keys.md)
- [Kafka and message queues](kafka-and-message-queues.md)
- [AOS notifications: publish-subscribe with a queue](aos-notifications-publish-subscribe-with-a-queue.md)
- [Coalescing restaurant alerts with a throttle window](coalescing-restaurant-alerts-with-a-throttle-window.md)
- [Message queues and pub/sub](message-queues-and-pub-sub.md)
