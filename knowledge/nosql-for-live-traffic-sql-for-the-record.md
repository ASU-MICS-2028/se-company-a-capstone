---
title: NoSQL for live traffic, SQL for the record
tags: [architecture, data]
source: "Lecture 14"
---

# NoSQL for live traffic, SQL for the record

A relational database checks integrity (keys, constraints, transactions) on every write. That makes it trustworthy but limits how many writes per second it takes. A flat NoSQL store accepts writes and serves reads quickly because it checks less.

The lecturer's pattern for heavy traffic: put a NoSQL store, backed by a cache, in front for live reads and writes. At a set time, batch everything into the relational database as the final record, the way a bank closes at 5 p.m. and balances its books before committing them.

## Use it in the capstone

Twɛn does not need this. One clinic generates about 53 joins an hour, which PostgreSQL handles easily, and we need its transactions to make ticket numbers and the outbox correct. Say this explicitly if asked: we chose correctness over write throughput we don't need.

## Related

- [Database sharding and replication](database-sharding-and-replication.md)
- [Know the alternatives to every tool you pick](know-the-alternatives-to-every-tool.md)
