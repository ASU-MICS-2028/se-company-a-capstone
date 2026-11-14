---
title: Edge hardware for on-device AI
tags: [architecture, ai, hardware]
source: "Lecture 8"
---

# Edge hardware for on-device AI

**Edge computing** means running computation on or near the device (a robot, a drone, a phone) instead of in a distant cloud. The visiting robotics engineer's choices:

- **Use a capable microcomputer for heavy work.** He uses NVIDIA Jetson boards (from a 2 GB model up to an 8 GB "Orin" class board), not a Raspberry Pi. The Pi falls far behind once you process several sensors (cameras, LIDAR) at once. Jetson boards can also run neural networks.
- **Don't load every sensor at full rate.** With ROS, each part pulls the data it needs when it needs it, so the processor isn't swamped.
- **Use lightweight models on small devices**, such as the "nano" or "tiny" versions of YOLO object detectors.
- **Map in real time.** His robot works in changing environments, so it builds its LIDAR map as it goes. He avoids preloaded maps because you cannot predict a dynamic environment.

On autonomy: he sends a goal and the robot carries it out. He keeps contact through a 4G module on the onboard computer, tested to about 30 km (see [low-bandwidth links for remote devices](low-bandwidth-links-for-remote-devices.md)).

The trade-off to state in any design: on-device AI lowers delay and works offline, but limits model size. Cloud AI allows bigger models but needs connectivity.

## Use it in the capstone

In the C4 container and deployment views, show where the model runs (device, edge box or cloud) and why. Tie the choice to connectivity in our African setting.

## Related

- [Try open source before buying tools](open-source-before-paid-tools.md)
- [Caching and PWA for poor connectivity](caching-and-pwa-for-poor-connectivity.md)
- [Deployment targets are not only the web](deployment-targets-are-not-only-the-web.md)
