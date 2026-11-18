---
title: Roles and workstream owners
date: 2026-11-18
status: accepted
deciders: Joseph Etse (Scrum Master), for Nyansapo Systems
issue: "#3"
ai_used: yes
---

# Roles and workstream owners

## Context

Sprint 1 (16-22 Nov) had started with no issue assigned, and the API contract (#7) blocks the most work. Scrum needs a Product Owner and a Scrum Master, and each workstream needs one owner so that only one person writes its plan and files.

## Decision

**Scrum roles:** Liza Aikins is Product Owner. Joseph Etse is Scrum Master. Everyone is a developer.

**Owners**, matched to what each person has already built (their public GitHub work), with three issues drawn at random where nobody was a clear fit:

| Owner | Issues | Why |
|---|---|---|
| Liza Aikins | #5 Requirements, #6 UX and wireframes | The Product Owner owns the backlog and user stories; she has built several mobile app interfaces |
| Eric Sunu | #7 Architecture and API contract, #8 Backend | Full-stack TypeScript and Python, offline-first AI apps for Ghana, and threat modelling. The person who writes the contract builds the API to it |
| Henry Kofi Brandoh | #9 Intelligent component | Health AI and machine learning (PyTorch, scikit-learn) |
| Kobina Opei Jr. | #10 Frontend, #18 Integration, #14 Ethics *(random)* | React with Vite and Tailwind, plus Node backends, so he can wire both ends |
| Micheal Boadi | #13 ACM paper, #16 Presentation *(random)*; supports #9 | Deep-learning research projects (segmentation, load monitoring); helps Henry with the evaluation |
| Joseph Etse | #1, #2 Proposal, #3 and #15 Scrum, #11 Quality and CI, #17 Knowledge base, #12 Availability *(random)* | Scrum Master; set up the repo, CI and knowledge base |

## Options we rejected

- **Everyone works on everything.** Nobody owns a file, so plans and merges collide.
- **Fully random assignment.** It wastes skills the team already has, such as health ML or React with Vite.

## Consequences

- Each owner now edits their own plan and opens PRs for their issues. Anyone else comments on the issue instead.
- Owners can swap issues by agreement. Record the swap with a new decision file that supersedes this one.
- Everyone presents part of the ASERC talk. #16's owner coordinates the slides and the demo script.

## AI use

Claude Code read each member's public GitHub repositories and proposed owners. The three random issues were drawn by script. Joseph set the Scrum roles and approved the assignment.
