---
title: Design problem worksheet
tags: [patterns, design, method]
source: "Lecture 10"
---

# Design problem worksheet

The in-class method for working through one design problem (used on a campus food ordering app):

1. **Identify the design problem.** What structural or behavioural challenge does the system face: object creation, state management, notification, load? Example: 2,000 students order lunch at 12:00 and the server may be overwhelmed.
2. **Choose a pattern.** Name a Gang of Four (or other) pattern that fits, and justify why it applies. The lecturer's analogy: Friday traffic from Accra to Kumasi on one road is solved by adding lanes. That is a pattern.
3. **Select a data structure, and be specific.** Don't stop at "a queue" or "a tree". Which kind? A plain FIFO queue serves people in order. But a diabetic student whose blood sugar has crashed should not wait in line, so a **priority queue** fits better. Don't say "tree". Say which tree.
4. **Justify the algorithm**, with its time and space complexity.
5. **Discuss**: does the pattern constrain or enable your data structure choice? Would a different scale change your decision?

Scope tightly. "Order" is ambiguous: placing the request, payment and delivery are all parts of it. Pick one.

Justification is the most important part. Top employers' interviews now set exactly this kind of task.

## Use it in the capstone

Run each major capstone feature through these five steps and keep the result as a design decision record in the repo. It feeds the architecture docs and the paper's design section.

## Related

- [Patterns, algorithms and data structures work at different levels](patterns-algorithms-data-structures-levels.md)
- [Queue-based load leveling with a priority queue](queue-based-load-leveling.md)
- [Specific prompting with pattern keywords](specific-prompting-with-pattern-keywords.md)
