---
title: Speak private details only through earphones
date: 2026-09-15
owner: Group A
tags: [prior-work, security, privacy, accessibility]
issue: ""
---

# Speak private details only through earphones

## What happened

A screen reader speaks everything on screen. In a crowded public hall, on a shared cafeteria tablet, that would broadcast Kofi's student ID, meal-plan balance and allergy to everyone nearby. Calling his name at the counter would single him out too.

## What we learned

Accessibility and privacy pull against each other here, and we resolved it with rules:
- Student ID, password, PIN, balance and allergen profile are shown as text and spoken only when earphones are connected (SEC01).
- The tablet keeps its screen reader on and routes speech only to headphones (ACC10).
- The tablet session ends after each order or after inactivity, with a spoken warning first (SEC02); the ready alert goes to his own phone (UST06).
- Handover uses the order number, never the name (SEC03).

## Do this next time

For every spoken string, ask "is this safe to say out loud in the hall?" Default sensitive data to text plus earphones, and clear shared-device sessions.

## Related

- [Visual Access accessibility requirements](../knowledge/visual-access-accessibility-requirements.md)
- [Privacy vs security](../knowledge/privacy-vs-security.md)
