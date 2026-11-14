---
title: Linear vs binary search
tags: [data, algorithms]
source: "Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Linear vs binary search

- **Linear search:** check each element in turn. Works on **unsorted** data. O(n).
- **Binary search:** compare with the middle and discard half each step. Requires **sorted** data. O(log n).

Scale from the deck: a sorted list of 1,000,000 items needs at most **20** binary-search comparisons (2^20 ≈ 1 million) against up to 1,000,000 for linear.

When to use which: linear for small or unsorted data, or a one-off search. Binary for large sorted data searched repeatedly. Sorting first costs O(n log n), so it only pays off with repeated searches. For lookup by exact key, a hash table (O(1) average) is usually better still.

Binary search fails silently on unsorted data, so always check the sort order first.

## Use it in the capstone

Most searches in our system will be database queries. The same idea is an **index**: add indexes on columns we filter by, and mention it in the performance evaluation.

## Related

- [Sorting algorithms and stability](sorting-algorithms-and-stability.md)
- [Data structure decision tree](data-structure-decision-tree.md)
- [Big-O rules of thumb](big-o-rules-of-thumb.md)
