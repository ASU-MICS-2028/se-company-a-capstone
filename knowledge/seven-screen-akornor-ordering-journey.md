---
title: The seven-screen Akornor ordering journey
tags: [prior-work, ux, user-journey]
source: "Group A Prosit 1 deliverables, sections 6 and 7; kept unchanged in Prosit 2"
---

# The seven-screen Akornor ordering journey

Our scope is one main path of seven screens, identical on the cafeteria tablet, the web and Kofi's phone:

**Home → Menu → Meal Details → Cart → Checkout → Confirmation → Order Status**

The Figma prototype has eight screens because the **Allergen warning** is a separate modal over Meal Details.

Rules every screen follows:
- Announces its name and state on entry ("Cart, 2 items").
- Has a Repeat action and a Call the counter action.
- Keeps the main button in the same bottom position.

Key moments on the path:
- **Menu:** one row per meal, read as "Jollof rice with chicken, 25 cedis, contains none of your allergens, available, 3 of 12".
- **Meal Details:** allergens first; a profile match opens a warning with focus on Go back.
- **Checkout:** Collect or Deliver; Meal plan (default, no PIN), Mobile Money, Card or Cash.
- **Confirmation:** "Order placed and paid. Order number 42. Ready in about 12 minutes. Collect at Counter 2", then the full order read back.
- **Order Status:** Preparing → Ready for Collection → Collected (or Out for Delivery → Delivered), with a distinct ready alert.

Error paths (sold out, failed payment, lost network) say what went wrong, never charge twice, and rejoin the main path. The user journey table maps each stage to the problem today, the design response and the requirement IDs.

## Use it in the capstone

Treat this path as the fixed spine: new features hang off it rather than redesigning it, as we did in Prosit 2.

## Related

- [Kofi Mensah, our primary persona](kofi-mensah-primary-persona.md)
- [Akornor modelling package: three scenarios, three views](akornor-modelling-package-three-scenarios-three-views.md)
- [Read-back confirmation catches wrong orders](../learnings/read-back-confirmation-catches-wrong-orders.md)
