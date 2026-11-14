---
title: Builder pattern
tags: [prior-work, patterns, gof, creational]
source: "ICS530 Builder and Memento deck, Joseph Etse (5 Nov 2026); Gamma et al., Design Patterns (1994); Lecture 11; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Builder pattern

A **creational** Gang of Four (GoF) pattern: build a complex object one step at a time, separating *how* it is built from the finished object.

**Problem it fixes.** Constructors with many parts, e.g. `new Email(to, null, null, subject, body, attachments, null, null, "high")`. Positional `null`s hide meaning, swapped arguments still compile, half-built objects (no recipient) slip through, and every new field breaks every call.

**Four roles.**
- **Builder** (interface): declares each step.
- **ConcreteBuilder:** does the steps, holds the half-built object, hands it over only through `getResult()` / `build()`.
- **Product:** the finished object.
- **Director** (optional): runs the steps in a set order. In fluent builders the client code plays this part.

**Example.**
```ts
const email = new EmailBuilder()
  .to("kojo@example.com")
  .subject("Q3 invoice")
  .attach(invoicePdf)   // optional
  .build();             // checks, then returns a read-only Email
```

**Trade-off.** Worth it when there are many optional parts and checks before use. With only a few fields, named or default parameters are enough.

## Use it in the capstone

Candidate: building an order (items, options, fulfilment, payment) and validating it before `placeOrder`, so an order with no meal or no payment method cannot exist.

## Related

- [Memento pattern](memento-pattern.md)

## Also in Lecture 11

- In the class presentation, Builder was paired with the Adinkra symbol *Ananse Ntontan* (spider's web): building one piece at a time.
- The lecturer's framing: Builder is creational. Its trade-off is that it is over-engineering when you already know every parameter and its type. See also [Gang of Four pattern catalogue](gang-of-four-catalogue.md).

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck example: a complex student profile with optional academic records, courses and payment history. The deck's rule: use Builder when you vary the *assembly steps* of one complex object.

**Campus example:** an Akornor order built step by step (meal, sides, spice level, allergy note, pickup time, then `build()`).
