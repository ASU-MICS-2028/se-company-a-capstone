---
title: Quality attributes are non-functional requirements
tags: [quality, requirements, non-functional]
source: "Lecture 10"
---

# Quality attributes are non-functional requirements

A **functional requirement** says what the system does (for example, "a student can place an order"). A **non-functional requirement (NFR)** says how well it does it. The lecturer treats NFRs and **quality attributes** as the same thing: when we judge the quality of software, we are checking its NFRs.

Common quality attributes named in class:

- availability
- performance
- reliability
- security
- privacy
- safety
- usability
- accessibility
- resilience (recovering from failure)
- maintainability and scalability

Many end in "-ility", but not all (performance, privacy, safety, security).

Design patterns, data structures, algorithms and architecture all exist to meet these attributes. They are the engineering base under a robust, scalable system. Quality attributes also pull against each other, so every design has **trade-offs**. For example, more security checks can slow performance down.

## Use it in the capstone

The requirements document needs a clear NFR section. Each NFR should be measurable, so the test plan and the availability and reliability calculations can check it.

## Related

- [Order for assessing quality attributes](order-for-assessing-quality-attributes.md)
- [Privacy versus security](privacy-vs-security.md)
- [Architectural trade-off reasoning](architectural-trade-off-reasoning.md)
- [Functional, non-functional requirements and constraints](functional-non-functional-requirements-and-constraints.md)
