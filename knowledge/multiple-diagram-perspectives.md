---
title: Multiple diagrams give multiple perspectives
tags: [architecture, design, diagrams, stakeholders]
source: "Lecture 1"
---

# Multiple diagrams give multiple perspectives

After formalising requirements, the design step asks: which diagrams represent which part of the system?

The lecturer used the poem of the **six blind men and the elephant**. Each man touched one part (tusk, ear, leg, tail, trunk) and compared it to something he knew: a spear, a fan, a tree trunk, a rope, a snake. None was wrong; each had one perspective. When they pool their views, they get a fair approximation of the whole elephant.

Software design works the same way:
- A UX-minded person may draw a **use case diagram** (user-focused).
- Another may draw a **flowchart**, a **sequence diagram**, or another UML diagram (UML = Unified Modeling Language, a standard set of software diagrams).
- In technical drawing, front, side and top elevations together approximate the 3D house.

When stakeholders sit together and review all the diagrams, they correct each other ("this sequence is wrong", "this part is not accurate") before any code is written. The result is a shared overview and **consensus**, and building starts from there.

Design draws the diagrams; analysis connects the dots so people understand what the system is.

## Use it in the capstone

Our C4 architecture (context, container, component views) is exactly this idea: several views of one system. Review them as a team before implementation and note agreed changes in sprint records.

## Related

- [Software development lifecycle stages](software-development-lifecycle-stages.md)
- [Scenarios group requirements](scenarios-group-requirements.md)
