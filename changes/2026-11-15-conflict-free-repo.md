---
title: Conflict-free workflow, with indexes built by a bot on main
date: 2026-11-15
owner: Joseph Etse
contributors: []
issue: "#21"
pr: ""
ai_used: yes
---

# Conflict-free workflow, with indexes built by a bot on main

## What changed

- New `.github/workflows/indexes.yml`. After every merge to `main` it rebuilds the indexes and commits them.
- `checks.yml` now fails any PR that edits an `index.md`.
- `scripts/index.py --check` validates front matter only, and the tests are updated to match.
- New rules in CONTRIBUTING.md, AGENTS.md, the PR template, the README and the plan template: one writer per file, plans edited only by their owner, progress in issue comments, long documents as one file per section.

## Why

Joseph chose atomic files to avoid merge conflicts entirely. The generated indexes were the last file every PR touched. See [the decision](../decisions/2026-11-15-no-shared-files-in-prs.md).

## Who did what

| Person | Part |
|---|---|
| Joseph Etse | Set the goal of zero merge conflicts |

## AI use

| Part | Tool | What the AI did | What a person checked |
|---|---|---|---|
| Workflow, script, tests and rules | Claude Code | Found the conflict sources, wrote the bot workflow and the CI guard, changed the check mode, and rewrote the rules | Not yet checked |

## How to check it

1. Open two PRs that each add a `changes/` file, and merge both. Neither should conflict.
2. After each merge, a "Rebuild indexes [bot]" commit should appear on `main`.
3. Add an `index.md` edit to a PR. CI should fail.
