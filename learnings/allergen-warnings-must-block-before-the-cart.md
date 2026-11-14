---
title: Allergen warnings must block before the cart
date: 2026-09-15
owner: Group A
tags: [prior-work, ux, accessibility, safety]
issue: ""
---

# Allergen warnings must block before the cart

## What happened

A sighted student glances at an allergen icon. Kofi has a peanut allergy and cannot see icons, so an icon or an "on request" allergen list leaves him one tap from harm.

## What we learned

We treated allergens as a safety requirement, not a convenience:
- Meal Details reads allergens **before** ingredients, in plain words: "Contains soy. Does not contain peanuts, your allergen." (FR04)
- If a meal matches his saved profile, Add to cart opens a **modal** warning that holds focus, names the conflict and puts **Go back** first; Add anyway is an explicit choice (UST01).
- Staff cannot publish a meal without name, price, ingredients and allergens (NFR07), because the check is useless if the data is missing.

## Do this next time

For any safety risk, stop the flow before the harmful action with focus on the safe choice, and require the data the check depends on at the source.

## Related

- [Accessibility Layer as its own sequence lifeline](../knowledge/accessibility-layer-as-its-own-sequence-lifeline.md)
- [Visual Access accessibility requirements](../knowledge/visual-access-accessibility-requirements.md)
