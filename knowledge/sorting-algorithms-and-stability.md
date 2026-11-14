---
title: Sorting algorithms and stability
tags: [data, algorithms]
source: "Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Sorting algorithms and stability

| Algorithm | Time | Stable? | Notes |
|---|---|---|---|
| Bubble | O(n²) | Yes | Swaps neighbours; fine for nearly sorted data |
| Insertion | O(n²) | Yes | Good for small or nearly sorted lists |
| Selection | O(n²) | No | Fewest swaps, poor cache use |
| Merge | O(n log n) | Yes | O(n) extra space; good for linked lists and external sorts |
| Quick | O(n log n) average, O(n²) worst | No | In place, fastest on average in practice |
| Heap | O(n log n) guaranteed | No | In place |

**Stable** means items with equal keys keep their original order. This matters for multi-key sorts. Example: sort students by name, then stably by grade, and students with the same grade stay in name order. The deck's Akornor example: rank orders by priority with merge sort for stable multi-key ranking.

In practice, use the built-in sort. Python's `sorted` and Java's object sort are both stable (Timsort).

## Use it in the capstone

When results are ranked (recommendations, triage lists), state the sort key, tie-breaker and stability in the design doc. Unstable ties look random to users.

## Related

- [Linear vs binary search](linear-vs-binary-search.md)
- [Algorithm paradigms](algorithm-paradigms.md)
