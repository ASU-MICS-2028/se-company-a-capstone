---
title: Order notifications must be async (transactional outbox)
date: 2026-11-02
owner: Joseph Etse
tags: [prior-work, architecture, notifications, patterns]
issue: ""
---

# Order notifications must be async (transactional outbox)

## What happened

Designing AOS notifications for peak lunch, the obvious design was: place order, then send the student and kitchen notifications in the same request. Under a burst, a slow notification provider would block every order request and freeze ordering. A GoF Observer has the same flaw, because `notify()` runs inside the request.

## What we learned

Placing an order and sending its notifications must be separate steps.
1. In **one database transaction**, save the order and an `OrderPlaced` event row (the **transactional outbox**). Either both are saved or neither.
2. Return the response to the student.
3. Publish the event to a durable queue; workers send notifications at a controlled rate.
4. Retry with exponential backoff, and drop duplicates using an idempotency key such as `orderId + eventType`.

A crash can then never leave a paid order with no notification, and a slow provider only grows a backlog.

## Do this next time

Never call an external service (SMS, push, email) inside the request that commits the main data. Write an outbox event in the same transaction and let a worker send it.

## Related

- [AOS notifications: publish-subscribe with a queue](../knowledge/aos-notifications-publish-subscribe-with-a-queue.md)
- [Coalescing restaurant alerts with a throttle window](../knowledge/coalescing-restaurant-alerts-with-a-throttle-window.md)
