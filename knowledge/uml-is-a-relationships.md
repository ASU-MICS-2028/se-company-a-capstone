---
title: UML is-a relationships
tags: [architecture, uml, diagrams]
source: "Lecture 10; Lecture 12"
---

# UML is-a relationships

In a UML class diagram, a line with a **hollow (unshaded) triangle arrowhead** means **inheritance** (generalisation). Read it as "is-a": *pending state is an order state*, *mammal is an animal*, *reptile is an animal*. This is the standard way to show that one class is a child of another.

If the parent is an **interface** rather than a class, the relationship is different: the child *implements* the interface. UML draws this with a dashed line and a hollow arrowhead (realisation). The lecturer asked students to look up this difference, since "even though they are UML, the symbols are different".

A UML class box has three parts: the class name, then the attributes (what it stores), then the operations (what it does). Members are marked private (−) or public (+).

The lecturer also pointed out that AI-generated diagrams can mislabel things, such as calling a class diagram an object diagram. Check them.

## Use it in the capstone

Use correct UML arrows in the class and component diagrams that support our C4 model, and review any AI-generated diagram before it goes into the docs.

## Related

- [State pattern](state-pattern.md)
- [Polymorphism and runtime binding](polymorphism-and-runtime-binding.md)
