---
title: Caching strategies and eviction
tags: [architecture, quality, performance]
source: "System Design Blueprint (ByteByteGo infographic)"
---

# Caching strategies and eviction

A **cache** keeps copies of frequently used data in fast memory (Redis, in-process) to cut response time and database load.

**Write policies:**
- **Write-through:** write to the cache and the database together. Consistent, slower writes.
- **Write-around:** write to the database only. The cache fills on read.
- **Write-back:** write to the cache and flush to the database later. Fast, but data can be lost on a crash.
- **Read-through:** the cache itself loads missing data from the database.

**Eviction (what to drop when full):** LRU (least recently used), LFU (least frequently used), FIFO, MRU, random, on-demand expiry (TTL).

**Metrics:** number of items, hit and miss rate, disk and memory usage.

Hard part: **invalidation**. Stale data shows when the source changes and the cache doesn't.

## Use it in the capstone

Cache ML predictions or slow external API results with a TTL (Python `functools.lru_cache` or Redis). Report the hit rate and latency with and without the cache in Evaluation.

## Related

- [Proxy pattern](proxy-pattern.md)
- [System design blueprint](system-design-blueprint.md)
- [Performance versus reliability](performance-versus-reliability.md)
- [Cache-aside pattern](cache-aside-pattern.md)
- [Caching and PWAs for poor connectivity](caching-and-pwa-for-poor-connectivity.md)
