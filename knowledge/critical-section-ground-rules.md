---
title: Critical section ground rules
tags: [architecture, quality, concurrency]
source: "Concurrency-teaching-tool MSc dissertation"
---

# Critical section ground rules

A **critical section** is code that touches shared data and must not run in two threads at once. A correct solution must satisfy four ground rules:

1. **Mutual exclusion:** at most one thread is in its critical section at a time. (This is a *safety* property: nothing bad happens.)
2. **Absence of deadlock (and livelock):** if several threads compete to enter, at least one succeeds.
3. **Absence of unnecessary delay:** a thread wanting to enter isn't blocked when the others are elsewhere or finished.
4. **Eventual entry:** every thread that tries eventually gets in, so there is no **starvation**. (Rules 2–4 are *liveness* properties: something good eventually happens.)

**Livelock** is when threads keep changing state in response to each other but make no progress, like two people stepping aside in a corridor forever.

## Use it in the capstone

Use safety and liveness as language for reliability NFRs. "Two users can never book the same slot" is safety. "Every submitted request completes or fails with a message within 10 s" is liveness. Both are testable.

## Related

- [Race condition](race-condition.md)
- [Deadlock](deadlock.md)
- [Monitors](monitors.md)
