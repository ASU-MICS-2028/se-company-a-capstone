---
title: Capstone design patterns and DS&A deck summary
tags: [patterns, reading, data]
source: "Ashesi CSIS Capstone Design Patterns & DS&A deck (36 slides)"
---

# Capstone design patterns and DS&A deck summary

**Argument.** A strong capstone rests on four stacked layers: **architecture** (overall structure and quality attributes), then **design patterns** (reusable answers to recurring design problems), then **data structures and algorithms** (how data is stored and processed), then the **working system**. Choosing each deliberately makes the project maintainable, scalable and defensible.

**Part I: GoF patterns.** The 23 "Gang of Four" patterns (Gamma et al., 1994) fall into creational, structural and behavioural families, each with campus or Ghanaian examples. There is a [4-step decision guide](pattern-decision-guide.md) and an [Akornor cafeteria exercise](akornor-cafeteria-pattern-exercise.md).

**Part II: DS&A.** Data structure families (sequential, associative, hierarchical, graph); arrays vs linked lists; stacks and queues; BSTs, heaps and balanced trees; graphs with BFS, DFS and Dijkstra; sorting and stability; linear vs binary search; algorithm paradigms; Big-O; a decision tree; and a campus shuttle worked example.

**Closing advice.** Document one key design decision and its pattern. Record **at least two alternatives you rejected** and why. Measure the time and space cost of core structures. Complete a "design canvas" that maps every module to its pattern, structure and algorithm with complexity.

**Patterns in African products (deck slide):** fintech and mobile money use Observer + Strategy; health systems use Facade + Chain of Responsibility; e-learning uses Template Method + Factory; agriculture and public services use Iterator + Adapter.

## Use it in the capstone

Add a "Design decisions" table to the architecture doc: module | pattern | data structure | algorithm | Big-O | alternatives rejected. It covers rubric D and the paper's design section.

## Related

- [Gang of Four pattern catalogue](gang-of-four-catalogue.md)
- [Patterns, algorithms and data structures levels](patterns-algorithms-data-structures-levels.md)
- [Data structure decision tree](data-structure-decision-tree.md)
- [What is a design pattern](what-is-a-design-pattern.md)
