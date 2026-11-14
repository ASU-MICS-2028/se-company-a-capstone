---
title: Prompt engineering for building systems
tags: [se-overview, ai, prompting]
source: "Lecture 13"
---

# Prompt engineering for building systems

The capstone allows heavy AI use, so the lecturer stressed **engineering the prompt** as a software artefact.

- **Thorough, not two sentences.** Students who type a two-sentence prompt and get excited by the output are not doing engineering. A demo prompt he reviewed ran to about **five pages**.
- **Brainstorm prompts as a team** in a meeting, make sure they cover everything, and then send them. Fixes afterwards should be minor. "Engineer your system in your prompt before you send it."
- **Put your design work into the prompt**: the patterns, data structures, algorithms and trade-offs worked out in class (as in the cafeteria exercises).
- **An incremental route is also valid:** start from a high-level description, have the AI help brainstorm, and record an **architectural decision record (ADR)** for every feature. Iterate until the plan is solid, then build.
- **Testing needs its own long prompt**, covering unit, integration *and* end-to-end tests.
- Let AI help you write the prompt itself, and ask it to generate documents from your prompts.

**Vibe coding versus software engineering.** Vibe coding (prompting until something runs) gets a quick answer. Whether it *succeeds* for the stakeholders is a separate question, and that is where software engineering comes in. The lecturer cited an industry view that engineers should learn software engineering properly first, then add AI.

## Use it in the capstone

Keep our main build and test prompts, and the ADRs, in the repo. They are evidence of process for the documentation grade and the paper's method section.

## Related

- [Specific prompting with pattern keywords](specific-prompting-with-pattern-keywords.md)
- [End-to-end testing](end-to-end-testing.md)
- [Personal CSS signature style](personal-css-signature-style.md)
