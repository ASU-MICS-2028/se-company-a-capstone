---
title: Every extend needs a condition that matches a flowchart decision
date: 2026-09-30
owner: Group A
tags: [prior-work, modelling, uml, consistency]
issue: ""
---

# Every extend needs a condition that matches a flowchart decision

## What happened

In Prosit 2 we drew use case diagrams, flowcharts and sequence diagrams for the same scenarios. It was easy for the three to drift: a use case relationship with no matching branch, or a name spelled differently in each diagram.

## What we learned

A simple cross-check kept them consistent:
- Every «include» is a mandatory step (it appears on the flowchart's main path).
- Every «extend» carries a bracketed condition, and that condition is a decision diamond in the flowchart and an `alt` frame in the sequence diagram. Example: [allergen in profile] = "Allergen in saved profile?" in FC1 = the Go back / Add anyway `alt` in SD2.
- Names and example values (order 42, Counter 2) are identical everywhere.

## Do this next time

After drawing, list every «extend» condition and tick off its diamond and `alt` frame. Keep one glossary of action names and reuse it in every diagram.

## Related

- [Include versus extend in use case diagrams](../knowledge/include-versus-extend.md)
- [Akornor modelling package: three scenarios, three views](../knowledge/akornor-modelling-package-three-scenarios-three-views.md)
