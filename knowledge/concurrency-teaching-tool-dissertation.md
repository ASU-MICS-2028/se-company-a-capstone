---
title: Concurrency teaching tool dissertation (summary)
tags: [research, concurrency, reading]
source: "MSc Computing Science dissertation, Newcastle University: an animated tool for teaching concurrent programming"
---

# Concurrency teaching tool dissertation (summary)

An MSc dissertation by the course instructor. These notes cover only the ideas relevant to ICS 530.

**Aim.** Build a teaching tool for Java and C++ students that **visualises and animates** multithreaded behaviour. It runs synchronised and unsynchronised solutions to the [producer-consumer](producer-consumer-bounded-buffer.md) and [readers-writers](readers-writers-problem.md) problems side by side, so learners can *see* interference.

**Method.** [Evolutionary prototyping](evolutionary-vs-throwaway-prototyping.md) in three prototypes: (1) console logic for both problems, synchronised and not; (2) a GUI layout attempt with sections for notes, animation and controls; (3) the final animated Java Swing GUI. Background research covered concurrency hazards (race conditions, deadlock, livelock), [monitors](monitors.md), Java threading, animation technology, and HCI (Nielsen's heuristics, cognitive theory of learning with media).

**Testing.** Unit, integration and system checks by inspection, guided by a [use case diagram](use-case-diagram.md). For example: the GUI displays correctly from 800×600 to 1200×800, and each button works.

**Results and honest limits.** All objectives were met, but there was **no user evaluation** (a planned questionnaire was dropped for lack of time and participants). PAUSE was not finished, it was not tested on Mac, and some values were not shown in the animation. A terminal view was added to show what the animation hid.

**Future work.** Richer 2D and 3D animation, more problems (dining philosophers, sleeping barber), multi-platform builds, and evaluation with real users.

## Use it in the capstone

Lessons: plan user evaluation *early* so time pressure can't cut it, and report limitations candidly, as this work does.

## Related

- [Evolutionary vs throwaway prototyping](evolutionary-vs-throwaway-prototyping.md)
- [Critical section ground rules](critical-section-ground-rules.md)
- [Heuristic evaluation](heuristic-evaluation.md)
