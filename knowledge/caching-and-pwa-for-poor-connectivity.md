---
title: Caching and PWAs for poor connectivity
tags: [architecture, ux, caching, africa]
source: "Lecture 10; Lecture 11; Lecture 12"
---

# Caching and PWAs for poor connectivity

The lecturer stressed this more than once: **in Africa, where internet connectivity is often poor, caching should be the first thing you design for in any mobile or web app.** A good caching strategy lets users keep engaging with content that would otherwise sit only in the database, even when the network drops.

A **Progressive Web Application (PWA)** is a web app that can be installed and work offline. Its building blocks (such as service workers) offer several caching strategies, for example "network first" or "cache first". Choose one per type of content and apply it.

Related patterns the lecturer tied to caching:

- **Memento**: storing state so you can return to it. On-device caching works the same way, and so did BitTorrent-style downloads.
- **Flyweight**: keep the shared parts in memory and load only the differences.
- **Proxy**: can cache responses in front of an external API.

## Use it in the capstone

State an offline or low-bandwidth NFR. Build the prototype as a PWA (or with on-device caching), and describe the caching strategy in the architecture docs. This is a strong point for an "African context" paper.

## Related

- [Cache-aside pattern](cache-aside-pattern.md)
- [Memento pattern](memento-pattern.md)
- [Flyweight pattern](flyweight-pattern.md)
- [Order for assessing quality attributes](order-for-assessing-quality-attributes.md)
