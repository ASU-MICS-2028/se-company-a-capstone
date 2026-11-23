---
title: Cut the scope so the core demo fits before 10 December
date: 2026-11-23
status: proposed
deciders: Joseph Etse (Scrum Master), for the team. Accepted when the Product Owner (Dr. Adjepon-Yamoah) agrees.
issue: "#7"
ai_used: yes
---

# Cut the scope so the core demo fits before 10 December

## Context

- The proposal scored 1.5 / 2.5 on System Concept & Feasibility. That is the "over-scoped or under-ambitious" band, and it was our lowest criterion. There were no written comments, but the concept is ambitious, so we read the low score as over-scoping.
- The proposal's Must list was big:
  - USSD, SMS and desk tickets
  - a staff board that works offline
  - the model and its baselines
  - an outbox SMS worker
  - a validated data generator
- Sprint 1 produced no code. From 24 Nov to the Milestone 2 demo on 10 Dec is about 2.5 weeks. The paper's Evaluation also needs 11–14 Dec for measurement.
- User research (#29, [findings](../docs/ux/research/findings.md)) added two cheap, high-value items: a "service status today" (F1) and an emergency bypass (F4).

## Decision

One clinic, one queue, a working demo by 10 December. Everything else is ranked behind it.

| | Item | Change from the proposal | Why |
|---|---|---|---|
| **Must** (10 Dec) | Ticket by **USSD** in the Africa's Talking sandbox, and at the **desk** from the staff board | Same | The primary persona has a button phone. A USSD callback is a small HTTP endpoint, not a big build. |
| | **"Come now" SMS** in the sandbox, sent through an **outbox table and one worker**, with an idempotency key | Same, kept minimal: one table, one loop, no message broker | It's the core value. It also gives the paper its "sent exactly once" result. |
| | **Staff board v1, online**: call next, mark no-show, staff priority override (logged) | Offline moved to Should | Offline sync is the most expensive Must. Overrides also cover emergencies (F4). |
| | **Predicted wait shown as a range**, from the M/M/c and naive baselines, served by the API | Same | The demo works even if the learned model is late. |
| | **Gradient-boosting model evaluated offline** against both baselines (MAE, share within ±15 min) on synthetic data | Training and evaluation stay Must. **Serving the model live** moves to Should. | The research question needs the comparison, not live serving. |
| | **Synthetic data generator**, validated against published figures, with weekday and month effects | Same, plus F6 | Everything else depends on it. |
| | **Travel time chosen by the patient** in the USSD menu (e.g. under 15 min / 15–30 / 30–60 / over 1 h), plus a fixed buffer | **New, simpler** than learned timing | F2: transport availability, not distance, decides travel time. The patient knows it best. |
| **Should** (11–14 Dec if time) | **Service status today**: staff set "prescriber in or away" in one step, shown in USSD and SMS | **New** (F1) | Both interviews raised it, and it's small. |
| | **Offline staff board** (PWA with local storage) and **merging tickets after an outage** | Moved down from Must | It's needed for the parallel availability figure. If it's cut, the paper reports the cloud-only figure and describes the local-first design as future work. |
| | Learned model served live | Moved down from Must | Swap it in behind the same interface if it beats M/M/c |
| | Twi message templates | Same | Cheap, but it needs a translator and someone to check it |
| | Fault-injection test (SMS provider down, network down) | Same | Feeds the paper's measured availability |
| **Could** | Learned travel time (EWMA from SMS to check-in) | Moved down from Should | The patient-chosen band covers the demo |
| | Administrator daily wait report | Moved down from Should | The survey (C) will show whether anyone wants it |
| **Won't** | Joining from the web, WhatsApp bot, more than one clinic, real handsets, patient accounts | **Newly explicit** | Each is a second build of something the Musts already cover |
| | Diagnosis or triage AI, real patient data or a live pilot, lab and pharmacy stages, EMR or NHIS integration, payments | Same | Same reasons as the proposal |

**Sprint mapping:**
- **Sprint 2 (23–29 Nov):** contract, generator, baselines, scaffolds. This is the current backlog and is unchanged.
- **Sprint 3 (30 Nov–6 Dec):** queue API, USSD and SMS in the sandbox, outbox, board v1, and the model evaluation.
- **Sprint 4 (7–10 Dec):** integration and the demo.
- **11–14 Dec:** Shoulds that feed the paper, then measurement.

## Options we rejected

- **Keep the proposal's scope.** That's two Sprint 1 items behind plus offline sync in 2.5 weeks. We would risk having no working demo on 10 Dec, which matters more than any single feature.
- **Drop USSD and build a web app only.** It's easier to build, but it abandons our primary persona and the proposal's main inclusion argument.
- **Drop the learned model and use M/M/c only.** That's cheaper, but it removes the research question and the "intelligent component" the brief requires.

## Consequences

- Eric freezes the API contract (#7) on this scope. Kobina's frontend (#10) needs only the staff board and no patient web screens. USSD is a backend endpoint (#8).
- Henry's work (#9) gets a clear finish line: an offline evaluation. Serving the model live comes afterwards.
- The paper says plainly what was built, what ran in a sandbox and what was left out. That is the scope control the rubric asks for.
- **Review on 27 Nov**, after the survey closes. Two things to check:
  1. If Survey A shows most respondents use smartphones, ask the Product Owner whether joining from the web should move up from Won't.
  2. If many respondents would not act on a text (A5), discuss the core idea before Sprint 3.
- Once the Product Owner agrees, set the status to "accepted".

## AI use

Claude Code drafted the ranking from the submitted proposal's MoSCoW table, the grade and findings.md. Joseph and the team review it, and the Product Owner approves it.
