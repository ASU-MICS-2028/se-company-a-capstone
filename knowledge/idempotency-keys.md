---
title: Idempotency keys
tags: [architecture, quality, reliability, payments]
source: "System Design Blueprint (ByteByteGo infographic); Lecture 10"
---

# Idempotency keys

An operation is **idempotent** if doing it twice has the same effect as doing it once. An "off" button is idempotent: press it five times and the light is still off; a toggle is not. GET and PUT are idempotent. "Charge GH₵20" is not.

Networks fail mid-request, so clients retry. Without protection:

- **Payments:** a retried payment charges the customer twice.
- **Notifications:** the system sends a message, wrongly thinks it failed, and sends it again.

An **idempotency key** is a unique ID the client generates per intended action and sends with the request. The server stores the key with the result. If the same key arrives again, it returns the stored result instead of acting again.

The lecturer flagged idempotency and idempotency keys as a "very, very important concept" that came up in several group designs. The blueprint uses keys on requests and on the payment service, and lists payment failure cases to handle: expired, blocked or invalid card, service down, insufficient balance.

Especially relevant to mobile money on unstable connections, where the "did it go through?" retry is common.

## Use it in the capstone

Any create, pay, mobile-money or messaging endpoint in our API should accept an idempotency key (a UUID from the client) with a unique database constraint. Add a test that sends the same request twice.

## Related

- [Message queues and pub/sub](message-queues-and-pub-sub.md)
- [System design blueprint](system-design-blueprint.md)
- [Testing with extreme inputs](testing-with-extreme-inputs.md)
- [Transactional outbox](transactional-outbox.md)
- [Publish-subscribe with queued workers](publish-subscribe-with-queued-workers.md)
