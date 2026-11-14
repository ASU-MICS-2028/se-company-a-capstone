---
title: Definition of Done
tags: [agile, scrum, quality]
source: "Lecture 9; Lecture 5; Scrum Guide 2020 (in personal notes); ICS 530 Scrum lecture deck"
---

# Definition of Done

The **Definition of Done (DoD)** is the shared checklist that an **increment** must pass. An increment is the working, potentially releasable version of the product made in a sprint. The lecturer flagged the difference between the DoD and acceptance criteria as a likely interview question:

| | Acceptance criteria | Definition of Done |
|---|---|---|
| Applies to | One user story or backlog item | The whole sprint's increment |
| Made of | The tasks or checks under that story | All stories' criteria, plus quality rules |
| Tied to | The story's need | The [sprint goal](sprint-goal.md) |

As tasks are ticked off, a story's acceptance criteria are met. All the stories together make up the sprint's DoD.

A typical DoD from class: all acceptance criteria met, code peer-reviewed and merged, unit and integration tests pass, and the feature runs smoothly in a QA or staging environment. The goal must be **100% achieved, not 95%**.

The lecturer added one more condition: **it is deployed on a proper server that mimics the client's environment**, and the client has approved it at the [sprint review](sprint-review.md). Only then is it pushed to production. See [deploy demos to a staging server](deploy-demos-to-a-staging-server.md).

## Use it in the capstone

Write our DoD once, put it in the Scrum records and the test plan, and check every sprint against it. Be ready to explain the DoD-versus-acceptance-criteria difference in the interview.

## Related

- [Acceptance criteria must be specific and simple](acceptance-criteria-specific-and-simple.md)
- [Testing stages: developer, QA, alpha, beta](testing-stages-developer-qa-alpha-beta.md)
- [Verification versus validation](verification-versus-validation.md)

## Also in Lecture 5

The lecturer's short form: done means **complete, usable and ready to release**. He framed it as "quality is everyone's commitment" and as a checklist of what must be present - for an automated menu board: the board is installed, the software behind it works, and every listed item is ticked. Write it in specific, measurable language, not ambiguous prose ("this is not the time to use literature").

## Also in Scrum Guide 2020 (in personal notes); ICS 530 Scrum lecture deck

The Scrum deck's Definition of Done checklist: meets acceptance criteria; code reviewed; integrated; tested and passing; documentation updated; complete, usable and ready to release. The Scrum Guide adds that an item failing the DoD cannot be released *or even shown at Sprint Review*. It goes back to the Product Backlog. The moment an item meets the DoD, an Increment is born.
