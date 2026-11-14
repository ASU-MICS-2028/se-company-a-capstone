---
title: Back-office subsystems matter
tags: [architecture, requirements, stakeholders]
source: "Lecture 3"
---

# Back-office subsystems matter

A customer sees menu, order, pay, collect. But the system diagram the class drew for the cafeteria also needed the management side, which only shows up if you talk to administrative staff:

- **Kitchen** - produces food so the menu is truthful ("if you list fried rice, have fried rice") and tells ordering staff about delays.
- **Inventory reporting** - two kinds of inventory: **ingredients** (rice, oil, vegetables) and **servings** (portions ready to sell). Someone must watch levels and trigger restocking. Orders update it; it feeds the menu. Reports can be financial and more.
- **Auditing** - inventory purchases and payments must both be audited for management.
- **Admin and HR** - owners and managers take event catering orders, plan menus with the kitchen duty roster and inventory, hire staff and run payroll.
- **Related businesses** - the same management runs a campus shop; a single shared inventory for both would be sensible.

These subsystems connect through inventory and auditing rather than directly to the customer flow.

## Use it in the capstone

Our C4 context diagram should show admin and operational users and systems, not only the end user. List their requirements too.

## Related

- [Box-and-line diagrams](box-and-line-diagrams.md)
- [Identify all user classes](identify-all-user-classes.md)
- [Akornor stakeholders in three tiers](akornor-stakeholders-in-three-tiers.md)
