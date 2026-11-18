---
title: "Product: Twɛn, the clinic queue system"
date: 2026-11-15
status: accepted
deciders: Nyansapo Systems (team vote)
issue: "#1"
ai_used: yes
---

# Product: Twɛn, the clinic queue system

## Context

Issue #1 needed one product. We compared five concepts, each with a full proposal draft, in [docs/proposal/drafts/](../docs/proposal/drafts/README.md). We then voted in the team WhatsApp group. Each person could select every concept they were willing to work on.

## Decision

We will build **Twɛn**. Outpatients join a clinic queue by USSD, SMS or the web. A wait-time model, compared against an M/M/c baseline, tells them when to come in. Staff use a board that keeps working offline. The draft is [twen-clinic-queue.md](../docs/proposal/drafts/twen-clinic-queue.md).

| Concept | Votes (multi-select, 6 members) |
|---|---|
| **1. Twɛn (clinic queue)** | **5** |
| 3. Cassava Check | 3 |
| 2. Kanea (Dumsor Radar) | 2 |
| 4. Trotro Voice | 2 |
| 5. MoMo Shield | 2 |

The vote agrees with the drafting pass's brief-weighted score (Twɛn 90, Cassava Check 80, Kanea 76).

## Options we rejected

- **Cassava Check (3 votes).** PlantVillage Nuru already diagnoses cassava disease on phones, which leaves little for the paper.
- **Kanea (2 votes).** It has the strongest paper angle, but it depends on an nLine API key we don't have, and on data that ends in 2023/24.
- **Trotro Voice and MoMo Shield (2 votes each).** Trotro Voice's data is old and lacks fares. MoMo Shield has no labelled Ghana scam data.

## Consequences

- #2 turns the Twɛn draft into the proposal, with one file per section under `docs/proposal/`.
- Our data is synthetic, fitted to published Ghanaian outpatient studies. The paper must say so, and must report how the model compares with the M/M/c baseline.
- The draft's citations were found by AI and still need a person to check them. A Twi speaker should also confirm the name *Twɛn*.
- If the instructor rejects the concept note, Cassava Check is the fallback.
