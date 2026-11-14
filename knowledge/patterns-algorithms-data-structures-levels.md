---
title: Patterns, algorithms and data structures work at different levels
tags: [patterns, architecture, data-structures, algorithms]
source: "Lecture 10"
---

# Patterns, algorithms and data structures work at different levels

The lecturer separates three things that are often mixed up:

| Concept | Question it answers | Level |
|---|---|---|
| Design pattern | What to think about; how to structure the solution | Architecture or design |
| Algorithm | How to do it: a step-by-step procedure, measurable in time and space complexity | Logic or computation |
| Data structure | How to organise, store and access the data | Memory or storage |

Examples: the Observer pattern (design), Dijkstra's shortest-path algorithm (logic), a hash table giving O(1) lookups of student records by ID (storage).

**How they work together.** The patterns you choose point to an architecture. The algorithm defines the logic. The data structure makes it run efficiently. A wrong data structure slows the algorithm down and can make the chosen pattern unworkable. Example: *an Observer pattern uses a linked list to notify subscribers via an iteration algorithm.* Map all three like this before you build.

**Why it matters with AI.** If you prompt "build a student record lookup", you get something generic, and you will not know its structure. If you prompt with the pattern, data structure and algorithm named, the output is better. It is also documented, so you know what to change when something breaks.

## Use it in the capstone

In the design docs, for each key feature, state the pattern, data structure and algorithm, with Big O. Put the same terms into our build prompts.

## Related

- [What is a design pattern](what-is-a-design-pattern.md)
- [Big O rules of thumb](big-o-rules-of-thumb.md)
- [Specific prompting with pattern keywords](specific-prompting-with-pattern-keywords.md)
