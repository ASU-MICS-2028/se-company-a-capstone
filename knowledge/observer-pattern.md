---
title: Observer pattern
tags: [patterns, behavioral, observer, events]
source: "Lecture 10; Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Observer pattern

**Observer** is a behavioural Gang of Four pattern. A **subject** keeps a list of **observers** and notifies them all when it changes. Use it when several parts of an app must react to one change at once. It is common in event-driven and logistics systems.

**Parts:** the subject (what is watched; it has `attach`, `detach` and `notify`), the observer interface (`update`), and concrete observers (the ones reacting).

**Examples:**

- A YouTube channel (subject) and its subscribers (observers).
- A live tennis score: the TV scoreboard, the match statistics, the betting screens and the commentator's tablet all update when a point is scored.
- TV or radio broadcasting: tune in and you receive.
- UI frameworks: Flutter redraws screens on model changes; JavaScript event listeners react to clicks; a realtime database notifies the app on updates.
- Threads: `notify()` and `notifyAll()` tell waiting threads that a shared resource (mutex) is free, so they can compete for it.

**Pitfalls:**

- **Forgetting to unsubscribe** leaves dead observers in the list, which causes memory leaks (like still getting emails from an app you deleted).
- In the classic form, `notify` runs **inside the same request**. A slow observer then blocks the caller. At scale, use publish-subscribe with a queue instead (Lecture 10).

Data structure link from Lecture 10: an Observer often keeps subscribers in a **linked list** and notifies them by **iteration**.

## Use it in the capstone

Fine for in-app UI updates. For anything that crosses services or calls slow providers, go through a queue.

## Related

- [Publish-subscribe with queued workers](publish-subscribe-with-queued-workers.md)
- [Mediator pattern](mediator-pattern.md)
- [Concurrency and multithreading](concurrency-and-multithreading.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

The deck pairs Observer with Strategy for fintech and mobile money (MTN MoMo, Zeepay).

**African example:** a successful MoMo payment notifies the SMS receipt, the ledger and the fraud monitor. **Campus example (deck's Akornor exercise):** kitchen, cashier and pickup display all subscribe to order-status events.
