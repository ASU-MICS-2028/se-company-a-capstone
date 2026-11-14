---
title: Concurrency and multithreading
tags: [architecture, performance, concurrency]
source: "Lecture 12"
---

# Concurrency and multithreading

**The lecturer's claim:** most code students write is **sequential**. It runs as one main thread (`public static void main(String[] args)` in Java) fed to a single processor core. A laptop has 4 to 8 or more cores, so most of them sit idle while your program runs. The operating system and runtime split work up a little and **simulate** parallelism, but they have to stitch the pieces back together, which is not efficient.

**Analogy:** one long queue at one bank counter. Opening three counters only helps if you actually split the queue across them.

**Real concurrency** means you deliberately break your code into **threads** and coordinate them with **synchronisation**, like a traffic light at a junction deciding who goes first and who goes together. Key terms:

- **Mutex** (mutual exclusion): only one thread may use a shared resource at a time.
- **Race condition:** two threads use shared data at once, and the result depends on timing.
- **Deadlock:** threads wait on each other forever. They have given up.
- **Livelock:** threads keep actively trying, but none makes progress.
- **notify / notifyAll:** a thread releasing a mutex wakes one or all waiting threads, which then compete for it.

Why it matters now: **Moore's law** (transistor counts doubling about every two years) hit a ceiling roughly a decade ago, so speed gains must come from using more cores well. This can be done in high-level languages like Java. He teaches it there.

## Use it in the capstone

For CPU-heavy work (model inference, batch analytics), use worker threads or processes, or async jobs, and protect shared state. List the concurrency risks in the test plan.

## Related

- [Observer pattern](observer-pattern.md)
- [Singleton pattern](singleton-pattern.md)
- [Queue-based load leveling with a priority queue](queue-based-load-leveling.md)
- [Threads deck summary (Java threads)](threads-deck-summary.md)
- [Multithreading deck summary (CS 313)](multithreading-deck-summary.md)
