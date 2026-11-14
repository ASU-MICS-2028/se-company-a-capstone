---
title: Monitors
tags: [architecture, concurrency]
source: "Concurrency-teaching-tool MSc dissertation (citing Magee and Kramer 2006)"
---

# Monitors

A **monitor** is a language-level construct for safe concurrency. It bundles shared data with the only procedures allowed to touch it, and guarantees that **only one procedure runs at a time**.

A monitor provides three things:
1. **Data encapsulation:** shared data is reachable only through monitor procedures.
2. **Mutual exclusion:** a lock lets one thread in at a time.
3. **Condition synchronisation:** condition variables let a thread `wait` (block and release the monitor) until another `signal`s that the condition may now hold.

A signalled thread doesn't take over immediately. It must wait until the signalling thread leaves the monitor, which is why conditions are rechecked in a loop.

In Java, every object with `synchronized` methods plus `wait()` and `notifyAll()` is a monitor. The dissertation builds its [bounded buffer](producer-consumer-bounded-buffer.md) as a monitor.

## Use it in the capstone

The idea of *one guarded owner of shared state* scales up. Give each piece of shared data a single owning service or table and route all changes through it. Say so in the architecture rationale.

## Related

- [Java synchronized keyword and locks](java-synchronized-and-locks.md)
- [wait and notify (guarded blocks)](wait-notify-guarded-blocks.md)
- [Critical section ground rules](critical-section-ground-rules.md)
