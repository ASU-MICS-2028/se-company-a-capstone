---
title: "Prosit 2: modelling the Akornor system"
tags: [ux, architecture, course, prosit, uml]
source: "Prosit 2: Inclusive Akornor Cafeteria System"
---

# Prosit 2: modelling the Akornor system

**Question.** What happens *inside* the system when a user carries out the Prosit 1 journey? The task is to turn UX designs into formal models that developers and stakeholders can read before anything is built.

**Required: six diagrams,** two of each kind, covering different but related scenarios:
| Kind | Diagram 1 | Diagram 2 |
|---|---|---|
| [Use case](use-case-diagram.md) | Whole ordering journey | Accessibility-specific interaction |
| [Flowchart](flowchart-with-exception-paths.md) | Normal ordering path | Accessibility or exception path (for example, an interrupted order) |
| [Sequence](sequence-diagram.md) | Successful order | Accessibility mechanism made visible |

Plus scenario descriptions, a traceability matrix of at least six requirements, assumptions, and modelling rationale.

**Marks (100):** problem 10; use cases 20; flowcharts 15; sequence diagrams 20; traceability 15; accessibility modelling 10; consistency 5; defence 5.

**Consistency check.** Does the use case agree with the flowchart, and the flowchart with the sequence diagram? The chain to defend is: user → problem → evidence → requirement → UX decision → Figma → use case → flowchart → sequence → validation.

The guiding principle, paraphrased: don't draw diagrams because you were told to. Model the system because you need to show how the inclusive experience actually works.

## Use it in the capstone

Documentation section B3 needs component-interaction and data-flow diagrams. Draw one use case, one flowchart and one sequence diagram for our core feature, and check that they agree with each other.

## Related

- [Prosit 1: inclusive Akornor UX](prosit-1-inclusive-akornor-ux.md)
- [Design traceability chain](design-traceability-chain.md)
- [Multiple diagram perspectives](multiple-diagram-perspectives.md)
