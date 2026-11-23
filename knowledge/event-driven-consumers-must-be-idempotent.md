---
title: Event-driven consumers must be idempotent
tags: [architecture, quality]
source: "Lecture 15"
---

# Event-driven consumers must be idempotent

In an **event-driven** architecture, parts of the system talk by publishing events instead of calling each other. An **event broker** keeps a list of subscribers and pushes each new event to them, like a podcast app delivering new episodes. The lecturer left open whether the broker is closer to the observer pattern (it follows a register of subscribers) or the mediator pattern (it processes and arbitrates).

Brokers usually promise **at-least-once delivery**: an event may arrive twice. So every consumer must be **idempotent**, meaning that handling the same event twice has the same effect as handling it once. The usual method is to give each event a unique ID and have the consumer skip IDs it has already processed.

Styles also combine. The lecturer's food-ordering example used microservices for orders, plus an event that publishes the daily menu to subscribers.

## Use it in the capstone

Twɛn's "your turn is near" SMS is an event consumer. Key each send on the event ID (queue entry plus notification type) and store it with a unique constraint in PostgreSQL. Then a retried event cannot text a patient twice, and an SMS through Africa's Talking costs money.

## Related

- [Idempotency keys](idempotency-keys.md)
- [Message queues and pub/sub](message-queues-and-pub-sub.md)
- [Transactional outbox](transactional-outbox.md)
- [Observer pattern](observer-pattern.md)
