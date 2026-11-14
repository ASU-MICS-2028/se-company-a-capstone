---
title: Flowchart with exception paths
tags: [architecture, uml, quality]
source: "Prosit 2: Inclusive Akornor Cafeteria System"
---

# Flowchart with exception paths

A **flowchart** models a process as steps (rectangles), decisions (diamonds), inputs and outputs, with a clear **start** and **end**. Its value is in showing the paths that leave the happy path.

Prosit 2 asks for two flowcharts:
1. **Normal path:** Start → open → browse/search → select → details → cart → checkout → pay → confirm → track → End.
2. **Exception path,** where an accessibility need or an error changes the flow. For example:
   - "Is meal information accessible?" No → switch to screen-reader presentation → user confirms → continue.
   - "User leaves mid-order. Is the order saved?" Yes → resume. No → recover or restart.

Checks: decisions drawn as diamonds with labelled exits; error and alternative paths present; the flow matches the real UX and the sequence diagram.

## Use it in the capstone

Draw the failure paths for our core feature: payment fails, the network drops, the model is unavailable. These become test cases and feed the risk and mitigation plan, plus the reliability discussion.

## Related

- [Use case diagram](use-case-diagram.md)
- [Sequence diagram](sequence-diagram.md)
- [Testing with extreme inputs](testing-with-extreme-inputs.md)
