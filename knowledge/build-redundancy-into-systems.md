---
title: Build redundancy into systems
tags: [quality, reliability, architecture]
source: "Lecture 8"
---

# Build redundancy into systems

A visiting robotics engineer gave this as his first piece of advice: you cannot plan for everything, so **always build redundant systems**. **Redundancy** means having a backup component or method that takes over when the main one fails.

His example, from a ground robot:

- The main way it finds its position is a **stereo camera** running **SLAM** (simultaneous localisation and mapping: building a map while working out where you are on it).
- In low light, camera SLAM fails. A **LIDAR** (a laser range scanner) takes over.
- If that is also degraded, a further fallback can bring the robot back to a known safe position.

For drones the stakes are higher. A badly tuned failure means an expensive machine falling out of the sky. Newer software adds recovery behaviours (for example, research letting multi-rotor craft autorotate like helicopters).

What it means for software:

- Fallback paths for critical functions, such as a second payment provider, SMS when push notifications fail, or a cached or offline mode.
- More than one instance of key services, so one crash doesn't take the system down.
- Redundancy raises **availability**. Two independent components that can each do the job fail together far less often than either one alone.

## Use it in the capstone

Name the single points of failure in our C4 container diagram and give each one a fallback. In the quality section, show how redundancy changes the availability calculation (parallel components).

## Related

- [Plan a safety margin](plan-a-safety-margin.md)
- [Caching and PWA for poor connectivity](caching-and-pwa-for-poor-connectivity.md)
- [Performance versus reliability](performance-versus-reliability.md)
