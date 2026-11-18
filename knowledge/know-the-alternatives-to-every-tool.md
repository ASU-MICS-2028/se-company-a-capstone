---
title: Know the alternatives to every tool you pick
tags: [architecture, course]
source: "Lecture 14"
---

# Know the alternatives to every tool you pick

When a student named Redis as the cache in the WhatsApp design, the lecturer pushed back: "Don't walk into a meeting and say Redis is the best for caching." Know the alternatives and why you chose this one over them. He will press on this.

In the same design, a Redis cache holds a **user connection registry**: which server each user is connected to, their connection or device ID, and their last activity, so a message can be routed to the right server.

He also suggested giving a design diagram to an AI assistant acting as an architect. It explains the parts, proposes alternative technologies and says why each is used, which is good preparation for these questions.

## Use it in the capstone

Every technology in the Twɛn stack gets a decision file with the options we rejected (see `decisions/`). Before the ASERC Q&A, each owner should be able to name two alternatives to their part's main tool and say why we didn't use them.

## Related

- [Architectural trade-off reasoning](architectural-trade-off-reasoning.md)
- [Cache-aside pattern](cache-aside-pattern.md)
