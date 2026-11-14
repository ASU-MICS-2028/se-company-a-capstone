---
title: API gateway
tags: [architecture, security]
source: "System Design Blueprint (ByteByteGo infographic)"
---

# API gateway

An **API gateway** is the single entry point in front of backend services. It handles cross-cutting jobs once, so each service doesn't repeat them:

- input validation and request-header checks
- authentication (for example OAuth 2.0) and authorisation
- **rate limiting / throttling** (cap requests per client)
- allow- and block-lists, flow control
- **TLS termination** (decrypt HTTPS at the edge)
- request de-duplication
- metering and usage data collection
- routing (dispatching) requests to the right service

It is the [Facade pattern](facade-pattern.md) at system level.

Trade-off: one more hop, and a single point of failure unless replicated.

## Use it in the capstone

We probably don't need a separate gateway product. Our API framework's middleware (auth, validation, rate limit) plays the role. Name it that way in the architecture doc and the security NFRs.

## Related

- [System design blueprint](system-design-blueprint.md)
- [Load balancing](load-balancing.md)
- [Privacy vs security](privacy-vs-security.md)
