# Sprint 2 backlog (23–29 Nov 2026)

**Sprint goal:** turn the research into requirements, and get a walking skeleton running end to end: the API contract, a backend health endpoint, a frontend that runs against a mock, and a wait-time baseline.

**Why this goal:** Milestone 2 (10 Dec) needs working code, not slides. After this sprint, two more remain before it (30 Nov–6 Dec and 7–10 Dec).

**Product Owner:** Dr. Adjepon-Yamoah. He approves the order of this list at planning and accepts the work at the sprint review.
**Scrum Master:** Joseph Etse

Points use a Fibonacci scale: 1 is a few hours and 8 is most of a week for one person. Anything bigger than 8 gets split.

## Committed

| # | Item | Issue | Owner | Pts | Done when |
|---|---|---|---|---|---|
| 1 | Finish the user research: write up the survey and interviews, and run the synthesis session | #29 | Liza | 3 | `docs/ux/research/findings.md` is merged |
| 2 | Personas and the as-is journey map, built from the findings | #6 | Liza | 3 | Two or three personas and one journey map are merged |
| 3 | First user stories with acceptance criteria, for the patient check-in, queue position and SMS alert flows | #5 | Liza | 5 | At least 8 stories in the repo, each with testable criteria |
| 4 | Decision on the architecture style: a modular monolith, event-driven SMS with an idempotent consumer, and a ports-and-adapters interface for the SMS provider | #7 | Eric | 2 | A `decisions/` file is merged |
| 5 | API contract v0 in OpenAPI, shared the same day | #7 | Eric | 5 | `openapi.yaml` is merged, and #8, #9 and #10 build against it |
| 6 | Backend scaffold with a health endpoint and one test | #8 | Eric | 3 | CI runs the test, and `GET /health` returns 200 |
| 7 | Synthetic clinic arrival data generator | #9 | Henry | 3 | The script and a sample CSV are merged, with a README on the assumptions |
| 8 | M/M/c (Erlang C) wait-time baseline, evaluated on the synthetic data | #9 | Henry | 5 | MAE is reported in the repo |
| 9 | Frontend scaffold (React, TypeScript, Vite) with a mock server built from the contract | #10 | Kobina | 3 | `npm run dev` shows a screen with mock data |
| 10 | CI runs lint and tests for backend and frontend on every PR | #11 | Joseph | 2 | A PR fails when a test fails |
| 11 | Risk register v1 | #11 | Joseph | 2 | `docs/quality/risk-register.md` is merged |
| 12 | ACM paper: template set up, outline, and 10 related-work sources | #13 | Micheal | 3 | Outline and an annotated source list are merged |
| 13 | Record the cadence decision and move every issue onto the board | #3 | Joseph | 1 | A `decisions/` file is merged and #3 is closed |
| 14 | Instructor proposal feedback copied into #1 | #1 | Joseph | 1 | A comment on #1, and #1 is closed if approved |

**Committed total: 41 points.** We have no velocity from Sprint 1 yet, so 41 is a guess. We'll check it at the review.

## Stretch (only if the committed work is done)

| Item | Issue | Owner | Pts |
|---|---|---|---|
| Low-fidelity wireframes of the patient and clinic screens | #6 | Liza, with Kobina | 3 |
| First C4 context and container diagrams | #7 | Eric | 2 |
| Confirm the Act 843 references in the proposal against the statute | #14 | Micheal | 1 |

## Not this sprint

High-fidelity prototype (#6), the learned model (#9), integration (#18), usability tests (#30) and the availability calculations (#12). They depend on this sprint's output.

## Ceremonies

| Event | When | Who |
|---|---|---|
| Planning | Mon 23 Nov, after class | Whole team. The PO approves the order. |
| Daily stand-up | 15 minutes, every weekday, on WhatsApp call or in person. Each person says what they did yesterday, what they'll do today, and what is blocking them. | Whole team. The PO is invited (Lecture 15). |
| Review | Sat 29 Nov | Demo to the PO, or at the next class |
| Retrospective | Sat 29 Nov, after the review | Whole team. Joseph writes it up in `sprint-2-retro.md`. |

## Burndown

Each evening, fill in the points still remaining. Committed points are 41, and the ideal line drops about 6.8 points a day.

| Day | Date | Ideal | Actual |
|---|---|---|---|
| 0 | Mon 23 Nov | 41 | 41 |
| 1 | Tue 24 Nov | 34 | |
| 2 | Wed 25 Nov | 27 | |
| 3 | Thu 26 Nov | 21 | |
| 4 | Fri 27 Nov | 14 | |
| 5 | Sat 28 Nov | 7 | |
| 6 | Sun 29 Nov | 0 | |

An item counts as burned only when its PR is merged.
