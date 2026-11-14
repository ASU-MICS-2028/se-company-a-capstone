---
title: External services as use case actors
tags: [architecture, diagrams, uml]
source: "Lecture 7"
---

# External services as use case actors

An **actor** in a use case diagram is anything outside the system that interacts with it. It is not only human users.

The lecturer praised a team for modelling the **screen reader as an actor**: a third-party service the system has to work with, not just a feature inside it. The other team's diagram showed the same idea:

- **Primary actor:** the student placing the order.
- **Secondary actors:** the payment service, the notification service, and the cafeteria staff.

Modelling outside services this way does three things:

1. It makes **dependencies visible**. If the payment provider is down, you can see which use cases break. That feeds directly into availability thinking.
2. It marks the **system boundary**: what we build versus what we integrate.
3. It lines up with the **C4 context diagram**, where outside systems sit around our system.

## Use it in the capstone

List every outside service (payment, SMS or notification, AI API, screen reader or OS accessibility service) as an actor in our use case diagrams and as an external system in the C4 context view. Use the same names in both.

## Related

- [Include versus extend in use case diagrams](include-versus-extend.md)
- [Multiple diagrams give multiple perspectives](multiple-diagram-perspectives.md)
- [Identify all user classes](identify-all-user-classes.md)
