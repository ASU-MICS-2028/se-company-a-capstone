---
title: Multithreading deck summary (CS 313)
tags: [architecture, reading, concurrency]
source: "Multithreading deck (CS 313 Intermediate Computer Programming, lectures 10–13)"
---

# Multithreading deck summary (CS 313)

An undergraduate deck taught by the course instructor.

**Content:**
1. **Why concurrency now:** Moore's law slowed, so performance comes from multicore chips and parallel programs.
2. **Processes vs threads:** see [Threads vs processes](threads-vs-processes.md). Reasons for threads: parallelism, responsiveness, using idle CPU, prioritising. The web-server example.
3. **Creating threads:** prefer `Runnable`; `start()` vs `run()`. Demos: ThreadDemo, RunnableDemo.
4. **Thread states:** New, Runnable, Running, Blocked, Dead. See [Java thread states](java-thread-states.md).
5. **Synchronisation:** a bank-account-style counter example; instance vs static locks; the mixed static/instance mistake. See [Java synchronized and locks](java-synchronized-and-locks.md).
6. **Object locking with wait/notifyAll.**
7. **Further reading:** thread pools, mutexes, semaphores; the Oracle concurrency tutorial.

## Use it in the capstone

Shows the instructor's interest in concurrency and correctness under parallel load. Expect a question on how our system handles simultaneous users, and answer with locks, transactions and queues.

## Related

- [Threads deck summary](threads-deck-summary.md)
- [Race condition](race-condition.md)
- [ICP Lab 4: threads and MVC](icp-lab-4-threads-and-mvc.md)
- [Concurrency and multithreading](concurrency-and-multithreading.md)
