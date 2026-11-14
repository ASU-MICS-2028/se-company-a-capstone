---
title: Use case diagrams represent scenarios
tags: [ux, requirements, uml]
source: "Lecture 3"
---

# Use case diagrams represent scenarios

The lecturer extended his theatre analogy. A book (his example: a famous Nigerian novel) is made of chapters, and a staged chapter is made of **scenes**: actors walk on with props, interact for ten or fifteen minutes, the lights go down, and the next scene starts. Scenes connect to tell the bigger story.

In software engineering a scene is a **scenario**. Breaking a scenario down lets you **extract requirements for each participant**: each actor (person), each operation (process), and each agent or bot.

A **use case diagram** (a UML diagram of actors and the goals they achieve with the system) is a picture of one scenario: different actors or processes engaging to achieve a task within some constraint. Scenarios are not isolated; a use case connects to other use cases, because subsystems (for example, the menu) depend on others.

How many? A project might have five to ten use case diagrams. His PhD had 57, because detailed engineering needs detailed planning.

Working method: start from the big story ("reimagine the cafeteria for a visually impaired student"), split it into smaller stories (scenarios), extract requirements from each, then follow links to neighbouring scenarios.

## Use it in the capstone

Produce one use case diagram per major scenario in our requirements doc, and check every requirement ID appears in at least one.

## Related

- [Scenarios group requirements](scenarios-group-requirements.md)
- [Generate diagrams with AI and PlantUML](generate-diagrams-with-ai-and-plantuml.md)
- [Include versus extend in use case diagrams](include-versus-extend.md)
