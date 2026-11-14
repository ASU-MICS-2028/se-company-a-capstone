---
title: Visitor pattern
tags: [patterns, behavioral, visitor]
source: "Lecture 11; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Visitor pattern

**Visitor** is a behavioural Gang of Four pattern. It separates an algorithm from the objects it works on. You add a new operation by writing a new *visitor*, not by editing every class.

**Analogy: building inspections.** A shop, a factory and a restaurant are different building types. You could add a `fireInspection()` method to each one, but that is inefficient and spreads the logic around. Instead, a *fire inspector visitor* knows how to inspect each type, and a *tax inspector visitor* checks each one's tax. Each building only needs an `accept(visitor)` method, which calls back the right `visit…()` method.

**Structure:** elements (for example Circle, Square) implement `accept(visitor)`. The visitor has `visitCircle()` and `visitSquare()`.

**Real uses:**

- **Compilers:** one syntax tree is visited by a type checker, then an optimiser, then a code generator.
- **E-commerce checkout:** a fixed list of cart items is visited by a tax calculator, a shipping calculator and a discount calculator. You don't put tax, shipping and discount logic on every item.

**When it fits:** the set of object types is stable, but you keep adding new operations over them.

## Use it in the capstone

Useful if we run several analyses over the same stable data model, such as computing risk score, cost and report output over the same records.

## Related

- [Command pattern](command-pattern.md)
- [Composite pattern](composite-pattern.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck example: generating PDF, CSV and JSON exports from the same data model.

**African example:** one district health data model visited by a malaria-cases summariser, a DHIS2 exporter and a data-quality validator.
