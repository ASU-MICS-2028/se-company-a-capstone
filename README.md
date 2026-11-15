<p><img src="docs/brand/logo.svg" alt="Nyansapo Systems" width="360"></p>

# Nyansapo Systems

**ICS 530 Software Engineering Essentials capstone · Ashesi University · 09 Nov – 18 Dec 2026**

Nyansapo, the Adinkra "wisdom knot", stands for wisdom, ingenuity, intelligence and patience. We are building an intelligent software system for a real African problem, and presenting it at the Ashesi Software Engineering Research Conference (ASERC) on 18 Dec 2026.

> **Product:** not chosen yet, see [#1](../../issues/1). This section will describe what we are building once it is decided.

## Team

Eric Sunu · Henry Kofi Brandoh · Joseph Etse · Kobina Opei Jr. · Liza Aikins · Micheal Boadi

Roles (Product Owner, Scrum Master, Developers) are decided in [#3](../../issues/3).

## Milestones

| Milestone | Due | What |
|---|---|---|
| [M1 Proposal](../../milestone/1) | 14 Nov | Concept note, then the full proposal (needs approval before we build) |
| [M2 Core demo](../../milestone/2) | 10 Dec | Architecture, UX and a core system demo |
| [M3 Final and ASERC](../../milestone/3) | 18 Dec | Repo, documentation package, ACM paper, slides; 15-min talk, 5-min demo, 10-min Q&A |

## How we work

1. **Every task is a [GitHub issue](../../issues)** with a plan in [`plans/`](plans/index.md).
2. **Every change** gets a file in [`changes/`](changes/index.md): what changed, who was in charge, and how AI was used.
3. **Every decision** gets a file in [`decisions/`](decisions/index.md).
4. **What the course taught us** lives in [`knowledge/`](knowledge/index.md), and **what we learn by doing** in [`learnings/`](learnings/index.md). One idea per file, linked to each other.
5. **Workstreams don't wait on each other.** They meet at written contracts and use mocks until the real thing exists ([why](decisions/2026-11-14-independent-workstreams.md)).

The full flow is in [CONTRIBUTING.md](CONTRIBUTING.md). Coding assistants follow [AGENTS.md](AGENTS.md).

## Workstreams

| Workstream | Issues | Can start now? |
|---|---|---|
| Product and proposal | [#1](../../issues/1), [#2](../../issues/2) | Yes (#2 after #1) |
| Scrum | [#3](../../issues/3), [#15](../../issues/15) | Yes |
| Brand | [#4](../../issues/4) | Yes |
| Requirements and UX | [#5](../../issues/5), [#6](../../issues/6) | After #1 |
| Architecture and contracts | [#7](../../issues/7) | After #1. Unblocks #8, #9, #10 |
| Backend | [#8](../../issues/8) | After the #7 contract |
| Intelligent component | [#9](../../issues/9) | After #1 |
| Frontend | [#10](../../issues/10) | After #6 and #7, using a mock API |
| Quality | [#11](../../issues/11), [#12](../../issues/12) | #11 yes; #12 after #7 |
| ACM paper and ethics | [#13](../../issues/13), [#14](../../issues/14) | #13 yes; #14 after #1 |
| Integration | [#18](../../issues/18) | After #8, #9, #10 |
| Presentation | [#16](../../issues/16) | Final week |
| Knowledge base | [#17](../../issues/17) | Review now |

## Repository map

| Path | What |
|---|---|
| [`plans/`](plans/index.md) | One plan per issue |
| [`changes/`](changes/index.md) | Change log, one file per change, with owner and AI use |
| [`decisions/`](decisions/index.md) | Decisions (ADRs) |
| [`knowledge/`](knowledge/index.md) | Course knowledge, one idea per file |
| [`learnings/`](learnings/index.md) | Lessons from doing, one per file |
| [`docs/`](docs/README.md) | Deliverables: proposal, requirements, UX, architecture, quality, Scrum records, brand |
| `scripts/index.py` | Rebuilds every `index.md`. A bot runs it on `main` after each merge, so never commit an index |

Code folders (`backend/`, `frontend/`, `intelligence/`) arrive with [#7](../../issues/7).
