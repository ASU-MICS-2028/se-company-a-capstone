---
title: Use case diagram
tags: [architecture, ux, uml]
source: "Prosit 2: Inclusive Akornor Cafeteria System; concurrency-teaching-tool MSc dissertation"
---

# Use case diagram

A **use case diagram** (UML) shows *who* uses a system and *what goals* they can achieve with it. It does not show order or logic.

Parts:
- **Actors:** people or external systems outside the boundary (Student, Cafeteria Staff, Payment Service, Notification Service).
- **System boundary:** a box. Everything inside is our system.
- **Use cases:** ovals named as user goals ("Make Payment", "Track Order").
- **Relationships:** associations (actor to use case); **include** (a use case always uses another, as Checkout includes Make Payment); **extend** (optional or conditional behaviour, as "Save/resume order" extends Place Order when interrupted). Each include or extend must be justified.

A common mistake: drawing internal parts ("Order Database") as actors, or writing screens instead of goals. Prosit 2 asks students to decide which listed items are real actors.

The dissertation also used a use case diagram to drive testing: each use case became a system-test check.

## Use it in the capstone

Draw one use case diagram for our MVP in the proposal ("illustrative use cases") and reuse it to derive acceptance and system tests.

## Related

- [Sequence diagram](sequence-diagram.md)
- [Flowchart with exception paths](flowchart-with-exception-paths.md)
- [Prosit 2: modelling the Akornor system](prosit-2-akornor-system-modelling.md)
- [Use case diagrams represent scenarios](use-case-diagrams-represent-scenarios.md)
