---
title: Race condition
tags: [architecture, quality, concurrency]
source: "Concurrency-teaching-tool MSc dissertation; Multithreading deck (CS 313); ICP Lab 4"
---

# Race condition

A **race condition** is wrong behaviour that depends on the *timing* of threads accessing shared data. It shows up only on some runs, which makes it hard to reproduce and test.

Why it happens: `count++` looks like one step but is three (read, add, write). Two threads can both read 5 and both write 6, losing an update. This is called **interference**.

Classic illustrations:
- **Lab 4:** one thread increments a shared counter 1000 times while another decrements it 1000 times. The final value should be 0 but varies between runs.
- **ATM (dissertation):** two withdrawals from the same account interleave, and the balance ends up wrong.
- **Multithreading deck:** one thread in `setCount` while another is in `getCount` reads inconsistent data.

Fix: **synchronisation**. Make the read-modify-write **atomic** (it cannot be interrupted) with locks, `synchronized`, atomic types (`AtomicInteger`), or database transactions.

## Use it in the capstone

Our version is two requests updating the same record at once (stock, balance, booking slot). Use database transactions or row locks with a uniqueness constraint, and write a concurrent test. It is good quality evidence.

## Related

- [Java synchronized keyword and locks](java-synchronized-and-locks.md)
- [Critical section ground rules](critical-section-ground-rules.md)
- [Idempotency keys](idempotency-keys.md)
- [ICP Lab 4: threads and MVC](icp-lab-4-threads-and-mvc.md)
- [Concurrency and multithreading](concurrency-and-multithreading.md)
