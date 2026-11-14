---
title: Accessibility Layer as its own sequence lifeline
tags: [prior-work, architecture, uml, sequence-diagram, accessibility]
source: "PROSIT 2 Group A System Modelling Package, SD2 and section 9 (30 Sept 2026)"
---

# Accessibility Layer as its own sequence lifeline

A **lifeline** is one participant (a person or component) in a sequence diagram, drawn as a box with a dashed line down the page. In SD2 (allergen warning by screen reader) we split accessibility into two lifelines instead of hiding it inside "App UI":

- **TalkBack (screen reader):** the operating system's assistive technology. It asks the app for the focused element's accessible name and speaks it.
- **Accessibility Layer:** our own component. It orders announcements (allergens before ingredients), moves focus (to the heading, or to Go back on the warning), and triggers vibration.

SD2 in short: Kofi swipes → TalkBack reads "Groundnut soup, 30 cedis, contains your allergen, 4 of 12" → double-tap → Ordering Subsystem returns details with `allergenMatch = peanuts` → Accessibility Layer builds the text, allergens first → Add to cart opens a warning with focus on Go back → an `alt` frame models both Go back (focus returns to "Menu, 4 of 12") and Add anyway (added with an acknowledgement, "Added. Cart, 2 items").

Why it matters: the layer becomes a testable component with a clear job, reusable for other personas (low vision, ADHD). Solid open arrows mark asynchronous signals such as announcements and pushes; numbered messages let the traceability matrix cite exact steps.

## Use it in the capstone

Give accessibility its own component in the capstone architecture and its own unit tests, rather than spreading it through screens.

## Related

- [Akornor modelling package: three scenarios, three views](akornor-modelling-package-three-scenarios-three-views.md)
- [Allergen warnings must block before the cart](../learnings/allergen-warnings-must-block-before-the-cart.md)
