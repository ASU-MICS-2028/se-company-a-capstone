---
title: Web app design reading list
tags: [course, architecture, technology]
source: "Lecture 12; Lecture 13"
---

# Web app design reading list

Before the web app design diagram discussion, the lecturer asked everyone to **read ahead** on these technologies. For each one, know what it does, why it matters, and its **competing technologies**:

- **Redis:** a well-known in-memory store used for caching. What are its competitors?
- **Kafka:** event streaming and queues. Justify it against the alternatives.
- **Load balancing:** why it is important and how to achieve it.

Where the course goes next:

- After the architecture topic: **CI/CD** (continuous integration and continuous delivery), building a pipeline that starts from **GitHub** and strings these technologies together for a real project.
- Case studies of big-company system design, such as **Uber's architecture**, and why they chose **microservices** over other styles.
- Other systems (YouTube and others) will be discussed in class.

## Use it in the capstone

Each technology we put on the C4 diagram needs the same "what, why, versus what" justification. Our repo should have a working CI/CD pipeline from GitHub to the cloud host.

## Related

- [Kafka and message queues](kafka-and-message-queues.md)
- [Cache-aside pattern](cache-aside-pattern.md)
- [Load balancing](load-balancing.md)
- [Ride-hailing architecture review](ride-hailing-architecture-review.md)
