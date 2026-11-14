---
title: Functional, non-functional requirements and constraints
tags: [ux, requirements, quality]
source: "Lecture 1; Lecture 7"
---

# Functional, non-functional requirements and constraints

The lecturer taught three branches of requirements, using a chair and a door as examples:

1. **Functional requirements** - what the system does. A chair lets you sit and rest your back. A door lets you enter a building.
2. **Non-functional requirements**, also called **quality attributes** - the state or quality of the system while it does its job. For the chair: is it **available** (is it there, all of it)? Is it **safe** (will it tear your clothes or hurt your leg)? Does it **perform**? Is it **reliable**? Others he named: security, privacy, confidentiality. Analysing these and their trade-offs is **quality attribute analysis**.
3. **Constraints** - what the system is not, cannot do, or the limits it operates under. A chair is not a bed or a table, even if you could sleep on it. A swivel chair is not an armchair. A website cannot work without internet; a smartphone app will not run on a feature phone. You do not list everything out of scope, only the critical constraints.

Assumptions are dangerous: use a product as its maker intended.

Quality has a price: higher quality levels cost more per unit, so budget sets the level - a non-functional trade-off.

## Use it in the capstone

Structure our requirements doc into these three sections. The quality attributes we list (availability, reliability) are the ones we must later measure in the quality engineering deliverable.

## Related

- [Performance versus reliability](performance-versus-reliability.md)
- [Labelling requirements with IDs](labelling-requirements-with-ids.md)
- [Deployment targets are not only the web](deployment-targets-are-not-only-the-web.md)

## Also in Lecture 7

When reviewing a team's cafeteria design for visually impaired students, the lecturer asked whether they were claiming to meet *all* the needs of visually impaired people. A requirements section should state clearly what the system does **and what it does not do**, even if it lists only one item. Leaving constraints out implies a scope you cannot deliver.
