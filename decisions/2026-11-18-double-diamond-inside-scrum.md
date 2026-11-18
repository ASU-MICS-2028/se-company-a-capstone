---
title: Run the double diamond inside our Scrum sprints
date: 2026-11-18
status: accepted
deciders: Joseph Etse (Scrum Master), for Nyansapo Systems
issue: "#29"
ai_used: yes
---

# Run the double diamond inside our Scrum sprints

## Context

Our proposal rested on published studies only. The course teaches the double diamond (an exam topic) and human-centred design, warns against solution fixation, and says a short survey of real users is effectively required. The plan had issues for requirements (#5) and design (#6) but none for user research or usability testing. With six weeks, we can't run the stages one after another.

## Decision

We run the four stages inside the sprints, with design kept one step ahead of building:

| Stage | Work | Issue | When |
|---|---|---|---|
| Discover | Survey, interviews, observation, competitor review | #29 | Sprint 1, 18-22 Nov |
| Define | Personas from evidence, as-is journey map, requirements and user stories | #5, #6 | 21-25 Nov |
| Develop | Sketches, low-fidelity wireframes, Figma high-fidelity prototype | #6 | 23 Nov - 2 Dec |
| Deliver | Heuristic evaluation, cognitive walkthrough, user tests with SUS, fixes | #30 | Sprint 3, 30 Nov - 6 Dec |

Engineering doesn't wait. The API contract (#7) is drafted from the proposal now and revised when the user stories land. The frontend (#10) sets up the project. The data generator (#9) depends on nothing from UX.

## Options we rejected

- **Skip user research and design from the proposal.** That is solution fixation, and the grader looks for evidence behind each decision.
- **A design-only phase before any code.** The lecturer allows this for big projects, but with a 10 Dec demo we would lose two weeks of building.

## Consequences

- Everyone runs 1-2 interviews this week, on top of their own issue.
- The paper's Methodology names the double diamond and Harte et al. (2017), with our own data at each stage.
- Requirements may change after #29, and the API contract changes with them. Expect one revision of `openapi.yaml`.

## AI use

Claude Code proposed the stage-to-sprint mapping from our course notes and drafted the survey and interview guide. Joseph approved the plan; Liza reviews the research instruments before use.
