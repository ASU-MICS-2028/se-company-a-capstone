---
title: Producer-consumer and the bounded buffer
tags: [architecture, concurrency]
source: "Concurrency-teaching-tool MSc dissertation; Threads deck (Kirsh, Drop example)"
---

# Producer-consumer and the bounded buffer

**Problem.** Producer threads create items, and consumer threads use them, at different speeds. They share a **bounded buffer**, a fixed-size queue.

Rules:
- A producer must **wait when the buffer is full**.
- A consumer must **wait when it is empty**.
- Only one thread changes the buffer at a time.

**Monitor solution (sketch):**
```
put(item):  while full: wait();  add item;  notifyAll()
get():      while empty: wait(); remove item; notifyAll(); return item
```
The Threads deck's `Drop` class is a one-slot version, using an `empty` flag.

**Unsynchronised versions fail:** items are lost or consumed twice, counts go wrong, or the program crashes. The dissertation's tool ran synchronised and unsynchronised versions side by side so learners could see the difference.

**Real-world forms:** a print spooler, a web server's request queue, a message queue between an API and ML workers, a mobile-money request buffer.

## Use it in the capstone

If we queue ML jobs or notifications, we are building producer-consumer. Explain it with this vocabulary in the programming-model section, and set a queue limit (back-pressure) as an availability safeguard.

## Related

- [wait and notify (guarded blocks)](wait-notify-guarded-blocks.md)
- [Message queues and pub/sub](message-queues-and-pub-sub.md)
- [Readers-writers problem](readers-writers-problem.md)
- [Stacks and queues](stacks-and-queues.md)
