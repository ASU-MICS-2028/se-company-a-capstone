---
title: Deadlock
tags: [architecture, quality, concurrency]
source: "Concurrency-teaching-tool MSc dissertation"
---

# Deadlock

**Deadlock:** two or more threads each wait for a resource another holds, so none can ever proceed. Thread A holds lock 1 and wants lock 2, while thread B holds lock 2 and wants lock 1.

Deadlocks come from **cyclic dependencies** in who waits for whom.

- **Prevention:** impose a **global lock order**. Everyone acquires lock 1 before lock 2, so no cycle can form. Other options: take all locks at once, or use timeouts with try-lock.
- **Recovery:** terminate one of the threads involved. Kernels rarely do this, since they don't know what the threads are doing. In most applications, a deadlock signals a **design flaw** to fix, not something to recover from at runtime.

Related failures: **livelock** (busy but no progress) and **starvation** (one thread never gets its turn).

## Use it in the capstone

Databases can deadlock too, when two transactions update the same rows in opposite orders. Update rows in a consistent order, keep transactions short, and retry on deadlock errors. Name this in the risk register.

## Related

- [Critical section ground rules](critical-section-ground-rules.md)
- [Race condition](race-condition.md)
- [Java synchronized keyword and locks](java-synchronized-and-locks.md)
