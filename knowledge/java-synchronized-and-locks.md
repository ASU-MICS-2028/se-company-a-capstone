---
title: Java synchronized keyword and locks
tags: [architecture, concurrency, java]
source: "Threads deck (Kirsh); Multithreading deck (CS 313)"
---

# Java synchronized keyword and locks

Every Java object has a **lock** (monitor). `synchronized` makes a thread acquire it first, so only one thread at a time runs code guarded by that lock.

- **Synchronized instance methods** lock `this`. All synchronized methods of that object share one lock. Non-synchronized methods stay open.
- **Synchronized blocks** (`synchronized(lockObj) { … }`) lock only the critical lines, which is more efficient than locking a whole method.
- **Separate lock objects** (`lock1`, `lock2`) let independent fields be updated in parallel, but only if the fields are truly unrelated.
- **Static synchronized methods** lock the **class object** (`Counter.class`), not an instance.
- **Common mistake:** mixing a static synchronized getter with an instance synchronized setter. They use *different* locks, so both can run at once and the data is unprotected.
- Java locks are **reentrant**: a thread holding a lock can re-enter other code guarded by the same lock.
- For more control (try-lock, timeouts, read/write locks), use `java.util.concurrent.locks`.

Performance: locking a static method blocks all threads on that class, which can be costly.

## Use it in the capstone

In Python or JS stacks, the equivalent is database transactions or `asyncio.Lock`. Whatever the stack, document in the design doc which shared resources need protection and how.

## Related

- [Race condition](race-condition.md)
- [Monitors](monitors.md)
- [Singleton pattern](singleton-pattern.md)
