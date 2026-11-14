---
title: Accessibility toolbars are mostly CSS
tags: [ux, accessibility, implementation]
source: "Lecture 1"
---

# Accessibility toolbars are mostly CSS

The lecturer demonstrated a paid accessibility plugin (UserWay) on a learning-management system his team built. Added with a single code snippet, it lets each user adjust the page:

- several contrast modes for different visual needs
- highlight all links
- bigger text and wider text spacing
- pause all animations (flicker can trigger seizures in some people)
- hide images
- dyslexia-friendly fonts
- a large cursor, a reading mask or focus guide for people with ADHD
- text-to-speech (paid tier)

Features can be combined to suit one person's needs.

His point: almost all of this is simple **CSS** (the styling language of web pages), adding or subtracting values according to **WCAG** (Web Content Accessibility Guidelines, the international accessibility standard). Companies earn a lot from it. If you can, build your own small intervention instead of paying.

## Use it in the capstone

A small accessibility panel (contrast, text size, pause animation) is cheap to add to our web prototype and gives concrete evidence for our accessibility requirements.

## Related

- [Accessibility and inclusive design](accessibility-and-inclusive-design.md)
