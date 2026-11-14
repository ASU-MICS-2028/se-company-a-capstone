---
title: Hash map collisions
tags: [data, data-structures, hashing]
source: "Lecture 10"
---

# Hash map collisions

A **hash map** stores key-value pairs. A **hash function** takes the key (say a student ID) and computes the location where the value is stored. That is why lookup is O(1) on average.

A **collision** happens when the hash function maps two different keys to the same location. If it is not resolved, the new value would land where a value already sits.

Points from class:

- Good hash functions often use prime numbers to spread keys out and make results varied.
- A more advanced hash formula reduces collisions, but no hash function is perfect. Collisions will happen, so the map must handle them. (Common methods, beyond what class covered: chaining, where each slot holds a small list, and open addressing, where you probe for the next free slot.)
- Hashing also matters in security and cryptocurrency. Bitcoin mining is solving a hashing puzzle, which needs a lot of GPU power.

## Use it in the capstone

If we use hash maps for lookups (for example user ID to profile, or menu ID to item), say so in the design docs and note that average O(1) assumes few collisions.

## Related

- [Big O rules of thumb](big-o-rules-of-thumb.md)
- [State pattern](state-pattern.md)
