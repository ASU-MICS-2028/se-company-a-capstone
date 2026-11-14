---
title: Mediator pattern
tags: [patterns, behavioral, mediator]
source: "Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Mediator pattern

**Mediator** is a behavioural Gang of Four pattern. Instead of objects talking to each other directly, they all talk through **one mediator** that coordinates them.

**Example: a course-selection screen.** It has a course picker, a session list, a credits display and a register button. If every control links directly to every other, the number of links grows roughly with the *square* of the number of controls. Adding one control adds many new links, and nobody can tell who updates whom when "Register" is clicked.

With a mediator: the picker tells the mediator "course selected". The mediator then refreshes the session list, updates the credits, and disables the register button once registration is done. Each control knows only the mediator.

The lecturer added that to *mediate* is to arbitrate: make the interface between parties simple.

**Benefit:** fewer dependencies, and the coordination logic lives in one place.

**Trade-off:** the mediator itself can grow too large as controls are added (a "god object").

## Use it in the capstone

Use it for complex screens or dashboards with many interacting widgets, or for coordinating several backend modules. Keep an eye on its size.

## Related

- [Observer pattern](observer-pattern.md)
- [Facade pattern](facade-pattern.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

The deck's analogies: chat rooms, air-traffic control, event buses.

**Campus example (deck's Akornor exercise):** a kitchen coordinator decouples the grill, drinks and packaging stations, so each station talks only to the coordinator.
