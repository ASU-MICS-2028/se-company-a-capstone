---
title: Iterator pattern
tags: [patterns, behavioural]
source: "Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Iterator pattern

**Intent.** Provide a uniform way to **walk through a collection** without exposing how it is stored (list, tree, paged API).

**When to use.** Looping over lists, trees or custom data sets, or streaming large results page by page. Common in data dashboards. The deck pairs it with Adapter for agriculture and public services (Esoko, GhanaPostGPS).

**Trade-off.** Little cost. Most languages build it in (Python generators, Java `Iterator`, JS `for…of`).

**African / campus example.** Iterate over farmer price records from an SMS market-price service page by page, without loading everything into a low-memory phone.

## Use it in the capstone

Use generators or streaming for data pipeline steps (applied data programming). Mention it when we explain how the pipeline handles large inputs.

## Related

- [Composite pattern](composite-pattern.md)
- [Adapter pattern](adapter-pattern.md)
