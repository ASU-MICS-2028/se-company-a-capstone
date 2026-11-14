---
title: Open-closed principle
tags: [patterns, design, solid]
source: "Lecture 12"
---

# Open-closed principle

The **open-closed principle** says software should be **open for extension, closed for modification**. You should be able to add new behaviour without editing, and so risking, code that already works.

**Analogy from class:** a wall socket. The wiring in the wall is *closed* (you don't rewire the house), but the socket is *open*: plug in a fan, a kettle or a phone charger.

**Why it beats long if-else chains:** adding a new AI model or payment method to an if-else block means editing the block. A new branch in the wrong order, or a misplaced curly bracket, can break the whole program. With Strategy or Factory Method you add one new class and connect it. If-else and switch still appear, but only in a small, contained place.

The lecturer's summary: the benefit comes from a **standardised structure**, achieved through **modularity**.

(The open-closed principle is the "O" in the SOLID design principles.)

## Use it in the capstone

Use it as a design rule we can cite in the architecture docs and the paper: new models, channels or data sources are added as new modules, not by editing the core.

## Related

- [Strategy pattern](strategy-pattern.md)
- [Factory Method pattern](factory-method-pattern.md)
