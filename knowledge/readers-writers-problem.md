---
title: Readers-writers problem
tags: [architecture, concurrency, data]
source: "Concurrency-teaching-tool MSc dissertation"
---

# Readers-writers problem

**Problem.** Many threads share data (a "database"). **Readers** only look. **Writers** change it.

- Any number of readers may read **at the same time** (reading doesn't conflict).
- A writer needs **exclusive** access: no other writer and no reader.

Without synchronisation, a reader may see a half-written record, or two writers may overwrite each other. The dissertation's tool showed this by running unsynchronised versions.

**Fairness trade-off.** If new readers keep arriving, a waiting writer can **starve**. Variants either prefer readers, prefer writers, or queue fairly.

Java offers `ReentrantReadWriteLock` for this pattern.

## Use it in the capstone

Most of our traffic will likely be reads (dashboards) with occasional writes (new data). This justifies caching reads and using database isolation for writes. Mention it when explaining performance and consistency choices.

## Related

- [Producer-consumer and the bounded buffer](producer-consumer-bounded-buffer.md)
- [Critical section ground rules](critical-section-ground-rules.md)
- [Caching strategies and eviction](caching-strategies-and-eviction.md)
