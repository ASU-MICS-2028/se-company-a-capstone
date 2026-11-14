---
title: Akornor requirements matrix in six classes
tags: [prior-work, ux, requirements]
source: "Group A Prosit 1 deliverables, section 4; Final Group Presentation (Sept 2026)"
---

# Akornor requirements matrix in six classes

For Prosit 1 we wrote **48 requirements and 8 constraints**, judged against WCAG 2.2 AA (the web accessibility standard, level AA).

| Class | Count | Example | Priority |
|---|---|---|---|
| Functional (FR) | 14 | Each meal is read as name, price, allergens and position ("3 of 12") | Must |
| Non-functional (NFR) | 8 | Spoken or vibration feedback within 1 second of any action | Must |
| Accessibility (ACC) | 10 | Every state change confirmed on two channels | Must |
| Usability (USE) | 3+ | Choices from lists; saved details reused | Should |
| Security and privacy (SEC) | 6 | Student ID, PIN and balance never spoken through a speaker | Must |
| User-specific (UST) | 7 | Allergen warning before the meal enters the cart | Must |

**How each row is written.** ID, the *user need* in Kofi's words ("Be charged once"), the requirement as "The system shall...", a MoSCoW priority (Must, Should, Could), and the screen or WCAG criterion it belongs to. A `#` marks requirements shown in the prototype screens.

**Constraints (CON01 to CON08)** are limits, not features: one app on tablet, web and phone; four payment methods; network needed to order; staff screens out of scope; no testing with a blind participant in the one-week cycle.

Putting the user need beside each requirement made it easy to defend a requirement and to spot ones with no real need behind them.

## Use it in the capstone

Reuse this format and the ID scheme for the capstone requirements; every later model cites these IDs.

## Related

- [Labelling requirements with IDs](labelling-requirements-with-ids.md)
- [MoSCoW prioritisation](moscow-prioritisation.md)
- [Visual Access accessibility requirements](visual-access-accessibility-requirements.md)
- [Akornor stakeholders in three tiers](akornor-stakeholders-in-three-tiers.md)
