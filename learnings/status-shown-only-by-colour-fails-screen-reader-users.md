---
title: Status shown only by colour fails screen-reader users
date: 2026-09-15
owner: Group A
tags: [prior-work, ux, accessibility]
issue: ""
---

# Status shown only by colour fails screen-reader users

## What happened

At Akornor, order status is shown on a board by colour. Designing for Kofi (blind, TalkBack) we found he gets nothing from it: a coloured dot has no text for the screen reader, and he cannot tell when it is his turn. Ama (low vision) cannot rely on colour either.

## What we learned

Colour, position and pictures carry no information to a screen reader. Status needs words, and a change of status needs a signal on a second channel. Our fix:
- Status written as text: Preparing → Ready for Collection → Collected.
- Each progress step reads its name and state ("Preparing, done").
- Ready alert with its own vibration pattern and chime, and focus on "Ready for Collection. Go to Counter 2 and give your order number, 42."
- Warnings use words and a strong border, never colour alone (ACC03, WCAG 1.4.1).

## Do this next time

For every status, badge or warning, ask "what does TalkBack say here?" If the answer is nothing, add text. Confirm every state change on two channels (speech plus vibration or notification).

## Related

- [Visual Access accessibility requirements](../knowledge/visual-access-accessibility-requirements.md)
- [Kofi Mensah, our primary persona](../knowledge/kofi-mensah-primary-persona.md)
