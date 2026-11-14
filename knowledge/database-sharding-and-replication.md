---
title: Database sharding and replication
tags: [architecture, data, quality]
source: "System Design Blueprint (ByteByteGo infographic)"
---

# Database sharding and replication

**Replication:** keep copies of the same data on several servers. It improves availability (one copy fails, others serve) and read capacity. Schemes: leader-follower (one writer, many readers), multi-leader, leaderless with **quorum** (a read or write succeeds when enough replicas agree). Supporting techniques: hinted handoff, Merkle trees for syncing.

**Sharding (partitioning):** split the data *across* servers so each holds a part. Strategies: range-based, hash-based (often **consistent hashing**, which limits reshuffling when servers change), geographic, directory-based. Watch for **hot shards**, where one shard gets most of the traffic.

**Database types** on the blueprint: relational (ACID), column-wide, document, key-value, graph, time-series, plus cold storage for old records. ACID is strong consistency. BASE (basically available, soft state, eventually consistent) trades consistency for availability.

**Security at this layer:** RBAC (role-based access control), data encryption, audit trail.

## Use it in the capstone

At our scale, one managed Postgres with automated backups is enough. In the deployment doc, state that, name replication as the availability upgrade path, and list RBAC and encryption at rest as security measures.

## Related

- [System design blueprint](system-design-blueprint.md)
- [Load balancing](load-balancing.md)
- [Privacy vs security](privacy-vs-security.md)
