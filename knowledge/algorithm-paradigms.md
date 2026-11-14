---
title: Algorithm paradigms
tags: [data, algorithms]
source: "Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Algorithm paradigms

Five ways to attack a problem:

- **Recursion:** a function calls itself on a smaller case. It needs a **base case** (stop) and a **recursive case**.
- **Divide and conquer:** split, solve the parts independently, merge. Examples: merge sort, quick sort, binary search.
- **Greedy:** take the locally best choice each step. Fast, but not always globally optimal. Dijkstra works because its problem has the greedy-choice property.
- **Dynamic programming (DP):** for problems with **overlapping subproblems** and **optimal substructure**. Solve each subproblem once and store the result (memoisation top-down, tabulation bottom-up).
- **Backtracking:** try all options and prune invalid branches early. Examples: N-Queens, Sudoku, timetabling constraints.

How to choose: do subproblems overlap (DP)? Does a greedy choice provably work (greedy)? Are there hard constraints to satisfy (backtracking)?

## Use it in the capstone

If our intelligent component includes optimisation (scheduling, allocation, routing), name the paradigm, state why it fits, and give its complexity. That is "algorithmic decision support" in the brief's terms.

## Related

- [Graphs: BFS, DFS and Dijkstra](graphs-bfs-dfs-dijkstra.md)
- [Sorting algorithms and stability](sorting-algorithms-and-stability.md)
- [Big-O rules of thumb](big-o-rules-of-thumb.md)
