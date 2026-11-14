---
title: Try open source before buying tools
tags: [architecture, tooling]
source: "Lecture 8"
---

# Try open source before buying tools

The visiting robotics engineer's second piece of advice: students rarely have the budget for expensive software, and robotics (like most of software) has a huge **open-source** ecosystem, meaning free software whose code is public. **Before paying for anything, find an open-source option and test it first.** Buy only if it really falls short.

Tools he named:

- **ROS** (Robot Operating System): middleware that passes sensor data between the parts of a robot. You write small scripts ("nodes") for what you need, and ROS gives each part the data it asks for, when it needs it. Open-source drivers already exist for most sensors, including LIDARs.
- **Mission Planner / ArduPilot**: open flight-control software for drones.
- **Gazebo** and **NVIDIA Isaac Sim / Isaac ROS**: simulators. Isaac is drag-and-drop friendly and good for humanoid and other robots.
- **YOLO** ("You Only Look Once"): an object-detection model family. He uses ready-made pre-trained versions, or lighter variants for small devices. He trains his own models (for example with AlexNet, on datasets like COCO) only when he needs something specific.
- **Linux**: "you and Linux become best friends."

The same thinking applies to software: try pre-trained models and open libraries before training from scratch or paying for APIs.

## Use it in the capstone

For the AI component, start from an open pre-trained model and justify any paid service. List the tools and their licences in the architecture doc and the paper's implementation section.

## Related

- [Test in simulation before you trust hardware](test-in-simulation-before-trusting-hardware.md)
- [Edge hardware for on-device AI](edge-hardware-for-on-device-ai.md)
