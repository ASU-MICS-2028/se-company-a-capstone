---
title: Model alternative paths, not just the happy path
tags: [architecture, diagrams, quality]
source: "Lecture 7"
---

# Model alternative paths, not just the happy path

The **happy path** is the flow where everything goes right. **Alternative paths** show what happens when something does not: payment fails, the user is interrupted, or a number is misheard.

The lecturer praised both teams for adding them:

- One team's system diagram had an **alternative path** for a mismatch at the counter. If a visually impaired student mistakes their order number, the server reads out the order and the conflict is resolved there.
- The other team's sequence diagram used **alt blocks** (a sequence-diagram frame that shows "if this, else that") for payment success or failure. It also covered interruptions: if the session is idle for about two minutes, the order is saved and the user resumes from that point.

He called handling interruptions with persistence "very essential". Alternative paths are where reliability and usability problems hide, so drawing them forces you to design the recovery.

Two related tips:

- **Number the steps** so readers can follow the path.
- **Follow structured flowchart conventions**: standard symbols for start/end, process, decision and flow arrows. Don't rely on numbered boxes alone. The lecturer said he preferred the traditional structured notation.

## Use it in the capstone

For each core use case, draw at least one failure or interruption path in a sequence or activity diagram. Then write a matching test case in the test plan. These paths are also the scenarios to use in the reliability calculations.

## Related

- [Label every diagram with an ID and a one-line description](label-every-diagram-with-id-and-description.md)
- [Testing with extreme inputs](testing-with-extreme-inputs.md)
- [Performance versus reliability](performance-versus-reliability.md)
