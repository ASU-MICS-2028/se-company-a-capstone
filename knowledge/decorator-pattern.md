---
title: Decorator pattern
tags: [patterns, structural, decorator]
source: "Lecture 11; Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck (named only); summary from Gamma et al. 1994"
---

# Decorator pattern

**Decorator** is a structural Gang of Four pattern. It **adds features by wrapping** an object in layers, without changing the original object. Use it when you want optional features in any combination.

**Parts:**

- **Component:** the shared interface.
- **Concrete component:** the base object.
- **Decorator:** wraps a component and has the same interface.
- **Concrete decorators:** the added feature layers.

**Example: a live tennis broadcast.** The concrete component is the raw camera feed. Decorators stack overlays on it: the scoreboard, the set score, the replay graphic. When a player challenges a call, the feed switches to replay. When the challenge ends, it returns to normal. The underlying camera feed never changes.

**Why not subclasses?** One subclass per combination of overlays (feed + scoreboard, feed + scoreboard + replay, and so on) makes the class count explode as features grow, and becomes hard to debug.

**Drawback:** too many layers are hard to debug too.

**Neighbours:** Decorator *adds behaviour*. Adapter *changes the interface*. Proxy *guards access*.

## Use it in the capstone

Use it to add cross-cutting extras (logging, caching, retry, accessibility enhancements) around a core service or component without editing it.

## Related

- [Proxy pattern](proxy-pattern.md)
- [Adapter pattern](adapter-pattern.md)
- [Observer pattern](observer-pattern.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

The deck lists Decorator among the structural patterns but does not describe it.

**African example:** wrap an `SmsSender` in a retry decorator and then a delivery-logging decorator, to cope with flaky rural networks. Python's `@retry` or `@cache` decorators are the everyday form.
