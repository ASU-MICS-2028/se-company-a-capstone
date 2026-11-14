---
title: Pattern decision guide (4 steps)
tags: [patterns, architecture]
source: "Ashesi CSIS Capstone Design Patterns & DS&A deck, slide 16"
---

# Pattern decision guide (4 steps)

Pick patterns deliberately, not because they sound impressive:

1. **Identify what changes.** Find the axis of variation (object creation, behaviour, structure) and choose a pattern that wraps that variation.
2. **Define the collaboration.** How do objects relate? One-to-many suggests Observer. One-to-one delegation suggests Strategy. Hierarchical composition suggests Composite.
3. **Assess trade-offs.** Is the extra indirection worth it? Avoid over-engineering simple problems.
4. **Validate against requirements.** Does the pattern serve the non-functional requirements (performance, maintainability, scalability)? Map it to an architecture layer.

The deck's discussion question: which step is most often skipped? Usually step 4. A pattern applied without checking it against requirements adds complexity with no payoff.

The capstone advice adds: record **at least two alternatives** considered and why you rejected them.

## Use it in the capstone

Write each pattern decision in the design doc as four short lines (what varies, collaboration, trade-off, requirement served) plus the alternatives. That is exactly the architectural reasoning the brief asks for.

## Related

- [Gang of Four pattern catalogue](gang-of-four-catalogue.md)
- [Capstone design patterns and DS&A deck summary](capstone-design-patterns-dsa-deck.md)
- [Quality attributes are non-functional requirements](quality-attributes-are-non-functional-requirements.md)
