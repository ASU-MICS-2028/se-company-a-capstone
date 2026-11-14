---
title: Evolutionary vs throwaway prototyping
tags: [se-overview, process]
source: "Concurrency-teaching-tool MSc dissertation"
---

# Evolutionary vs throwaway prototyping

A **prototype** is a working model of part or all of a system. It may not be dependable or complete.

- **Throwaway prototyping:** build quickly to *learn and clarify requirements*, then discard it and build the real system properly.
- **Evolutionary prototyping:** start from an outline specification, work with the customer, and *grow* the prototype step by step into the final system. Specification and development are interleaved, which is flexible and suits incremental delivery.

The dissertation's process-model comparison:
- **Waterfall:** clear order, documentation and tracking, but rigid. Hard for inexperienced developers to deliver on time, poor with change, costly to fix late.
- **Agile:** copes with change and unclear requirements, but refactoring grows costly as the system grows.
- **Evolutionary prototyping:** chosen as the best fit for a time-bound, single-developer project with a supervisor acting as customer.

Risk: an evolutionary prototype can carry early shortcuts into the final product. Re-check requirements before each prototype.

## Use it in the capstone

Our build is evolutionary *within* Scrum. Each sprint's increment grows into the MVP. Keep UI mockups and model spikes as *throwaway* (label them so in the repo), and say which is which in the Methodology.

## Related

- [Prototyping to understand the problem](prototyping-to-understand-the-problem.md)
- [Agile versus waterfall](agile-versus-waterfall.md)
- [Concurrency teaching tool dissertation](concurrency-teaching-tool-dissertation.md)
