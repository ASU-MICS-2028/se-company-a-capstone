---
title: Keep models traceable and consistent
tags: [architecture, diagrams, requirements]
source: "Lecture 7"
---

# Keep models traceable and consistent

**Traceability** means you can follow each requirement through every model that represents it, and back to the user need it came from.

Practices that came up in the Lecture 7 reviews:

- **A consistency table.** One team ended with a table listing each behaviour (for example "resume interrupted order") and where it appears: Use case 2, Flowchart 2, Sequence diagram 1. The lecturer did not single this table out, but it is a quick way to show that the models agree.
- **No orphan features.** A team mentioned "favourites" and "order again" features verbally, but neither appeared in the diagrams. The reviewers pointed this out: if the flow is being modelled, the feature should be in the flow.
- **Connect actors to the flows they affect.** For example, the staff's *Update status* should link to the student's *Track order* (see [include versus extend](include-versus-extend.md)).
- **Modelling comes after user research.** Requirements come out of user research and the prototype. System modelling then shows how the proposed solution behaves. It does not redesign the solution.

## Use it in the capstone

Keep a traceability matrix: requirement ID → user story → diagram IDs → test case IDs. It joins the requirements, architecture and quality deliverables, and markers can check it quickly.

## Related

- [Label every diagram with an ID and a one-line description](label-every-diagram-with-id-and-description.md)
- [Labelling requirements with IDs](labelling-requirements-with-ids.md)
- [Build and maintain against the requirements document](build-and-maintain-against-the-requirements-document.md)
