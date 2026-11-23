---
title: Stop at two interviews; use the survey and published studies for the rest
date: 2026-11-23
status: accepted
deciders: Joseph Etse (Scrum Master), Liza Aikins (Requirements and UX), Henry Kofi Brandoh, Kobina Opei Jr.
issue: "#29"
ai_used: yes
---

# Stop at two interviews; use the survey and published studies for the rest

## Context

The plan for #29 called for 6–12 interviews by 22 Nov. On 23 Nov we have two: a nurse (S01) and a patient (P01), both at one community health centre. That centre sees 15–20 patients a day and has no queue.

Sprint 2 also has to deliver requirements, personas and the first code. Milestone 2 is on 10 Dec, so more interview rounds would come out of build time.

## Decision

We stop interviewing at two. Discovery evidence comes from three sources:

1. **The two interviews.** They supply what the literature lacks: patients aren't told whether the prescriber is in, transport availability decides travel time, the staff side runs on paper with one nurse doing every job, and emergencies must bypass booking.
2. **Survey A (patients) and Survey B (staff).** These run as planned. The target is 20 or more patient responses, at least 5 of them read aloud, open 24–26 Nov.
3. **The published studies already cited in the proposal.** These are the evidence for the problem itself: long waits, early arrival, and records as the bottleneck.

The competitor review stays, because it is desk work.

## Options we rejected

- **Keep interviewing to 6–12.** This is the strongest evidence, but it costs about a week we don't have before Milestone 2.
- **Drop the survey too and rely on literature only.** Then nothing would test our riskiest assumption, that people will act on one text (survey question A5), and we would have no local data for the data generator (#9).
- **Treat the two interviews as representative.** Neither person had a long OPD wait, so they can't support the problem statement on their own.

## Consequences

- `docs/ux/research/findings.md` and the paper's Methodology must state the limitation: two interviews at one low-volume health centre, plus a convenience-sample survey and the published studies.
- Personas (#6) take the problem from the literature and the details (channels, transport, cost) from the survey and the interviews. Each persona says which source backs it.
- The #29 plan's "done when" changes from 6–12 interviews to two interviews and this decision.
- We tell the Product Owner (Dr. Adjepon-Yamoah) at the next class, because this is a scope change. If he asks for more interviews, we write a new decision that supersedes this one.
- If a busy polyclinic visit becomes possible later in the sprint, one observation session is a cheap way to add evidence.

## AI use

Claude Code drafted this decision from the team's discussion and the two interview notes. Joseph checked it against what the team agreed.
