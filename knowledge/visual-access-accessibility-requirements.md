---
title: Visual Access accessibility requirements
tags: [prior-work, ux, accessibility, wcag]
source: "Group A Prosit 1 deliverables, Accessibility table and UX rationale (Sept 2026)"
---

# Visual Access accessibility requirements

Our ten accessibility requirements, each tied to a WCAG 2.2 success criterion where one exists. A **screen reader** speaks what is on screen; **focus** is the element it is currently on.

- **ACC01** Every control has a meaningful name, role and state. No icon-only buttons. (4.1.2)
- **ACC02** Focus follows reading order; on every screen change focus moves to the heading and the screen name is announced. (2.4.3)
- **ACC03** Nothing conveyed by colour, position or image alone; meaningful images have text alternatives. (1.4.1, 1.1.1)
- **ACC04** Text scales to 200%; contrast 4.5:1 for text, 3:1 for controls. (1.4.3, 1.4.4, 1.4.11)
- **ACC05** Every state change (added, paid, ready) confirmed on two channels: speech plus vibration or notification.
- **ACC06** Errors say what failed, why, and what next; focus moves to the message. (3.3.1, 3.3.3, 4.1.3)
- **ACC07** Touch targets at least 48 x 48 dp with 8 dp spacing. (2.5.8)
- **ACC08** "Repeat last announcement" on every screen.
- **ACC09** Navigation and the main button sit in the same place on every screen and device. (3.2.3, 3.2.4)
- **ACC10** The cafeteria tablet keeps its screen reader on and has a headphone socket; speech goes only to headphones.

Design moves that followed: one meal is one focus stop read as one sentence; allergens are read before ingredients; status is written in words with a strong border; an A-/A+ bar serves Ama without a separate mode.

## Use it in the capstone

Use this list as the accessibility checklist for any new screen and cite the IDs in test cases.

## Related

- [Kofi Mensah, our primary persona](kofi-mensah-primary-persona.md)
- [Akornor requirements matrix in six classes](akornor-requirements-matrix-in-six-classes.md)
- [Status shown only by colour fails screen-reader users](../learnings/status-shown-only-by-colour-fails-screen-reader-users.md)
- [Speak private details only through earphones](../learnings/speak-private-details-only-through-earphones.md)
