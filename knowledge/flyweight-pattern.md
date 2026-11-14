---
title: Flyweight pattern
tags: [patterns, structural, flyweight, performance]
source: "Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck (named only); summary from Gamma et al. 1994"
---

# Flyweight pattern

**Flyweight** is a structural Gang of Four pattern. It saves memory by **sharing the common parts** of many similar objects.

Each object's state is split in two:

- **Intrinsic state:** shared and the same for many objects (for example, the car icon image). This shared part is the flyweight.
- **Extrinsic state:** unique to each object (for example, each car's position and direction).

**Example: a ride-hailing map.** Hundreds of cars appear on the map. Without Flyweight there would be 300 identical images in memory. With it, all cars share one image and store only their own position and heading. Games do the same (the same rendered cloud or tree drawn many times).

**Flyweight factory:** clients don't create flyweights directly. They ask the factory by key ("car", "motorbike"). If the factory has it, it returns the shared object. If not, it loads it once and stores it for reuse.

**Use it only when memory is a real problem**: many objects with a lot of overlap. Otherwise it is needless complexity.

**Flyweight versus Prototype:** Flyweight *shares* common data. Prototype *clones* an entire object.

**Lecturer's link to caching:** keep the shared base in memory (like the `Animal` parent that mammal and reptile both use) and load only the distinguishing parts when needed. That is in-memory processing, like a cache.

## Use it in the capstone

Relevant if our UI renders many similar items (map markers, list tiles) on low-end phones. Mention it under performance NFRs.

## Related

- [Prototype pattern](prototype-pattern.md)
- [Caching and PWAs for poor connectivity](caching-and-pwa-for-poor-connectivity.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

The deck lists Flyweight but does not describe it.

**African example:** a farm-map app showing 50,000 plots, where all maize plots share one icon and style object and only coordinates are stored per plot. That matters on low-end Android phones.
