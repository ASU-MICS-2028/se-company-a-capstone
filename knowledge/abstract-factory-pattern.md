---
title: Abstract Factory pattern
tags: [patterns, creational, abstract-factory]
source: "Lecture 11; Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Abstract Factory pattern

**Abstract Factory** is a creational Gang of Four pattern. It creates a whole **family of related objects that must match**, without the caller naming the concrete classes.

**Example: a visa service.** For each destination, an applicant needs a matching *form*, *requirements checklist* and *fee*. A developer copies the Schengen code to make the UK version and forgets to change one line. It compiles fine, so the bug is silent until accounts ask why UK applicants paid the Schengen fee.

**The fix:** don't rely on people remembering. Give the caller one `VisaKitFactory` per destination. Its job is to produce the form, the requirements and the fee *as a set*. A `UKKitFactory` can only return UK parts. The design makes mixing families impossible, so the human error is contained.

**Parts:** an abstract factory, concrete factories (one per family), abstract products, and concrete products.

**Lecturer's note (Lecture 12):** factories suit **specialised objects**. In a university model, students are fairly general, but faculty are specialised, so a factory "production line" that knows how to make each kind is worth it. Prototype, by contrast, can copy anything.

## Use it in the capstone

Use it when our system serves several regions, languages or client types that each need a consistent set of components (for example, a locale kit of language strings, currency and regulations).

## Related

- [Factory Method pattern](factory-method-pattern.md)
- [Prototype pattern](prototype-pattern.md)
- [Bridge pattern](bridge-pattern.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck example: a UI toolkit that works across web and mobile in a campus app, where each platform factory yields matching widgets.

**African example:** a health app with a Twi factory and an English factory, each producing matching labels, voice prompts and SMS templates.
