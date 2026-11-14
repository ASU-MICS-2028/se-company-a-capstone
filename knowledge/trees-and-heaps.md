---
title: Trees and heaps
tags: [data, algorithms]
source: "Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Trees and heaps

- **Binary search tree (BST):** every left child is smaller and every right child larger. Search, insert and delete are O(log n) *if balanced*, but degrade to O(n) when the tree becomes a chain. It is the basis of ordered maps, sets and range queries.
- **Balanced trees (AVL, red-black):** rebalance themselves to keep the height at O(log n). AVL is strictly balanced (faster lookups). Red-black allows looser balance (faster inserts). Used in databases, file systems and language libraries (Java's `TreeMap`).
- **Heap:** a complete binary tree with the *heap property*. A max-heap keeps the largest at the root, a min-heap the smallest. Peek is O(1). Insert and extract are O(log n). It powers **priority queues** and heap sort.

Scheduling uses: task schedulers, hospital triage, Dijkstra's algorithm, and in capstone terms shuttle booking queues, grade-processing pipelines and event notifications.

Tries (prefix trees) support autocomplete in O(key length).

## Use it in the capstone

Use the language's built-ins (Python `heapq`, Java `PriorityQueue`, `TreeMap`) rather than writing trees. In the docs, cite the complexity that justifies the choice.

## Related

- [Data structure decision tree](data-structure-decision-tree.md)
- [Stacks and queues](stacks-and-queues.md)
- [Composite pattern](composite-pattern.md)
