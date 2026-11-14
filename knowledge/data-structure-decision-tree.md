---
title: Data structure decision tree
tags: [data, algorithms]
source: "Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Data structure decision tree

Four families: **sequential** (arrays, linked lists, stacks, queues), **associative** (hash tables, maps), **hierarchical** (trees, heaps, tries) and **graph-based**.

Pick by need:

| Need | Choose | Typical cost |
|---|---|---|
| Fast lookup by key | Hash table | O(1) average |
| Ordered data, range queries | BST or sorted array + binary search | O(log n) |
| Shortest path between nodes | Graph + BFS (unweighted) or Dijkstra (weighted) | O((V+E) log V) for Dijkstra |
| Undo, backtracking | Stack (+ recursion or DFS) | O(1) push/pop |
| FIFO scheduling, BFS | Queue | O(1) |
| Top-k or priority order | Heap / priority queue | O(log n) insert/extract |
| Prefix or autocomplete search | Trie | O(length of key) |
| Frequent insert/delete *and* order | Balanced BST (AVL, red-black) | O(log n) |

**Arrays vs linked lists.** Arrays are contiguous memory with O(1) index access, but inserting in the middle is O(n). They suit read-heavy, index-driven data such as leaderboards. Linked lists give O(1) insert or delete at the ends and O(n) access by position. They suit dynamic, write-heavy data such as task queues and undo history.

Always check: access pattern, size, mutability, memory budget. Rule from the deck: match the Big-O cost to your **bottleneck** (access, insert, search or traversal).

## Use it in the capstone

For each core entity in our data model, write one line: structure, why, Big-O of the hot operation. A database index is a B-tree, so the same reasoning applies to the schema.

## Related

- [Stacks and queues](stacks-and-queues.md)
- [Trees and heaps](trees-and-heaps.md)
- [Graphs: BFS, DFS and Dijkstra](graphs-bfs-dfs-dijkstra.md)
- [Hash map collisions](hash-map-collisions.md)
- [Big-O rules of thumb](big-o-rules-of-thumb.md)
