---
title: Data structures in high-level diagrams
tags: [architecture, data, queues]
source: "Lecture 3"
---

# Data structures in high-level diagrams

Drawing the system at a high level is a chance to spot where **data structures** sit, and label the relationship with them.

The lecturer's cafeteria examples:
- Between the menu and ordering there is a physical, first-come-first-served **queue** (FIFO: first in, first out). A delivery restaurant has a "queue but not really", since several staff serve people at once; here it is a strict line.
- Payment may have **parallel queues** (cash and mobile money) that run side by side. He asked which structure models parallel lines well; a tree branches, but is it parallel enough? Left for the data structures part of the course.
- At packaging and collection, a plain queue fails: if your fried rice is ready and the earlier customer's dish isn't, you get served first. Food readiness, distance and space all change the order. That calls for a **priority queue** - items leave by priority, not arrival time.
- Self-order screens in fast-food chains show orders lined up, often in several queues by type.

Recording these early makes the later detailed design more accurate.

## Use it in the capstone

Annotate our C4 or box-and-line diagrams where queues or priority queues appear (for example, job or notification queues), and justify the choice in the architecture doc.

## Related

- [Box-and-line diagrams](box-and-line-diagrams.md)
- [Queue-based load leveling](queue-based-load-leveling.md)
- [Big-O rules of thumb](big-o-rules-of-thumb.md)
