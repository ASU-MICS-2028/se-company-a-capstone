---
title: Order for assessing quality attributes
tags: [quality, non-functional, availability, reliability]
source: "Lecture 10"
---

# Order for assessing quality attributes

The lecturer checks non-functional requirements in a fixed order. The first three come in sequence. The rest have no set order.

1. **Availability first.** Is the system there at all? For a website: does the URL return 200 OK, or a 404 or nothing? If the system is not available, every other analysis (even a rigorous security review) is wasted effort.
2. **Performance second.** Is it doing its job *right now*? His example was a flask: you can see at a glance whether it is hollow, holds liquid and keeps the heat in. Performance is judged in the moment.
3. **Reliability third.** Reliability is *performance over time*. A car can drive well on the test drive and still overheat on the way home, so you measure many things over a period of time.

Alongside these sit **constraints**: the environment the system runs in. The best laptop still slows down and stops in a very hot room. Network quality, devices and power are constraints for software.

After these come safety (can it harm anyone or anything?), privacy and security, in any order. Each one has its own metrics.

## Use it in the capstone

Use this order to set up the quality engineering section. Start with the availability calculation, then performance targets, then reliability over time. State the African deployment constraints (patchy networks, low-end phones) up front.

## Related

- [Quality attributes are non-functional requirements](quality-attributes-are-non-functional-requirements.md)
- [Privacy versus security](privacy-vs-security.md)
- [Caching and PWAs for poor connectivity](caching-and-pwa-for-poor-connectivity.md)
- [Performance versus reliability](performance-versus-reliability.md)
