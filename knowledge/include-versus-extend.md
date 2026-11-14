---
title: Include versus extend in use case diagrams
tags: [architecture, diagrams, uml, use-case]
source: "Lecture 7; PROSIT 2 Group A System Modelling Package, section 3 (30 Sept 2026)"
---

# Include versus extend in use case diagrams

The lecturer said he would check specifically whether teams used **include** and **extend** correctly, because "people often don't use that quite well." The standard UML meaning:

- **«include»**: the base use case *always* runs the included one. It pulls out a shared, compulsory step. Example: *Place order* «include» *Make payment*. The arrow points from the base case to the included case.
- **«extend»**: adds *optional or conditional* behaviour to a base case, only under some condition. Example: *Retry payment* «extend» *Make payment*, only when payment fails. The arrow points from the extension to the base case.
- **Generalisation** (hollow triangle) = "is a kind of".

Quick test: if the step happens every time, use include. If only sometimes, use extend.

Feedback from class: one team had *Update order status*, done by staff, floating alone. It should connect to the student's *Track order* through include or extend, or the diagram hides that the staff's action is what the student sees. Also, every feature mentioned (for example "favourites") should appear in the diagrams, or be visibly linked to the use case it belongs to.

## From our Prosit 2 work

- We wrote every «extend» condition in brackets, e.g. *Warn About Allergen* «extend» *Add to Cart* [allergen in profile].
- Team rule: every «extend» condition must match a decision diamond in the flowchart. If a condition has no diamond, one of the two diagrams is wrong.
- We put **TalkBack as an external actor**: outside our code, but it carries every sound and gesture, so leaving it out hid the accessibility interface.

## Use it in the capstone

Check each «include» and «extend» before submission, make sure every actor's use case connects to the flow it affects, and add a relationship-justification table (relationship, type, why, requirement ID) next to each diagram.

## Related

- [External services as use case actors](external-services-as-use-case-actors.md)
- [Keep models traceable and consistent](keep-models-traceable-and-consistent.md)
- [Label every diagram with an ID and a one-line description](label-every-diagram-with-id-and-description.md)
- [Akornor modelling package: three scenarios, three views](akornor-modelling-package-three-scenarios-three-views.md)
- [Every extend needs a condition that matches a flowchart decision](../learnings/every-extend-needs-a-condition-that-matches-a-flowchart-decision.md)
