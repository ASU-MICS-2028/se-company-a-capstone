---
title: Design traceability chain
tags: [ux, quality, requirements, traceability]
source: "Prosit 1 and Prosit 2: Inclusive Akornor Cafeteria System"
---

# Design traceability chain

**Traceability** means every design element can be followed back to the need that justified it, and forward to where it is built and tested. The course insists on it so that diagrams and screens are never decoration.

The chain:

> User problem → user need → requirement → UX decision → screen → use case → flowchart → sequence diagram → test or validation

Worked example from the prosits:
- **Problem:** the user cannot tell order status from colour alone.
- **Requirement:** order status must use text and indicators that don't depend on colour.
- **UX decision:** explicit labels such as "Preparing", "Ready for collection", "Collected".
- **Screen:** an accessible Order Status screen.
- **Use case:** Track Order. **Flowchart:** determine order status. **Sequence:** the system retrieves the status, transforms it, and communicates it.

Record the chain as a **traceability matrix**: one row per requirement ID, with columns for screen, use case, flowchart, sequence diagram and test case.

## Use it in the capstone

Keep a traceability matrix in `docs/`, keyed by requirement IDs. It answers "why does this exist?" in Q&A, and it shows "user-centred" requirements for rubric B. Add a test-case column so quality evidence links back too.

## Related

- [Labelling requirements with IDs](labelling-requirements-with-ids.md)
- [Prosit 2: modelling the Akornor system](prosit-2-akornor-system-modelling.md)
- [Requirements classification matrix](requirements-classification-matrix.md)
- [Keep models traceable and consistent](keep-models-traceable-and-consistent.md)
