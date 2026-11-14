---
title: Threads vs processes
tags: [architecture, concurrency]
source: "Multithreading deck (CS 313 lectures 10–13)"
---

# Threads vs processes

- A **process** is a program loaded in memory with its **own address space** (its own variables and data). Processes communicate through the operating system, files or the network. One process may contain several threads.
- A **thread** is a sequential stream of instructions *inside* a process, sharing that process's memory. Threads are "lightweight processes": cheap to create and switch between. The JVM starts one, the **main thread**, when a program runs.

**Concurrent programming** splits a program into independent tasks that *may* run in parallel on several cores. **Multithreading** runs one program as several threads.

Why use threads: parallel processing, a responsive UI, using idle CPU time while waiting for I/O, and prioritising work. The deck's example: a single-threaded web server queues every request, so one slow or bad request delays or hangs everyone. A multithreaded server serves many requests at once.

Background: as single-core speed-ups slowed ("Moore's law is dead"), chips went multicore, so performance now depends on concurrency.

The catch: shared memory brings [race conditions](race-condition.md) and [deadlock](deadlock.md).

## Use it in the capstone

The brief asks for a **programming model justification**. State whether our backend is thread-based (Java or Spring, Flask with workers) or event-loop async (Node, FastAPI async), and why it suits I/O-heavy, multi-user load.

## Related

- [Java thread creation](java-thread-creation.md)
- [Race condition](race-condition.md)
- [Thread pools](thread-pools.md)
- [Concurrency and multithreading](concurrency-and-multithreading.md)
