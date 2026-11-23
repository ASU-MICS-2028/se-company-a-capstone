---
title: Product Owner corrected to the lecturer
date: 2026-11-23
owner: Joseph Etse
contributors: none
issue: "#3"
pr: ""
ai_used: yes
---

# Product Owner corrected to the lecturer

## What changed

- New decision: [the instructor is Product Owner](../decisions/2026-11-23-product-owner-is-the-instructor.md). Liza Aikins is Requirements and UX lead and still owns #5 and #6.
- The 18 Nov roles decision is now marked as superseded by the new one.

## Why

In Lecture 5 the lecturer says he is the Product Owner for the class. The 18 Nov decision had given that role to Liza by mistake.

## Who did what

| Person | Part |
|---|---|
| Joseph Etse | Spotted the error and confirmed the new roles |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| Decision and change file | Claude Code | Found the Lecture 5 statement and drafted both files | Joseph confirmed the role change |

## How to check it

`python3 scripts/index.py --check` passes. The 18 Nov decision's status points to the new file.
