---
title: Load balancing
tags: [architecture, quality, scalability]
source: "System Design Blueprint (ByteByteGo infographic); Lecture 13"
---

# Load balancing

A **load balancer** spreads incoming requests across several server instances, so no single one is overloaded and one can fail without taking the service down. "It partitions the load" is not enough of an answer: the lecturer wants the *mechanism* that makes the distribution **fair**. There is no single algorithm.

- **Round robin:** hand requests to each server in turn, in a circle.
- **Weighted round robin:** stronger servers get more turns.
- **Least connections / workload-based:** send to the least busy server.
- **Threshold-based:** each server takes up to a set number of requests (say, 500 at a time).
- **Completion-time based:** send more to servers that finish faster.
- **Hash / sticky sessions:** the same client always goes to the same server.
- **Random.**
- **Dynamic or adaptive:** strategies that adjust themselves rather than follow a fixed loop.

What to monitor: access logs, status codes, number of requests, active connections.

**Culturally and nature-inspired algorithms.** The lecturer models algorithms on culture and nature, e.g. a bee-colony traffic-light system. **Oware** (the Ghanaian pit-and-seed game) picks up an overloaded pit and redistributes the stones, an idea that can extend round robin. Benchmarked, such approaches can beat standard ones.

Link to quality: two replicas behind a balancer form a **parallel system**. If each is available 99%, the pair is available 1 − 0.01² = 99.99%, assuming independent failures and a reliable balancer.

## Use it in the capstone

Name the algorithm in the architecture doc if we run more than one instance. Use the availability formula as a worked example in our quality section even if we deploy one instance, stated as an assumption. A culturally inspired algorithm benchmarked against round robin could be a research angle.

## Related

- [System design blueprint](system-design-blueprint.md)
- [API gateway](api-gateway.md)
- [Database sharding and replication](database-sharding-and-replication.md)
- [Ride-hailing architecture review](ride-hailing-architecture-review.md)
- [Queue-based load leveling with a priority queue](queue-based-load-leveling.md)
- [Web app design reading list](web-app-design-reading-list.md)
