---
title: Knowledge notes from Lecture 14
date: 2026-11-18
owner: Joseph Etse
contributors: []
issue: "#17"
pr: ""
ai_used: yes
---

# Knowledge notes from Lecture 14

## What changed

Seven new notes in `knowledge/`, from the Lecture 14 transcript (WhatsApp architecture walkthrough and proposal reviews):

- Justify a model against a simpler algorithm: the lecturer's question about Twɛn's model, and how we answer it
- A CDN speeds up delivery but does not secure it
- Queue writes to keep them ordered and exclusive
- Know the alternatives to every tool you pick
- NoSQL for live traffic, SQL for the record
- Design for languages that are spoken more than written
- Build the software before the hardware

Plan #17 now says every lecture goes in as its notes arrive. Lectures 1-13 were already covered.

## Why

The lecturer's feedback on our model is the most likely Q&A question, and the rest feeds the architecture (#7) and UX (#6) work.

## Who did what

| Person | Part |
|---|---|
| Joseph Etse | Owner; asked for the notes |

## AI use

| Part | Tool | What the AI did | What a person checked |
|---|---|---|---|
| Notes | Claude Code | Read the Lecture 14 transcript and summary, wrote the notes and their capstone links | Not yet: each workstream owner reviews the notes for their area |

## How to check it

Compare each note with `Lecture 14.md` in the class notes. Run `python3 scripts/index.py --check`.
