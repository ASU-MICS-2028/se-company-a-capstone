---
title: Cache-aside pattern
tags: [architecture, patterns, performance, caching]
source: "Lecture 10; Lecture 12"
---

# Cache-aside pattern

**Observation.** At peak time, reads far outnumber writes: perhaps 500 menu views for each order placed. The two failures also cost different amounts. A failed menu read is annoying (the user refreshes), but a failed order write loses money. So protect the writes and take load off the database for the reads.

**Pattern: cache-aside.** The application:

1. Tries to read from the **cache** first.
2. On a **cache miss**, queries the database, returns the result and stores it in the cache.
3. Uses a **cache invalidation** strategy, so stale data is removed or refreshed when the menu changes.

Querying a database costs much more than reading from a cache (which can even be in the browser).

**Technology:** Redis is a well-known caching store. The lecturer asked the class to read about Redis and its competitors before the web app design discussion.

## Use it in the capstone

Cache read-heavy data (reference lists, content, model outputs that repeat). Note the read/write ratio and cache hit rate in the performance part of the quality section.

## Related

- [Caching and PWAs for poor connectivity](caching-and-pwa-for-poor-connectivity.md)
- [Queue-based load leveling with a priority queue](queue-based-load-leveling.md)
- [Proxy pattern](proxy-pattern.md)
