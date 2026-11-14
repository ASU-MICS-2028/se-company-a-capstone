---
title: Gang of Four pattern catalogue
tags: [patterns, catalogue]
source: "Lecture 10; Lecture 11; Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Gang of Four pattern catalogue

The "Gang of Four" (GoF) are the four authors of *Design Patterns* (1994): Erich **Gamma**, Richard **Helm**, Ralph **Johnson** and John **Vlissides**. The lecturer asked the class to know their surnames. There are four authors but **three families**, totalling 23 patterns. Each family answers a different question:

| Family | Question | Patterns |
|---|---|---|
| **Creational** | How are objects created? | [Factory Method](factory-method-pattern.md), [Abstract Factory](abstract-factory-pattern.md), [Builder](builder-pattern.md), [Prototype](prototype-pattern.md), [Singleton](singleton-pattern.md) |
| **Structural** | How are classes and objects composed? | [Adapter](adapter-pattern.md), [Bridge](bridge-pattern.md), [Composite](composite-pattern.md), [Decorator](decorator-pattern.md), [Facade](facade-pattern.md), [Flyweight](flyweight-pattern.md), [Proxy](proxy-pattern.md) |
| **Behavioural** | How do objects communicate and share responsibility (often decided at runtime)? | [Chain of Responsibility](chain-of-responsibility-pattern.md), [Command](command-pattern.md), [Iterator](iterator-pattern.md), [Mediator](mediator-pattern.md), [Memento](memento-pattern.md), [Observer](observer-pattern.md), [State](state-pattern.md), [Strategy](strategy-pattern.md), [Template Method](template-method-pattern.md), [Visitor](visitor-pattern.md), [Interpreter](interpreter-pattern.md) |

The lecturer stressed **knowing why each pattern is in its family**, not only the list. For example, Strategy is behavioural because behaviour is chosen at runtime. Proxy is structural because it puts a layer in the path to the real object.

Quick creational chooser from the deck: are you varying the **type** (Factory Method), the **family** (Abstract Factory), or the **assembly steps** (Builder)?

Singleton is flagged as **the most abused pattern**. A typical system draws on all three families, for example one pattern from each.

## Use it in the capstone

In the architecture docs, group the patterns we use by family and give the reason for each: it shows the reviewer we know what kind of problem each solves. Expect quiz questions on all 23.

## Related

- [What is a design pattern](what-is-a-design-pattern.md)
- [Design patterns quiz](design-patterns-quiz.md)
- [Pattern decision guide](pattern-decision-guide.md)
- [Capstone design patterns and DS&A deck summary](capstone-design-patterns-dsa-deck.md)
