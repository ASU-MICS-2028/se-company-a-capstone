---
title: Plan a safety margin
tags: [quality, reliability]
source: "Lecture 8"
---

# Plan a safety margin

The visiting robotics engineer's fourth rule: **never run a system at 100% of its rated capacity.** If a motor is rated to lift 50 kg, don't load it with 50 kg. A safe starting point is about half, around 25 kg. Then raise it gradually as tests pass.

A student asked whether 50% was a research-based figure. He said it is an engineer's judgement call. His agricultural drones run at roughly 70–80% of rated capacity, after testing showed that was safe. Hitting 100% during operation should be treated as an incident to investigate, not normal use.

In software this is **headroom**:

- Size servers and databases so normal peak load sits well below the maximum (for example, keep CPU under about 70%).
- Set rate limits and timeouts below the point where things break.
- Load-test up to and past the expected peak, then document the margin.

A safety margin protects **reliability**, because components close to their limit fail more often and less predictably. It also gives you room for growth you didn't expect.

## Use it in the capstone

In the quality section, state the expected peak load, the tested maximum, and the margin between them. Use the expected load, not the maximum, when reasoning about availability.

## Related

- [Build redundancy into systems](build-redundancy-into-systems.md)
- [Performance versus reliability](performance-versus-reliability.md)
- [Queue-based load leveling](queue-based-load-leveling.md)
