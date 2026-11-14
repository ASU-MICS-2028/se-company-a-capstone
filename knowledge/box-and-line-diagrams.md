---
title: Box-and-line diagrams
tags: [architecture, diagrams, subsystems]
source: "Lecture 3"
---

# Box-and-line diagrams

A **box-and-line diagram** is the most basic way to draw a computer system: **boxes are subsystems or components, lines are relationships** between them. It gives a high-level view of how the system works before any formal notation.

Terminology: the whole system is one entity. Each moving part inside it (menu, ordering, payment) is a **subsystem** - a system in its own right inside the bigger one, with its own smaller components you can expand later.

The lecturer's drawing habits:
- **Number the flow** (1, 2, 3, then 4' and 4'' for parallel branches) instead of relying on arrows, so readers know where to start and the order of steps.
- **Avoid crossing lines.** Rearrange boxes, or route through an existing box.
- Put a **cross-cutting** subsystem (such as notifications, which touch everything) at the top rather than drawing a line to every box.
- Use **short dashed lines** to group units that work together (for example, packaging and dispensing for delivery).
- Mark unknowns with a **question mark** rather than guessing silently.
- Add a **key** (legend) for any symbols or values that are not obvious.
- Label relationships with the data structure behind them when relevant, such as a queue.

Later you can re-draw the improved system with sequence diagrams and other formal views.

## Use it in the capstone

Draw a box-and-line sketch of our system first, then turn it into the C4 container diagram. The numbering and legend habits carry over.

## Related

- [Akornor box-and-line subsystem diagram](akornor-box-and-line-subsystem-diagram.md)
- [Data structures in high-level diagrams](data-structures-in-high-level-diagrams.md)
- [Model the status quo before reimagining](model-the-status-quo-before-reimagining.md)
- [Multiple diagrams give multiple perspectives](multiple-diagram-perspectives.md)
