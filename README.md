<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/brand/logo-reversed.svg">
    <img src="docs/brand/logo.svg" alt="Nyansapo Systems" width="380">
  </picture>
</p>

<p align="center">
  <b>Wisdom, engineered.</b><br>
  ICS 530 Software Engineering Essentials · Company A · Ashesi University · 9 Nov – 18 Dec 2026
</p>

<p align="center">
  <img alt="Product: Twɛn" src="https://img.shields.io/badge/product-Tw%C9%9Bn-8a1c2b?style=flat-square">
  <img alt="Proposal: awaiting approval" src="https://img.shields.io/badge/proposal-awaiting_approval-e0a21b?style=flat-square">
  <img alt="FastAPI" src="https://img.shields.io/badge/API-FastAPI-22181a?style=flat-square">
  <img alt="React + TypeScript + Vite" src="https://img.shields.io/badge/frontend-React_%2B_TS_%2B_Vite-22181a?style=flat-square">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/db-PostgreSQL-22181a?style=flat-square">
  <img alt="ASERC 18 Dec 2026" src="https://img.shields.io/badge/ASERC-18_Dec_2026-8a1c2b?style=flat-square">
</p>

<p align="center">
  <a href="#team">Team</a> ·
  <a href="#what-were-building">Product</a> ·
  <a href="#milestones">Milestones</a> ·
  <a href="#how-we-work">How we work</a> ·
  <a href="#workstreams">Workstreams</a> ·
  <a href="#repository-map">Repository map</a>
</p>

---

Nyansapo, the Adinkra "wisdom knot", stands for wisdom, ingenuity, intelligence and patience. We build dependable, intelligent software for real African problems, and we present it at the Ashesi Software Engineering Research Conference (ASERC) on 18 Dec 2026.

## Team

<table>
  <tr>
    <td align="center" width="33%">
      <a href="https://github.com/ElikplimSunu"><img src="https://github.com/ElikplimSunu.png?size=160" width="96" alt="Eric Sunu"><br><b>Eric Sunu</b></a><br>
      <sub><code>ElikplimSunu</code></sub>
    </td>
    <td align="center" width="33%">
      <a href="https://github.com/henryhkb"><img src="https://github.com/henryhkb.png?size=160" width="96" alt="Henry Kofi Brandoh"><br><b>Henry Kofi Brandoh</b></a><br>
      <sub><code>henryhkb</code></sub>
    </td>
    <td align="center" width="33%">
      <a href="https://github.com/josetseph"><img src="https://github.com/josetseph.png?size=160" width="96" alt="Joseph Etse"><br><b>Joseph Etse</b></a><br>
      <sub><code>josetseph</code></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <a href="https://github.com/AdzeyenaOpei"><img src="https://github.com/AdzeyenaOpei.png?size=160" width="96" alt="Kobina Opei Jr."><br><b>Kobina Opei Jr.</b></a><br>
      <sub><code>AdzeyenaOpei</code></sub>
    </td>
    <td align="center" width="33%">
      <a href="https://github.com/lnaikins"><img src="https://github.com/lnaikins.png?size=160" width="96" alt="Liza Aikins"><br><b>Liza Aikins</b></a><br>
      <sub><code>lnaikins</code></sub>
    </td>
    <td align="center" width="33%">
      <a href="https://github.com/1realMicheal"><img src="https://github.com/1realMicheal.png?size=160" width="96" alt="Micheal Boadi"><br><b>Micheal Boadi</b></a><br>
      <sub><code>1realMicheal</code></sub>
    </td>
  </tr>
</table>

Photos are each person's GitHub avatar, so change yours on GitHub and it updates here. Roles (Product Owner, Scrum Master, Developers) are decided in [#3](../../issues/3).

## What we're building

**Twɛn** (Twi for "wait") is a virtual queue for outpatient clinics. Patients join from any phone by USSD, SMS, the web or the front desk. They get a ticket and a predicted wait, and one "come now" text when their turn is near. Staff run the queue from a board that keeps working offline. A wait-time model is tested against an M/M/c queueing formula and a simple time-of-day rule, and we keep it only if it beats both.

Why we chose it: [decision](decisions/2026-11-15-product-choice-twen.md) · Proposal draft: [twen-clinic-queue.md](docs/proposal/drafts/twen-clinic-queue.md) · Brand: [docs/brand/](docs/brand/README.md)

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
