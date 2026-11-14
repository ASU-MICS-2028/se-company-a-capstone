---
title: Read-back confirmation catches wrong orders
date: 2026-09-15
owner: Group A
tags: [prior-work, ux, accessibility, verification]
issue: ""
---

# Read-back confirmation catches wrong orders

## What happened

In September 2026 a team member saw an order for fried rice recorded as plain rice at Akornor. It was caught only by looking at the plate at the counter, and fixing it took a trip back and a top-up payment. Kofi would have found out by eating it, possibly a dish with his allergen.

## What we learned

A wrong order can enter at three points: recording, payment and handover. We added a check at each:
- **Explicit Add to cart** with a spoken confirmation of item, options, quantity and price (FR06).
- **Full read-back after payment**: order number, time, counter, every item and the total, repeatable on demand (UST02).
- **Handover check**: Kofi gives his number (never his name); the server matches it to the ticket; Read my order replays the contents; a mismatched dish is replaced and logged (UST05, SEC03).

This is universal design: verification protects every customer, not only blind ones. We also noted the kitchen's item codes must name variants the way customers do, or the error recurs however good the app is.

## Do this next time

Read back the whole order after any commit, and verify again at handover by number. Treat one real observed incident as strong evidence and trace it to requirements.

## Related

- [The seven-screen Akornor ordering journey](../knowledge/seven-screen-akornor-ordering-journey.md)
- [Akornor modelling package: three scenarios, three views](../knowledge/akornor-modelling-package-three-scenarios-three-views.md)
