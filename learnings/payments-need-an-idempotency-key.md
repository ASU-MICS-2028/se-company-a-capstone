---
title: Payments need an idempotency key
date: 2026-09-30
owner: Group A
tags: [prior-work, architecture, payments, reliability]
issue: ""
---

# Payments need an idempotency key

## What happened

Kofi pays with his meal plan. On campus Wi-Fi at peak, a payment can succeed while the confirmation is lost. If the app retries, he could be charged twice, and he cannot easily check a balance or a slip to notice.

## What we learned

Make the charge **idempotent**: doing it twice has the same effect as once. In SD1, `placeOrder(cart, Collect, MealPlan, idempotencyKey)` and `charge(total, MealPlan, idempotencyKey)` both carry a unique key, so the Campus Account System ignores a repeat (NFR03). We also:
- kept the kitchen ticket and ready alert inside the `[charge succeeds]` branch, so the kitchen never cooks an unpaid order;
- on failure, said what failed, why, what next, and "You have not been charged" (ACC06);
- put all four payment methods in one Payment Subsystem so this is built once.

## Do this next time

Give every money-moving or order-creating call a client-generated idempotency key, and always tell the user whether money moved.

## Related

- [Akornor modelling package: three scenarios, three views](../knowledge/akornor-modelling-package-three-scenarios-three-views.md)
- [Order notifications must be async (transactional outbox)](order-notifications-must-be-async-transactional-outbox.md)
