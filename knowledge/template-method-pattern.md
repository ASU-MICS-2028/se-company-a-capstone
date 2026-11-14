---
title: Template Method pattern
tags: [patterns, behavioural]
source: "Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Template Method pattern

**Intent.** Define the **skeleton of an algorithm** in a base class and let subclasses override specific steps without changing the overall order.

**When to use.** Several classes share the same outline but differ in some steps. Example from the deck: a report generator with fixed sections and variable content.

**Difference from Strategy.** Template Method varies *steps* through inheritance. Strategy swaps the *whole algorithm* through composition.

**African / campus example.** The deck pairs it with Factory for e-learning portals: every course module runs intro, then content, then quiz, then feedback, and each module type fills in its own content and quiz.

## Use it in the capstone

Use it for data pipeline stages: a base `Pipeline.run()` of extract, then clean, then transform, then load, with per-source overrides.

## Related

- [Strategy pattern](strategy-pattern.md)
- [Factory Method pattern](factory-method-pattern.md)
