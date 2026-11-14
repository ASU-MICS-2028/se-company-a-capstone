---
title: "ICP Lab 4: threads and MVC"
tags: [architecture, concurrency, reading]
source: "ICP Lab 4 (CS 313 Intermediate Computer Programming)"
---

# ICP Lab 4: threads and MVC

An undergraduate Java lab (40 points) in two parts.

**Part A: concurrent programming (25 points),** five steps that build on each other, each implementing `Runnable`:
1. One thread prints "hello" in a loop while main prints "goodbye". Make "goodbye" print last (`join`, `sleep` or `isAlive`).
2. Two threads, "hello" and "goodbye". How mixed up is the output?
3. Number each line. How many lines run before a switch? Make them alternate (with `sleep`), then force "hello" to finish first.
4. A shared `Counter`: one thread increments 1000 times and one decrements 1000 times. Is the result always 0? (No. It is a [race condition](race-condition.md).)
5. Track the counter's max and min inside the object, read by both threads. Do they agree across runs?

The lesson: thread scheduling is unpredictable, and shared state needs [synchronisation](java-synchronized-and-locks.md).

**Part B: MVC (15 points).** Refactor a Java GUI login example into Model, View, Controller and "glue" (4/4/4/3), with comments explaining each role. See [Model–View–Controller](model-view-controller.md).

## Use it in the capstone

The "run it repeatedly and see if you get the same result" habit is our concurrency test: hit an endpoint in parallel (for example, with a small load script) and check invariants hold.

## Related

- [Java thread creation](java-thread-creation.md)
- [Model–View–Controller](model-view-controller.md)
- [Multithreading deck summary](multithreading-deck-summary.md)
