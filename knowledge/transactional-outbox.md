---
title: Transactional outbox
tags: [architecture, patterns, reliability, data]
source: "Lecture 10"
---

# Transactional outbox

The **transactional outbox** pattern saves a business record (an order) and the events about it (a "send notification" message) in the **same database transaction**. A crash then cannot leave a committed order with no event to announce it.

How it works in the food app example:

1. The order and a notification row marked **pending** are written together, in one transaction.
2. A worker reads pending rows and sends them.
3. When a send succeeds, the row is marked **sent**.
4. If the system crashes, it restarts and picks up whatever is still pending.

Normally notifications are just sent and never stored. Storing them is what makes delivery survive a crash.

This pairs with **idempotency**: if the worker crashes after sending but before marking the row "sent", it may send again. An idempotency key stops that duplicate from reaching the user twice.

## Use it in the capstone

If our system sends messages or calls external services after saving data, use an outbox table. Mention it in the reliability argument of the quality engineering section.

## Related

- [Publish-subscribe with queued workers](publish-subscribe-with-queued-workers.md)
- [Idempotency keys](idempotency-keys.md)
