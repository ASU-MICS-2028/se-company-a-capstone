---
title: Five product concept drafts, Scrum board and logo prompt
date: 2026-11-15
owner: Joseph Etse
contributors: []
issue: "#1"
pr: ""
ai_used: yes
---

# Five product concept drafts, Scrum board and logo prompt

## What changed

- Five full proposal drafts in `docs/proposal/drafts/`: Twɛn, Kanea (Dumsor Radar), Cassava Check, Trotro Voice and MoMo Shield.
- `docs/proposal/drafts/README.md`, which compares the five concepts and gives a recommendation.
- `docs/brand/logo-prompt.md`, an image-model prompt and redraw steps for the logo (#4).
- A GitHub Project, "Nyansapo Systems Capstone" (org project 1), with issues #1–#18 added and linked to the repo.
- A concept board for the vote: https://claude.ai/artifact/5wHXUnu6SjjY2VADK9ESKE (private; share it from its Share menu).

## Why

#1 needs three to five candidates compared before the team votes. The proposal was due on 14 Nov, so full drafts let us submit the day after the vote.

## Who did what

| Person | Part |
|---|---|
| Joseph Etse | Asked for the concepts, and owns this change and its review |

## AI use

| Part | Tool | What the AI did | What a person checked |
|---|---|---|---|
| Concept choice | Claude Code (Opus) | Proposed the five concepts from the brief, the rubric, the instructor's research area and our Prosit work. Checked that each data source exists. | Not yet: the team votes on the concepts |
| Proposal drafts | Claude Code subagents | Researched and wrote each draft, citing only sources they opened. They dropped any figure they could not verify. | **Not yet.** Check every [n] citation before submitting |
| Comparison and recommendation | Claude Code | Wrote the table and the recommendation | Not yet |
| Logo prompt | Claude Code | Wrote the image prompt and the redraw steps | Not yet |
| Project board | Claude Code via `gh` | Created the project and added the issues | Joseph ran `gh auth refresh -s project` |

## How to check it

Open each draft and follow its Sources list. Open the board at https://github.com/orgs/ASU-MICS-2028/projects/1. Then run `python3 scripts/index.py --check`.
