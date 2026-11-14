---
title: Coalescing restaurant alerts with a throttle window
tags: [prior-work, architecture, algorithms, notifications]
source: "AOS Notification System Peak Concurrency Design Report, section 4, Joseph Etse (2 Nov 2026)"
---

# Coalescing restaurant alerts with a throttle window

**Coalescing** means merging many alerts into one summary. A **throttle window** is a fixed period (here 30 seconds) during which extra alerts are counted instead of sent.

```
on OrderPlaced(r):
  if window is closed for r:
    send "New order"; open 30-second window
  else:
    pendingCount[r] += 1
on window close(r):
  if pendingCount[r] > 0:
    send "<pendingCount[r]> new orders pending"
    pendingCount[r] = 0; open another 30-second window
  else:
    leave window closed
```

The first order alerts at once, so a lone order never waits (a fixed batch timer would make it wait). The summary should *replace* the previous alert, so "12 new orders" does not stack under "7 new orders".

**Numbers.** 1,000 orders to one restaurant in 5 seconds → **2 alerts** instead of 1,000. Students still get individual messages, so workers make O(n) sends; at an assumed 50 messages per second, 1,000 clear in about 20 seconds.

| Operation | Time | Space |
|---|---|---|
| Enqueue / dequeue | O(1) | O(q) |
| Burst of n orders | O(n) | O(n) backlog |
| Update a count | O(1) average | O(r) restaurants |
| Close a window | O(1) | O(1) |

Full orders stay in the database, so the coalescer keeps only counts. For one cafeteria the map can shrink to a single counter, or be keyed by kitchen station.

## Use it in the capstone

Use this for any staff-facing alert stream (kitchen tablet, dispatcher) where bursts are likely.

## Related

- [AOS notifications: publish-subscribe with a queue](aos-notifications-publish-subscribe-with-a-queue.md)
