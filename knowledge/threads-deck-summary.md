---
title: Threads deck summary (Java threads)
tags: [architecture, reading, concurrency]
source: "04-Threads deck (Amir Kirsh)"
---

# Threads deck summary (Java threads)

**Aim.** Learn Java's thread syntax and API and build multithreaded applications.

**Content:**
1. **Overview:** threads run tasks in parallel; they often need synchronisation (not handling the same data at once) and sometimes must wait for each other. Never use thread-per-session; use [thread pools](thread-pools.md).
2. **Creating threads:** extend `Thread`, implement `Runnable`, or an anonymous `Runnable`. Always `start()`, never `run()`. See [Java thread creation](java-thread-creation.md).
3. **Synchronisation:** synchronized methods, blocks, separate locks, static methods, and the thread-safe [Singleton](singleton-pattern.md) (prefer eager initialisation). See [Java synchronized and locks](java-synchronized-and-locks.md).
4. **wait/notify:** the `Drop` producer-consumer example with a flag and a `while` loop. See [wait and notify](wait-notify-guarded-blocks.md).
5. **Thread pools:** `ThreadPoolExecutor`, with an exercise running X tasks on Y threads.

## Use it in the capstone

Background for the programming-model justification and for interview questions on concurrency. The key transferable lessons are pools, not raw threads, and guarding all shared state.

## Related

- [Multithreading deck summary](multithreading-deck-summary.md)
- [Concurrency teaching tool dissertation](concurrency-teaching-tool-dissertation.md)
- [Concurrency and multithreading](concurrency-and-multithreading.md)
