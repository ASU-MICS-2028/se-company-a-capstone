---
title: Comparing with Team 2 shows what is persona-specific
date: 2026-09-30
owner: Group A
tags: [prior-work, process, modelling, ux]
issue: ""
---

# Comparing with Team 2 shows what is persona-specific

## What happened

In the Prosit 2 presentation we put our models beside Team 2's, who modelled the same Akornor system for a different user.

## What we learned

The comparison sorted our work into clear piles:
- **Shared by both teams (3):** browse, cart and checkout on one journey; payment with failure handling; order status and a ready notification. This is the core system.
- **Specific to Kofi (3):** spoken names and allergens first; an allergen warning that takes focus; read-back and verification by number.
- **Where the models differ (2):** we drew the screen reader and Accessibility Layer as participants; our exception was the handover, Team 2's was interruption and save-and-resume.
- **Universal design (1):** read-back plus number-only handover protects every student from wrong orders and public name call-outs.

Seeing another team's exception scenario also showed us a risk we had only covered as a requirement (resume after interruption, NFR02) and not modelled.

## Do this next time

Before finalising a design, compare with a team that has a different user. Build the shared core once, add persona-specific features as separate parts, and borrow their exception scenarios as test cases.

## Related

- [Akornor modelling package: three scenarios, three views](../knowledge/akornor-modelling-package-three-scenarios-three-views.md)
- [Memento pattern](../knowledge/memento-pattern.md)
