---
title: Factory Method pattern
tags: [patterns, creational, factory-method]
source: "Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Factory Method pattern

**Factory Method** is a creational Gang of Four pattern. Instead of calling `new ConcreteClass()` all over the code, callers ask a single creation method (defined in an interface or base class) for an object. Subclasses decide which concrete class to return.

**Example: a logistics app.** Shipments can travel by truck, ship or other modes. These differ, but the rest of the app just says "create a transport" and gets the right one. Adding a new mode means adding a new creator subclass, with no change to existing code. This is the open-closed principle again.

**Benefit:** creation is separated from use, so the code depends on abstractions, not concrete classes.

**Challenge raised in class:** working out *what* to abstract takes thought up front. Get the abstraction wrong and changes become harder, not easier.

**Factory Method versus Abstract Factory:** Factory Method creates *one* product, through subclassing. Abstract Factory creates a *family* of matching products.

## Use it in the capstone

Use it where our system creates one of several interchangeable kinds of object based on input, such as the right model client, report type or notification channel.

## Related

- [Abstract Factory pattern](abstract-factory-pattern.md)
- [Strategy pattern](strategy-pattern.md)
- [Open-closed principle](open-closed-principle.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck example: a capstone data dashboard that generates PDF or CSV reports through one creation method. The deck's chooser: varying the *type* means Factory Method, the *family* means Abstract Factory, the *assembly steps* means Builder. It pairs Factory with Template Method for e-learning portals.

**African example:** a mobile-money app's `createReceipt()` returns an SMS receipt for feature phones or an in-app receipt for smartphones.
