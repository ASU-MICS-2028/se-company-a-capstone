---
title: Label every diagram with an ID and a one-line description
tags: [architecture, diagrams, documentation]
source: "Lecture 7"
---

# Label every diagram with an ID and a one-line description

When reviewing team submissions, the lecturer kept running into diagrams with no number and no caption. That made them hard to refer to and hard to check against the requirements.

His rule: **every diagram gets an ID and a one-line description**, in this format:

> **Use case 1:** System representation of a student ordering a meal with a screen reader.

The same applies to flowcharts, sequence diagrams, activity diagrams and architecture views ("Flowchart 2: …", "Sequence 1: …").

Related presentation feedback from the same session:

- **Make diagrams big enough to read on a slide.** One team was praised because its diagrams were larger and easier to see.
- **Number the messages in sequence diagrams** so the order is obvious. He praised this and said to keep doing it.
- **Avoid crossing lines** where you can. If a crossing can't be avoided, there should be a reason.

The point is traceability. A reviewer should be able to say "Use case 2 doesn't match Sequence 1" without guessing which picture you mean.

## Use it in the capstone

Caption every UML diagram and C4 view in our docs and in the ACM paper with an ID and a one-line description, and refer to it by ID in the text. The ACM figure format ("Figure 3: …") fits this directly.

## Related

- [Keep models traceable and consistent](keep-models-traceable-and-consistent.md)
- [Labelling requirements with IDs](labelling-requirements-with-ids.md)
- [Multiple diagrams give multiple perspectives](multiple-diagram-perspectives.md)
