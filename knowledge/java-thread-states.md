---
title: Java thread states
tags: [architecture, concurrency, java]
source: "Multithreading deck (CS 313)"
---

# Java thread states

A Java thread moves through these states:

| State | Meaning |
|---|---|
| **New** | Object created, `start()` not yet called |
| **Runnable** | Ready to run, waiting for the scheduler |
| **Running** | Currently executing |
| **Blocked** | Waiting for an event (I/O, a lock, `sleep`, `wait`) |
| **Dead** | `run()` has returned |

Transitions are caused by thread methods (`start()`, `yield()`, `sleep()`, `wait()`, `notify()`) and by outside events (the scheduler, I/O completing, returning from `run()`).

(The official `Thread.State` enum names are NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING and TERMINATED. The deck's model is the textbook simplification.)

## Use it in the capstone

The same lifecycle-as-states idea applies to our domain objects. See the [State pattern](state-pattern.md). Draw a state diagram for the main entity.

## Related

- [Java thread creation](java-thread-creation.md)
- [wait and notify (guarded blocks)](wait-notify-guarded-blocks.md)
- [State pattern](state-pattern.md)
