---
title: Queue-based load leveling with a priority queue
tags: [architecture, patterns, scalability, accessibility]
source: "Lecture 10"
---

# Queue-based load leveling with a priority queue

**Problem.** Campus food demand is **bursty**: it spikes around 12:30 and is quiet at 10:00. A normal day serves about 200 people, but a campus-wide event could bring 1,000. You don't want to pay for peak capacity all day, so the system should be **elastic**: scale up for peaks and down when idle.

**Pattern: queue-based load leveling.** Requests go into a queue. Workers pull them at a steady rate, so a spike becomes a backlog instead of an overload.

**Data structure: a priority queue.** A plain FIFO queue would make a student with a disability or a medical need wait like everyone else. With a priority queue, flagged users (set at registration) are served first. Enqueueing is O(log n).

**Edge case: starvation.** In a priority queue, low-priority items can be overtaken forever by new high-priority ones. Fix it by **aging**: raise an item's priority the longer it waits.

Bottlenecks are usually the network and API calls, not compute. The team avoided **Singleton**, because the system is stateless and workers are spun up and down, so a single in-memory instance would not carry across them.

## Use it in the capstone

If our system has bursty demand (such as exam season or market days), show the queue in the architecture, define the priority rules (an accessibility NFR), and add aging to the test plan.

## Related

- [Cache-aside pattern](cache-aside-pattern.md)
- [Publish-subscribe with queued workers](publish-subscribe-with-queued-workers.md)
- [Singleton pattern](singleton-pattern.md)
- [Load balancing](load-balancing.md)
