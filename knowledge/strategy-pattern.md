---
title: Strategy pattern
tags: [patterns, behavioral, strategy]
source: "Lecture 11; Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Strategy pattern

**Strategy** is a behavioural Gang of Four pattern. It defines a family of interchangeable algorithms behind one interface, so the one in use can be **swapped at runtime**.

**Example 1: chatbot app with several AI models (Lecture 11).**

- *Messy way:* one giant if-else picks the model *and* holds the code for how each model answers. Adding a model means growing the block, and reaching the last branch takes longer.
- *Strategy way:* each model is its own class that implements a `Model` interface with an `answer()` method. The `ChatAssistant` context holds the current strategy, set by the user's pick or by an "auto" router. The context just calls `answer()`.

**Example 2: payment (Lecture 12).** Card, mobile money, cash, crypto. Adding Bitcoin means adding one strategy class and connecting it, with no restructuring.

**Why better than if-else or switch?** The lecturer named two things:

1. It gives a **standardised structure**.
2. It does so through **modularity**. Each option is a separate box, so new options plug in without touching the rest. Nested curly brackets are where errors creep in.

This is the **open-closed principle** at work.

**Strategy versus State.** State switches behaviour *internally* as its state changes. Strategy is switched *from outside* (the user or a router picks).

**Why behavioural?** Behaviour is decided at runtime, as with polymorphism, where a variable typed `Animal` runs as a `Goat`.

## Use it in the capstone

Use Strategy wherever our intelligent component has swappable options: different ML models, ranking methods, payment or messaging channels. It also makes A/B comparison for the research paper easy.

## Related

- [Open-closed principle](open-closed-principle.md)
- [State pattern](state-pattern.md)
- [Polymorphism and runtime binding](polymorphism-and-runtime-binding.md)
- [Proxy pattern](proxy-pattern.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck uses: swappable payment methods, sorting preferences, authentication strategies, routing logic. The deck pairs Strategy with Observer for mobile money.

**Campus example (deck's Akornor exercise):** swap the pricing or meal-of-the-day algorithm at runtime without changing order logic. **African example:** fee calculation per mobile network (MTN, Telecel, AirtelTigo).
