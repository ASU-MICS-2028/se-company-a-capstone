---
title: Kafka and message queues
tags: [architecture, messaging, technology]
source: "Lecture 10; Lecture 12; Lecture 13"
---

# Kafka and message queues

Patterns like publish-subscribe and queue-based load leveling need a queue in production. The lecturer's guidance:

- **Enterprise scale:** use a managed queueing system. **Apache Kafka** is the common choice. It manages many queues (topics) and streams events between services. AWS, Google Cloud and Microsoft Azure all offer their own queueing services too.
- **Lightweight systems:** you can implement the queue yourself, or use a simple library.

Kafka appears in the ride-hailing reference architecture shown in Lecture 13. The class was asked to **find Kafka's competing technologies and justify when Kafka is the best choice**. Possible competitors to research include RabbitMQ, AWS SQS/SNS, Google Pub/Sub and Redis Streams. Interviewers ask for exactly this kind of justification.

Trace every design idea all the way to the tool that will deploy it: "whatever you are thinking of on paper, trace it all the way."

## Use it in the capstone

If the architecture includes a queue, the design docs should name the technology and give a short comparison with alternatives, including why a free-tier or lightweight option fits a 6-week prototype.

## Related

- [Publish-subscribe with queued workers](publish-subscribe-with-queued-workers.md)
- [Ride-hailing architecture review](ride-hailing-architecture-review.md)
- [Web app design reading list](web-app-design-reading-list.md)
- [Message queues and pub/sub](message-queues-and-pub-sub.md)
