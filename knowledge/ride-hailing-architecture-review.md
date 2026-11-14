---
title: Ride-hailing architecture review
tags: [architecture, system-design, c4]
source: "Lecture 11; Lecture 12; Lecture 13"
---

# Ride-hailing architecture review

In Lecture 13 the class walked through a high-level system architecture (component-style) diagram for a ride-hailing app, the kind interviewers ask you to draw and justify. Points the lecturer raised:

- **Two starting points run in parallel.** *Demand*: a customer requests a ride. *Supply*: a driver signals "I'm available". Neither works without the other, so the diagram shows both flows side by side.
- **Three users, not two:** customer, driver, and a **company administrator** who acts on reports about drivers.
- **Firewall:** necessary, but not sufficient (see the firewall note).
- **Load balancer:** be ready to explain its algorithm.
- **Communication:** services talk over **REST** APIs (more current than XML-based **SOAP**) and **WebSockets** for live streaming of locations. **Kafka** carries events. The class must justify Kafka against its competitors.
- **Data:** a relational database, location data stored as coordinates, route and ETA algorithms (shortest path), and a big-data stack (what sounded like Spark and Hadoop with HDFS file storage). Know these technologies and their logos.
- **Missing piece: a CDN** (content delivery network), which caches static content close to users. The lecturer had raised where to place the CDN, the proxy server and the load balancer in Lecture 11.

This diagram is deliberately high level. Real system diagrams are much more detailed. Start with the flow of engagement, then insert technologies, models and sequences.

## Use it in the capstone

Use this as a checklist for our C4 container diagram: every user type, both flows, firewall plus app-level security, load balancer, CDN, queue, API style, and data stores, each with a one-line justification.

## Related

- [A firewall is not enough](firewall-is-not-enough.md)
- [Load balancing](load-balancing.md)
- [Kafka and message queues](kafka-and-message-queues.md)
- [Web app design reading list](web-app-design-reading-list.md)
