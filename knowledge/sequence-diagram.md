---
title: Sequence diagram
tags: [architecture, uml]
source: "Prosit 2: Inclusive Akornor Cafeteria System"
---

# Sequence diagram

A **sequence diagram** shows *who talks to whom, in what order, and what is exchanged* during one scenario. Participants sit across the top. Time runs downward. Arrows are messages.

Prosit 2's suggested participants for a successful order: Student → User Interface → Cafeteria System → Payment Service → Order Database → Notification Service → Cafeteria Staff. The steps: select meal, fetch details, add to cart, calculate total, pay, record order, confirm, notify, kitchen receives, student tracks.

For an accessibility scenario, make the mechanism a visible participant. An "accessibility layer" converts meal information into screen-reader output. A "state store" saves and restores an interrupted order.

Quality checks (from Prosit 2): messages in the right order; participants clearly named; the sequence matches its use case and its flowchart; accessibility mechanisms shown where they matter.

## Use it in the capstone

Draw a sequence diagram for the path that calls our intelligent component (UI → API → model service → database). It doubles as the "component interactions" diagram in documentation B3 and shows where latency and failure can occur.

## Related

- [Use case diagram](use-case-diagram.md)
- [Flowchart with exception paths](flowchart-with-exception-paths.md)
- [Multiple diagram perspectives](multiple-diagram-perspectives.md)
