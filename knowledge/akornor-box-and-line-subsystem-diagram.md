---
title: Akornor box-and-line subsystem diagram
tags: [prior-work, architecture, subsystems]
source: "Whiteboard photo 'old system diagram box and line'; SWEE UML.svg (Prosit 1, Sept 2026)"
---

# Akornor box-and-line subsystem diagram

A **box-and-line diagram** is an informal high-level sketch: boxes are subsystems, lines are "talks to". Before the formal UML, the team drew the whole Akornor operation on a whiteboard, then redrew it as a cleaner diagram.

The numbered subsystems:
1. **Menu** (catalogue, publish items, real-time availability)
2. **Ordering**, with a queue from Menu and ports for Meal Plan (default), Regular (Cash / MoMo) and Special orders
3. **Payment** (Cash and MoMo channels)
4. **Kitchen** (cooks and replenishes), feeding 5' **Food Packaging** and 5'' **Drink Dispensing**
6. **Delivery** (counter handover or rider aggregation; a priority queue)
7. **Inventory Reporting** (live ingredient and portion stock)
8. **Auditing** (financials and reconciliation)
9. **Admin**, flagged as a **single point of failure** (one component whose failure stops everything)
10. **HR** (duty rosters, payroll)
11. **Hakuna Shop** (the hostel tuck shop)

A **Notification** box sat across the top, linked by publish/subscribe. Two front ends: a mobile app (screen reader / TalkBack) and a web app (accessible, ADHD-friendly).

Prosit 1 and 2 later scoped us to the student-facing part (Menu, Ordering, Payment, Notification) and put kitchen and staff systems out of scope (CON04). The notification box became the AOS notification design.

## Use it in the capstone

Start capstone architecture from this map; mark which boxes we own and flag single points of failure early.

## Related

- [AOS notifications: publish-subscribe with a queue](aos-notifications-publish-subscribe-with-a-queue.md)
- [Akornor modelling package: three scenarios, three views](akornor-modelling-package-three-scenarios-three-views.md)
