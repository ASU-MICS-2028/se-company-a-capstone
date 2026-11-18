---
title: Queue writes to keep them ordered and exclusive
tags: [architecture, quality]
source: "Lecture 14"
---

# Queue writes to keep them ordered and exclusive

In the WhatsApp design, messages pass through a message queue before they reach the message database. The lecturer asked why, since a queue looks like a bottleneck. The answers:

- **Ordering.** Messages are stored in order per user and per group.
- **Retries.** A write that fails goes back to be retried. Writes that keep failing go to a **dead-letter queue** for inspection instead of being lost.
- **Mutual exclusion.** Two requests for the same resource are handled one at a time. His example: a joint account holds 10,000 cedis, and the two holders withdraw 6,000 and 7,000 at the same moment. Without a queue or lock, both checks see enough money and both withdrawals succeed.

## Use it in the capstone

Twɛn has the same problem. Two patients joining at the same moment must not get the same ticket number, and a "come now" SMS must be sent exactly once. We use a database transaction for ticket numbers and a transactional outbox drained by one worker for SMS, with failed sends retried and then parked.

## Related

- [Message queues and pub-sub](message-queues-and-pub-sub.md)
- [Deadlock](deadlock.md)
- [Queue-based load leveling](queue-based-load-leveling.md)
