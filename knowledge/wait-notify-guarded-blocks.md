---
title: wait and notify (guarded blocks)
tags: [architecture, concurrency, java]
source: "Threads deck (Kirsh, Drop example); Multithreading deck (CS 313)"
---

# wait and notify (guarded blocks)

`wait()`, `notify()` and `notifyAll()` let a thread **wait for a condition** without busy-looping or sleeping in a loop.

- `wait()` releases the object's lock and suspends the thread until notified.
- `notify()` wakes **one arbitrary** waiting thread on that lock. `notifyAll()` wakes **all** of them, and they compete for the lock.
- All three must be called **inside a `synchronized`** block on the same object.

The **guarded block** idiom (from the deck's `Drop` producer-consumer example):

```java
public synchronized String take() {
    while (empty) { try { wait(); } catch (InterruptedException e) {} }
    empty = true; notifyAll(); return message;
}
```

Rules the deck stresses:
- Use a **flag** (condition variable) such as `empty`. Never rely on the notify alone.
- Check it in a **`while` loop, not an `if`**, because a thread can wake up when the condition is still false (spurious wakeups, or another thread got there first).

## Use it in the capstone

Modern code uses higher-level tools: `BlockingQueue`, `asyncio.Queue`, or message queues. Cite this as the underlying mechanism when explaining our queue-based design.

## Related

- [Producer-consumer and the bounded buffer](producer-consumer-bounded-buffer.md)
- [Monitors](monitors.md)
- [Java synchronized keyword and locks](java-synchronized-and-locks.md)
