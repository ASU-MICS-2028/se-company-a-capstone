---
title: Prototype pattern
tags: [patterns, creational, prototype]
source: "Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Prototype pattern

**Prototype** is a creational Gang of Four pattern. You make new objects by **cloning an existing, configured object**, instead of building each one from scratch. Analogy: photocopy a filled-in form section instead of rewriting it by hand.

**When it helps:**

- Creating the object is slow or costly (for example, loading it from disk).
- Which exact variant you need is only known at runtime.

**Example: game enemies.** Spawning 50 enemies should not mean 50 lines of construction code. Keep a prototype enemy with a `clone()` method, clone it at runtime, then set the kind (say, goblin) and its features. Another example: an admin clones an existing course as a template for a new one.

**Shallow versus deep copy:**

- **Shallow copy:** copies primitive fields, but *shares* referenced objects (lists, sub-objects). Add an assessment to a shallow-cloned exam and it also shows up in the original course.
- **Deep copy:** also copies everything referenced, so each clone has its own identity.

The lecturer's angle: the *level of abstraction* you copy at matters. Copying a vague, high-level object is of little use. You usually clone something already concrete and specialised. Java's `Object.clone()` is a built-in example.

**Trade-off:** you must decide, field by field, what is shared and what is copied.

**Prototype versus Flyweight:** Prototype copies a *whole* object. Flyweight *shares* the common parts.

## Use it in the capstone

Use it for template records (form templates, default configurations, course or case templates). Test that deep copies don't leak edits back into the template.

## Related

- [Flyweight pattern](flyweight-pattern.md)
- [Abstract Factory pattern](abstract-factory-pattern.md)
- [Factory Method pattern](factory-method-pattern.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

The deck adds a caution flag: Prototype needs careful deep-copy logic to avoid shared mutable state bugs. It is ideal when creation is expensive.

**African example:** a clinic scheduling app clones a "standard antenatal visit" template, then sets date and patient.
