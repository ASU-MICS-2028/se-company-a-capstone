---
title: Java thread creation
tags: [architecture, concurrency, java]
source: "Threads deck (Kirsh); Multithreading deck (CS 313); ICP Lab 4"
---

# Java thread creation

Three ways to give a thread its code (`run()` method):

1. **Extend `Thread`** and override `run()`. Simple, but it uses up Java's single inheritance.
2. **Implement `Runnable`** and pass it to `new Thread(r)`. **Preferred**, because the class can still extend something else. Lab 4 required this.
3. **Anonymous `Runnable`** (or a lambda in modern Java): `new Thread(() -> work()).start();`

Two traps both decks stress:
- **Call `start()`, not `run()`.** `start()` creates a new thread that then calls `run()`. Calling `run()` directly is an ordinary method call on the current thread.
- **Creating a `Thread` object does not create a thread.** Only `start()` does.

To make main wait for a worker, use `t.join()`. `sleep()` and `isAlive()` also appear in Lab 4's hints, but `join` is the correct tool. Without it, "goodbye" from main may print before the thread's "hello" lines.

Thread output interleaves unpredictably from run to run, because the scheduler decides.

## Use it in the capstone

Rarely write raw threads in app code. Use an executor or the framework's worker model. Knowing `start` vs `run` and `join` is fair game in the individual interview.

## Related

- [Threads vs processes](threads-vs-processes.md)
- [Thread pools](thread-pools.md)
- [Java thread states](java-thread-states.md)
- [ICP Lab 4: threads and MVC](icp-lab-4-threads-and-mvc.md)
