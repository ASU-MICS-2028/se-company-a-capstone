---
title: No single point of failure and graceful failure
tags: [architecture, reliability, availability]
source: "Lecture 3"
---

# No single point of failure and graceful failure

When drawing system diagrams, always check that there is **no single point of failure** - one component whose failure brings the whole service down. "Our payment system is down, so we can't do anything" should never happen. The usual remedy is **redundancy** (backup components or alternative routes), covered later under architecture.

Equally important is **graceful failure handling**: when something fails, the system responds sensibly instead of collapsing.
- Give a simple, modest, honest notification of what happened.
- Offer an alternative way to get the service.

His example: you pay by mobile money and it fails (insufficient funds, or the network is down). The system should let you back up and choose another path: "Do you have cash? There's an ATM nearby." It should not leave the order stuck or the stock count wrong.

## Use it in the capstone

In the architecture doc, list each component and say what happens if it fails. Use this in our availability and reliability calculations and in test cases for failure paths.

## Related

- [Box-and-line diagrams](box-and-line-diagrams.md)
- [Performance versus reliability](performance-versus-reliability.md)
- [Transparency and tracking keep users](transparency-and-tracking-keep-users.md)
- [Idempotency keys](idempotency-keys.md)
