---
title: Big O rules of thumb
tags: [data, algorithms, complexity]
source: "Lecture 10; Ashesi CSIS Capstone Design Patterns & DS&A deck (Big-O visual race)"
---

# Big O rules of thumb

**Big O notation** describes how an algorithm's cost grows as the input size *n* grows. You can analyse **time complexity** (steps) and **space complexity** (memory).

Quick rules used in class:

- No loop over the input, just a fixed number of steps (an if-statement, an enqueue, a dequeue): **O(1)**, constant.
- One loop over *n* items: **O(n)**. Five items means five passes, seven means seven.
- A loop inside a loop: **O(n × n) = O(n²)**.
- Hash table lookup by key: **O(1)** on average, because the key is turned into an index.
- Inserting into a priority queue (heap): **O(log n)**.

**Best case and worst case.** Searching a list for a value is O(1) if it is first, but O(k) in the worst case, when it is last. Quote the worst case.

**Space matters too.** The lecturer noted that an enum takes less memory than a list or dynamic array of options, because an array reserves extra room to grow.

Worked example (notification system): enqueue and dequeue O(1); processing a batch of *n* orders O(n); updating a restaurant's pending count O(1).

## Use it in the capstone

State the complexity of our key algorithms in the design docs and the paper. Use it to argue that the system scales to peak load.

## Related

- [Hash map collisions](hash-map-collisions.md)
- [State pattern](state-pattern.md)
- [Patterns, algorithms and data structures work at different levels](patterns-algorithms-data-structures-levels.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck (Big-O visual race)

The deck's race from flat to catastrophic: O(1), then O(log n) (binary search), O(n), O(n log n) (merge and quick sort's sweet spot), O(n²) (nested loops), O(2ⁿ) (avoid in production). Quick test: **if n doubles and runtime quadruples, it is O(n²).** The capstone advice is to *measure* the time and space of core structures, not only state their Big-O. A sorted list of 1,000,000 items needs at most 20 binary-search comparisons. See [Linear vs binary search](linear-vs-binary-search.md).
