---
title: Singleton pattern
tags: [patterns, creational, singleton]
source: "Lecture 10; Lecture 11; Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck; Threads deck (Kirsh)"
---

# Singleton pattern

**Singleton** is a creational Gang of Four pattern. A class allows **exactly one instance**, and gives everyone the same one.

**How it is built (three steps):**

1. Make the constructor **private**, so nobody can call `new` to make copies.
2. Keep one private **static** copy of the instance inside the class. The `static` keyword is what guarantees one shared copy.
3. Hand out that same copy through a public method.

**Typical uses:** configuration, logging, database setup, serial hardware (an Arduino's serial port cannot be opened by two monitors at once), and a shared ticket or order-number counter, so two counters never issue the same number. The lecturer's alarm-clock example: one static seconds counter that every minute, hour and day calculation depends on. It must never be duplicated.

**The lecturer's warning: Singleton is the most abused pattern.** It looks simple, so people use it for everything, and that degrades the design:

- It is effectively a **global variable**. Any class can reach it, so you cannot tell which classes touch it or change it.
- That hidden coupling makes testing and change hard.
- In a **stateless, auto-scaled system** it breaks. Each new worker instance has its own "single" copy, so the state does not carry across instances (Lecture 10).

Quiz prompt to prepare: *why is Singleton overused, and why does overuse harm system design?*

**Singleton or Facade?** Use Singleton when you need exactly one shared object. Use Facade when you need one entry point to several complex subsystems.

## Use it in the capstone

Use Singleton only for true one-per-process resources (config, logger, database client). Shared state across servers belongs in the database or a cache, not a Singleton.

## Related

- [Facade pattern](facade-pattern.md)
- [Queue-based load leveling with a priority queue](queue-based-load-leveling.md)
- [Gang of Four pattern catalogue](gang-of-four-catalogue.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck; Threads deck (Kirsh)

The deck calls Singleton a **last resort**: ask whether dependency injection would serve better.

**Thread safety (Threads deck).** A lazy `if (instance == null) instance = new …` can create two instances when two threads race. A `static synchronized getInstance()` fixes it but locks the whole class on every call. The deck's better version is **eager initialisation** (`private static Screen theScreen = new Screen();`), which is safe with no locking. See [Race condition](race-condition.md).

**African example:** one shared `MoMoApiClient` holding the API key and connection pool.
