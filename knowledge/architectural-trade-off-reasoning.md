---
title: Architectural trade-off reasoning
tags: [architecture, quality, capstone]
source: "Lecture 10; Lecture 13"
---

# Architectural trade-off reasoning

The capstone "must allow for architectural reasoning". That means:

- If you choose an architectural style that favours one quality attribute over another (for example, **scalability over security**, or **reliability with safety**), say *which trade-off* you made and *why*.
- Combine styles effectively, and explain where each one applies.
- Back quality claims with **calculations**. "We have high availability" needs maths: availability, reliability and basic dependability calculations (covered in the quality engineering topic).

From Lecture 10: quality attributes always involve trade-offs, and patterns, data structures and algorithms are the tools for meeting them. Interviewers ask candidates to draw a system diagram and **justify every technology and pattern** in it.

## Use it in the capstone

Add a "decisions and trade-offs" section to the architecture doc (one architectural decision record per major choice). Link each NFR to the tactic that meets it and to the calculation or test that proves it.

## Related

- [Quality attributes are non-functional requirements](quality-attributes-are-non-functional-requirements.md)
- [Order for assessing quality attributes](order-for-assessing-quality-attributes.md)
- [Ride-hailing architecture review](ride-hailing-architecture-review.md)
