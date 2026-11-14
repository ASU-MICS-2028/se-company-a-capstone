---
title: "Akornor modelling package: three scenarios, three views"
tags: [prior-work, architecture, uml, modelling]
source: "PROSIT 2 Group A System Modelling Package and Presentation (30 Sept 2026)"
---

# Akornor modelling package: three scenarios, three views

Prosit 2 explained what happens *behind* the Prosit 1 screens. We picked three scenarios, all from Kofi's side, and drew each one in three views.

**Scenarios.**
- **S1 Successful order:** meal plan, collect at the counter.
- **S2 Allergen conflict:** TalkBack reads "contains your allergen"; the warning takes focus.
- **S3 Handover exception:** verifying the right meal without sight (the fried-rice case).

**Views (UML 2.5 and ISO 5807 flowchart symbols).**
- **Use case diagrams** (what the system offers): UC1 the full ordering journey for any student; UC2 the same goals reached without sight.
- **Flowcharts** (step logic): FC1 normal ordering with eight decisions; FC2 the handover exception. Every loop has an exit.
- **Sequence diagrams** (messages over time): SD1 successful order, messages 1 to 27, with an `alt` frame for payment failure (28 to 31); SD2 the allergen warning by screen reader.

**Cross-diagram consistency.** Names (Add to Cart, Read Back Order, Ready for Collection) and example values (order 42, Counter 2) are identical in every view, and "Go back" returns to the menu in both FC1 and SD2.

**Key modelling decisions.** Delivery Dispatcher is a *generalisation* (a kind of) Cafeteria Staff, so it inherits the handover rules; one Payment Subsystem handles all four methods so failure handling is built once; the meal-plan balance lives in the external Campus Account System.

## Use it in the capstone

Reuse the scenario-per-view grid for capstone design docs: one table row per scenario naming its use case, flowchart path and sequence messages.

## Related

- [Multiple diagram perspectives](multiple-diagram-perspectives.md)
- [Scenarios group requirements](scenarios-group-requirements.md)
- [Include versus extend in use case diagrams](include-versus-extend.md)
- [Accessibility Layer as its own sequence lifeline](accessibility-layer-as-its-own-sequence-lifeline.md)
- [Traceability matrices let us defend every decision](../learnings/traceability-matrices-let-us-defend-every-decision.md)
