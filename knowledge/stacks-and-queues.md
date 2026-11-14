---
title: Stacks and queues
tags: [data, algorithms]
source: "Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Stacks and queues

**Stack: LIFO (last in, first out).** Push and pop at the same end, both O(1). Uses: function call stacks, undo and redo, expression parsing, backtracking in DFS, browser history. Risk: overflow from unbounded recursion.

**Queue: FIFO (first in, first out).** Enqueue at the rear, dequeue from the front, O(1) with a linked implementation. Uses: task scheduling, print spoolers, BFS, OS process scheduling, buffering.

Variants:
- **Deque:** add or remove at both ends.
- **Priority queue:** served by priority, not arrival (built on a [heap](trees-and-heaps.md)). Use it for hospital triage or schedulers where urgency decides.
- **Circular queue:** a fixed-size ring buffer. It is the [bounded buffer](producer-consumer-bounded-buffer.md) in producer-consumer.

Campus and African examples from the deck: the Akornor serving line (queue, with a priority queue for pre-orders), mobile-money request buffers, campus shuttle request queues.

## Use it in the capstone

Any background job (ML inference, notifications) should go through a queue, not run inside the web request. It is a standard availability and performance argument.

## Related

- [Data structure decision tree](data-structure-decision-tree.md)
- [Message queues and pub/sub](message-queues-and-pub-sub.md)
- [Producer-consumer and the bounded buffer](producer-consumer-bounded-buffer.md)
