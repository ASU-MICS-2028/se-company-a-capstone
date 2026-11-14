---
title: Facade pattern
tags: [patterns, structural, facade]
source: "Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Facade pattern

**Facade** is a structural Gang of Four pattern. It gives **one simple entry point** to several complex subsystems. The client talks to the facade, and the facade talks to the subsystems.

**Example: starting a semester.** Without a facade, a student would have to visit registration, finance, housing, the library and so on, one by one. With a facade, one "start semester" action calls each departmental system behind the scenes.

**Strengths:**

- Simpler client code: the client depends on one class.
- Subsystems can change without breaking clients, because a change stays inside the facade.

**Weakness to watch:** the facade can become a dumping ground that knows too much.

**Facade versus Singleton:** Singleton is about having only *one* of something. Facade is about making *many* things look like one. Use Singleton for exactly one shared object (an order-number counter). Use Facade for wrapping several complex subsystems.

## Use it in the capstone

A backend service layer that hides the database, AI model, payment and messaging calls behind a few clean operations is a facade. Show it on the C4 component diagram.

## Related

- [Singleton pattern](singleton-pattern.md)
- [Adapter pattern](adapter-pattern.md)
- [Mediator pattern](mediator-pattern.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

The deck's integrated design stack recommends "Facade to simplify subsystem interfaces", and pairs Facade with Chain of Responsibility for health systems (NHIS, mHealth).

**African example:** `ClinicVisitFacade.checkIn(patient)` hides the NHIS eligibility check, records lookup and queue-ticket creation. The system-level form is an [API gateway](api-gateway.md).
