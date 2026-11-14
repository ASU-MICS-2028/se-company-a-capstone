---
title: Check the riskiest assumption first
date: 2026-09-15
owner: Group A
tags: [prior-work, requirements, research, process]
issue: ""
---

# Check the riskiest assumption first

## What happened

Our Prosit 1 design rests on assumptions we could not test in a one-week cycle, and no blind participant has tested it yet (CON08). We listed them ordered by what breaks if each is wrong.

## What we learned

Ranking assumptions by damage tells you what to check first:
1. **Visually impaired students hold a meal plan.** Highest risk: otherwise Kofi must use Mobile Money or card, whose PIN and OTP steps we cannot control.
2. Provider payment flows work with a screen reader.
3. Akornor holds structured allergen data per dish (else FR04 and UST01 fail).
4. Item codes distinguish variants (fried rice vs plain rice).
5. Akornor can deliver across campus at peak.
6. Students own a smartphone with a screen reader.
7. Blind students would prefer an app to asking at the counter. Weakest: we presumed a preference without asking.

We also wrote open questions about users, the environment and current operations, and planned to validate with DASS (student support services).

## Do this next time

Keep a ranked assumptions list beside the requirements. Check the top one before building on it, and never assume a user preference you can ask about.

## Related

- [Kofi Mensah, our primary persona](../knowledge/kofi-mensah-primary-persona.md)
- [Akornor requirements matrix in six classes](../knowledge/akornor-requirements-matrix-in-six-classes.md)
