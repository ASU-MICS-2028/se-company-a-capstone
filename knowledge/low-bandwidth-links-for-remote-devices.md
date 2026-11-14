---
title: Low-bandwidth links for remote devices
tags: [architecture, connectivity]
source: "Lecture 8"
---

# Low-bandwidth links for remote devices

A student asked the visiting robotics engineer whether cellular (4G) control of robots would work in Ghana's infrastructure. His answer had three parts:

1. **Design the device to be mostly autonomous.** Give it a command, and it does the job and comes back. Then you don't need a fast link, just enough to send commands and get status.
2. **Consider LoRa.** LoRa ("long range") is a low-power radio technology that sends small data packets over very long distances without a cellular network. It is good for telemetry (status readings such as position and battery). It is usually not good for video, though some higher-bandwidth variants can carry more.
3. **Use cellular where coverage is reliable.** His 4G module gives full control and camera access at tested ranges of about 30 km.

The general lesson for African deployments: **don't assume constant, fast connectivity.** Decide what really has to travel over the network (commands, small status updates) and what can stay on the device (heavy processing, video). Then pick the cheapest link that carries it.

## Use it in the capstone

State our connectivity assumptions in the requirements (as a constraint) and in the C4 deployment view. If users or devices are in low-coverage areas, design for small payloads, offline queues, or SMS/USSD.

## Related

- [Edge hardware for on-device AI](edge-hardware-for-on-device-ai.md)
- [Caching and PWA for poor connectivity](caching-and-pwa-for-poor-connectivity.md)
- [Functional, non-functional requirements and constraints](functional-non-functional-requirements-and-constraints.md)
