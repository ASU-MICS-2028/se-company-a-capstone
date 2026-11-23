# Risk register (#11)

**Owner:** Joseph Etse. Reviewed at every sprint planning and retro: update the status, add new risks, and close the ones that are gone.
**Scale:** likelihood (L) and impact (I) are each rated 1–3. Score = L × I. Anything scoring 6 or more gets an owner and a trigger date.
**Last review:** 23 Nov 2026 (v1)

| # | Risk | L | I | Score | Owner | Mitigation | Trigger: act when… | Status |
|---|---|---|---|---|---|---|---|---|
| R1 | **No working demo on 10 Dec.** Sprint 1 produced no code, and integration can only start once the pieces exist. | 2 | 3 | **6** | Joseph | Scope cut ([PR #40](../../decisions/2026-11-23-cut-scope-to-fit-milestone-2.md)). Integrate a thin slice end to end in Sprint 3, before adding features. Burn down daily. | The Sprint 3 slice (USSD ticket → board → SMS) isn't working by 3 Dec | Open |
| R2 | **The API contract is late**, which blocks the backend, frontend and model interface | 2 | 3 | **6** | Eric | A contract draft exists (#7). Frontend and backend build against a mock of it. Contract changes after the freeze go through a PR that all three owners approve. | The contract isn't merged by 26 Nov | Open |
| R3 | **Work flows through one person.** In Sprint 1, all 12 PRs came from one member. | 3 | 2 | **6** | Joseph | Everyone opens at least one PR by 25 Nov. Pair on Git where needed. Owners merge their own workstream's PRs. | Any member has no merged PR by the 29 Nov review | Open |
| R4 | **The offline board slips**, so the availability claim drops from the parallel figure (about 0.9989) to cloud-only (about 0.964) | 2 | 2 | 4 | Eric / Kobina | Offline is a Should. The paper reports whichever figure we measure. The local-first design is written up even if it isn't built. | Offline isn't started by 11 Dec | Open |
| R5 | **The learned model doesn't beat M/M/c** | 2 | 1 | 2 | Henry | A negative result still answers the research question. Report it honestly, with the baselines. | Evaluation results are in (Sprint 3) | Accepted |
| R6 | **The synthetic data is unrealistic**, so the model results don't transfer | 2 | 2 | 4 | Henry | Validate against published figures (Korle-Bu, Obuasi) and the staff survey (B1, B2). State the limitation in the paper. | Survey B gets no answers by 26 Nov | Open |
| R7 | **Africa's Talking sandbox problems** (sign-up, USSD simulator, rate limits) | 2 | 2 | 4 | Eric | Open the sandbox account this sprint. The SMS and USSD gateway sit behind one interface (port), with a fake version for tests and the demo. | The sandbox isn't working by 30 Nov | Open |
| R8 | **The survey gets too few responses** (target: 20 patients, at least 5 read aloud) | 2 | 2 | 4 | Liza | Each member collects 3–4. Read-aloud with family. Post a reminder on 25 Nov. Report the actual number as a threat to validity. | Fewer than 10 responses by the evening of 25 Nov | Open |
| R9 | **Personal data leaks into the public repo** (names, phone numbers, photos, raw survey answers) | 2 | 3 | **6** | Joseph | Only anonymised notes and aggregate results are committed. Raw data stays in private Drive. Reviewers check PRs for this. Already applied to the interview notes and photos. | Any PR that adds raw research data | Open |
| R10 | **Act 843 compliance is unclear** (whether a queue ticket counts as special personal data, and registration) | 2 | 2 | 4 | Kobina | Answer the DPC question sheet from the Act. Store only the minimum data (phone, ticket, timestamps). Purge after 30 days. | DPC sheet not done by 4 Dec | Open |
| R11 | **The ACM paper is left to the last week** | 2 | 3 | **6** | Micheal | Outline and related work in Sprint 2. Each workstream writes its own section when it delivers. The lecturer warned about this. | No outline merged by 29 Nov | Open |
| R12 | **The demo fails live** at Milestone 2 or ASERC (network, sandbox, laptop) | 2 | 3 | **6** | Micheal | A recorded backup video. The demo runs on localhost with the fake SMS adapter. A rehearsal on 17 Dec. | Rehearsal date | Open |
| R13 | **A team member is unavailable** (illness, other courses, exams) | 2 | 2 | 4 | Joseph | Every workstream has a named backup. The plans and the repo hold enough context for a handover. | Anyone misses two stand-ups in a row | Open |

## Closed

*None yet.*

## Change log

- 2026-11-23: v1. 13 risks from the Sprint 1 retro, the proposal grade, the scope cut and the research visit.
