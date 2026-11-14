---
title: Track work in GitHub Issues and record everything as small linked files
date: 2026-11-14
status: accepted
deciders: Nyansapo Systems (all six)
issue: "#3"
ai_used: yes
---

# Track work in GitHub Issues and record everything as small linked files

## Context

Six people are working in parallel for six weeks. The rubric gives marks for Scrum evidence, documentation, and an AI Use Declaration. In past group work, single shared files (one plan, one notes file) caused merge conflicts, and it got hard to tell who did what and where AI helped.

## Decision

- **Every task is a GitHub issue** with a plan file `plans/<issue>-<slug>.md`. The issue holds the status and discussion; the plan holds the how.
- **Every change** gets its own file in `changes/`, saying who was in charge, who helped, and exactly how AI was used.
- **Every decision** gets its own file in `decisions/`.
- **Knowledge** (what the course taught) and **learnings** (what we found out by doing) are one idea per file, Zettelkasten style, linked to each other.
- Each folder's `index.md` is the main file listing all the others. A script generates it (`scripts/index.py`) and CI checks it, so nobody edits a shared index by hand.

## Options we rejected

- **One big PLAN.md and log file:** constant merge conflicts with six people, and the history is hard to cite.
- **Hand-maintained index files:** they drift out of date and conflict on every PR.
- **Obsidian `[[wikilinks]]`:** GitHub doesn't render them. Ordinary relative markdown links work in both GitHub and Obsidian.

## Consequences

- A PR isn't done until it carries its `changes/` file. The PR template checks for it.
- The AI Use Declaration for the paper can be compiled from `changes/` (column "Ai used").
- Run `python3 scripts/index.py` before pushing. If an `index.md` conflicts, take either side and rerun it.

## AI use

Claude Code drafted this structure, the templates and the index script from Joseph's description of how we want to work. Joseph reviewed it.
