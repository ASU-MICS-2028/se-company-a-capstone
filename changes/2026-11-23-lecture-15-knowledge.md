---
title: Knowledge notes from Lecture 15
date: 2026-11-23
owner: Joseph Etse
contributors: none
issue: "#17"
pr: ""
ai_used: yes
---

# Knowledge notes from Lecture 15

## What changed

Seven new notes in `knowledge/` from the Lecture 15 transcript (software architecture styles, from monolith to microservices):

- Start with a modular monolith
- Layered (N-tier) architecture
- Microservices trade autonomy for delivery maturity
- Event-driven consumers must be idempotent
- Serverless means stateless functions
- Hexagonal architecture (ports and adapters)
- Invite the Product Owner to stand-ups

## Why

Plan #17 adds every lecture as its notes arrive. These notes feed the architecture write-up (#7): which style Twɛn uses and why. They also cover the stand-up request for the week of 24 Nov (#15).

## Who did what

| Person | Part |
|---|---|
| Joseph Etse | Owns the knowledge base; reviews the notes |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| Seven notes | Claude Code | Read the transcript and drafted the notes and their Twɛn links | Joseph reviews in this PR |

## How to check it

`python3 scripts/index.py --check` passes. Each note's `source` is "Lecture 15".
