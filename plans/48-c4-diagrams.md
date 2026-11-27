---
issue: 48
title: C4 diagrams (levels 1 to 3) and deployment assumptions
workstream: architecture
owner: Eric Sunu
status: in-progress
milestone: M2 Core demo
depends_on: "#45, #47"
---

# C4 diagrams (levels 1 to 3) and deployment assumptions

Issue: [#48](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/48). Part of [#7](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/7).

## Goal

Draw the system at three zoom levels and say where each part runs, so the team, the paper and the ASERC slides share one picture. Rubric: System Design (8%).

## Done when

- [x] Level 1, system context: patient, staff, Africa's Talking, and Twɛn.
- [x] Level 2, containers: API, outbox worker, PostgreSQL, staff board. The patient web page is drawn too, because web booking came back in [#58](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/58) after this issue was written.
- [ ] Level 3, components of the API: the core and its adapters (SMS, USSD, predictor, database).
- [ ] Deployment assumptions: where each container runs for development and for the demo, and what happens when the network or the SMS provider is down.
- [ ] Diagrams kept as editable source (for example Mermaid) in `docs/architecture/`. Levels 1 and 2 are Mermaid in `docs/architecture/c4.md`; tick this when level 3 and the deployment view are there too.

## Inputs and outputs

- **Uses:** the scope cut (on `main`), contract v0.2 ([PR #55](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/55)), the style, stack and hosting decisions ([PR #57](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/57)), the data model ([PR #62](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/62)) and the predictor interface ([PR #56](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/56)). All four are still proposals, so the diagrams follow them as drafts.
- **Produces:** `docs/architecture/c4.md`, used by the paper (#13), the ASERC talk (#16) and the backend (#8).

## Steps

1. Levels 1 and 2 in Mermaid, each with a figure ID, numbered arrows and a key that says why each box is separate.
2. Level 3 for the API, once PR #57 is agreed: the hexagonal core, the SMS, USSD and predictor adapters, and the data module (#57 drops the database port).
3. The deployment view, once the demo host is confirmed (the Oracle sign-up is due by 30 Nov).
4. Recheck every arrow against the contract once v0.2 is frozen.

## Out of scope

- Level 4 (code).
- The frontend's internal structure (Kobina, #10).

## Log

- 2026-11-27: Levels 1 and 2 drafted in `docs/architecture/c4.md`, following PRs #55, #56, #57 and #62.
