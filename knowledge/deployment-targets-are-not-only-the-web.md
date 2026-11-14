---
title: Deployment targets are not only the web
tags: [se-overview, deployment, safety-critical]
source: "Lecture 1"
---

# Deployment targets are not only the web

Deployment can go to an in-house server, a company's public server, or a target device. The lecturer warned against assuming all software is web-based; much of it never touches the internet.

His example from his PhD research: modelling a submarine **airlock**. A diver enters a chamber from the water, it is sealed, water is drained, the chamber is decompressed in stages to normal pressure, and only then does the person move inside. Get the logic wrong and you kill the diver, everyone on board, or destroy a very expensive vessel. This is a **safety-critical system** - one whose failure can cause death or serious harm - and it needs very thorough logic checking. Space systems are similar.

Lesson: deploy to whatever the real target is, and match the rigour of checking to how critical the system is.

## Use it in the capstone

In the C4 deployment view, say exactly where each part runs (phone, server, offline device). If our users have poor connectivity, consider offline-first design and list "no internet" as a constraint.

## Related

- [Verification versus validation](verification-versus-validation.md)
- [Functional, non-functional requirements and constraints](functional-non-functional-requirements-and-constraints.md)
