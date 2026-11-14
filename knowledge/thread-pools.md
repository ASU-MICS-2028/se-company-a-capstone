---
title: Thread pools
tags: [architecture, concurrency, performance]
source: "Threads deck (Kirsh)"
---

# Thread pools

**Thread-per-session** (starting a new thread for every request) is called "a wrong and un-scaled architecture" in the Threads deck. Under load, it creates thousands of threads, each costing memory and switching time, until the server falls over.

A **thread pool** keeps a fixed number of worker threads and feeds them tasks from a queue. Each finished worker picks up the next task. In Java: `ThreadPoolExecutor` or `Executors.newFixedThreadPool(n)`.

Benefits: bounded resource use, no thread-creation cost per task, and a natural back-pressure point (the queue).

The deck's exercise: run X sessions of a print task on a pool of Y threads, with X and Y read from the command line. You can see that X > Y works fine.

Web servers and frameworks (Tomcat, Gunicorn workers, uvicorn) already use pools.

## Use it in the capstone

In the deployment doc, state the worker or pool size we configure and why, and load-test it. Pool size versus response time is a ready-made performance result for the paper.

## Related

- [Java thread creation](java-thread-creation.md)
- [Producer-consumer and the bounded buffer](producer-consumer-bounded-buffer.md)
- [Load balancing](load-balancing.md)
