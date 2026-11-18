---
issue: 12
title: Availability and reliability calculations
workstream: quality
owner: Joseph Etse
status: todo
milestone: M3 Final and ASERC
depends_on: #7
---

# Availability and reliability calculations

Issue: [#12](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/12)

## Goal

Dependability computations for the components. The instructor's research area, so expect Q&A on this.

## Done when

- [ ] Availability per component from MTBF and MTTR, and for the system (series and parallel)
- [ ] Reliability over a stated period
- [ ] Assumptions sourced; at least one figure measured from our own tests or a load test
- [ ] Results feed the paper's evaluation

## Inputs and outputs

- **Uses:** #7 component diagram; knowledge notes on availability
- **Produces:** `docs/quality/availability-reliability.md`

## Steps

1. List the components and how they are arranged (series or parallel)
2. Gather MTBF and MTTR figures or estimates
3. Compute and show the working
4. Measure what we can

## Out of scope

- Full chaos testing

## Log

- 2026-11-14: Plan created with the repository setup.
- 2026-11-14: Gap: knowledge/ has no notes on availability, MTBF/MTTR or reliability yet. The lectures so far have not covered the maths (see knowledge/course-remaining-topics.md). Add notes when it is taught, or from Sommerville ch. 10-11.
