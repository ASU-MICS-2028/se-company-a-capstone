---
title: "Graphs: BFS, DFS and Dijkstra"
tags: [data, algorithms]
source: "Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Graphs: BFS, DFS and Dijkstra

A **graph** has vertices (nodes) joined by edges, which can be directed or undirected. **Weighted** edges carry a cost, distance or time. Stored as an **adjacency matrix** (V×V, good for dense graphs) or an **adjacency list** (good for sparse ones).

- **BFS (breadth-first search):** explores neighbours level by level using a queue. It finds the **fewest-edges path** in unweighted graphs. Uses: social networks, peer discovery.
- **DFS (depth-first search):** goes deep along each branch and then backtracks, using a stack or recursion. Uses: cycle detection, topological sort, dependency resolution in build systems.
- **Dijkstra:** a greedy algorithm for the shortest path on weighted graphs with **non-negative** weights, using a priority queue. O((V+E) log V). Uses: GPS, shuttle routing, packet forwarding.

**Campus shuttle worked example:**
1. Model stops as nodes and routes as weighted edges.
2. Use an adjacency list (the campus network is sparse).
3. BFS for the fewest-stops path.
4. Dijkstra for the shortest travel time.
5. Assess the O((V+E) log V) cost.
6. Validate against the real shuttle timetable.

## Use it in the capstone

If our problem involves routes, referrals or dependencies (mobility, logistics, health referrals), model it as a graph and use a library (NetworkX, a routing API). Step 6, validating against real data, belongs in the Evaluation section.

## Related

- [Data structure decision tree](data-structure-decision-tree.md)
- [Algorithm paradigms](algorithm-paradigms.md)
- [Stacks and queues](stacks-and-queues.md)
