---
title: Plan-driven development for regulated systems
tags: [se-overview, methodology, safety-critical]
source: "Lecture 5"
---

# Plan-driven development for regulated systems

**Plan-driven** development (waterfall is the classic example) fixes the requirements first, then proceeds step by step without going back - like water falling downhill.

How it often works in practice: all stakeholders are taken on a retreat for about a week, paid per diems, and brainstorm an exhaustive, trusted list of requirements. The document is handed down to teams who build systematically until deployment.

The weakness: if a problem is found late (say, in testing), going back is **very expensive** - you must reassemble the stakeholders, pay again, and lose time. So it only works well if you are very sure your stakeholders can do a thorough job up front.

Where it is still recommended: **safety-critical** systems, where a mistake can kill people:
- Healthcare - for example, software controlling an X-ray scanner must never give a harmful radiation dose.
- Transport and aviation.

These need approval from regulators (national standards boards, aviation bodies), which demand **rigorous documentation**. Plan-driven methods produce it; agile methods document, but not as a priority.

## Use it in the capstone

If our system touches health, safety or money, say in the paper how we compensated for agile's lighter documentation (for example, a fuller requirements and test record for critical features).

## Related

- [History of software engineering approaches](history-of-software-engineering-approaches.md)
- [Deployment targets are not only the web](deployment-targets-are-not-only-the-web.md)
- [Agile versus waterfall](agile-versus-waterfall.md)
