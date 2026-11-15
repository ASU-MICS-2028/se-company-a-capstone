---
title: No shared files in pull requests, so merges never conflict
date: 2026-11-15
status: accepted
deciders: Joseph Etse
issue: "#21"
ai_used: yes
---

# No shared files in pull requests, so merges never conflict

## Context

We chose atomic files ([issues and atomic files](2026-11-14-issues-and-atomic-files.md)) so that six people can work at once without merge conflicts. But every PR still regenerated the shared `index.md` files, so any two open PRs conflicted. PRs #19 and #20 both did. Edits to other people's plans and to single large documents would have caused the same problem.

## Decision

Every file has one writer at a time:
- **Indexes.** A GitHub Action rebuilds every `index.md` on `main` after each merge. CI rejects any PR that edits one.
- **Plans.** Only the issue owner edits a plan. Progress notes go in issue comments.
- **Long documents.** The proposal, the paper and the docs are split into one file per section, each with one owner.
- **Root files.** These change only in their own small PR, merged the same day.

## Options we rejected

- **Keep committing the indexes and "take either side, then rerun the script".** It still conflicts. It is just easy to fix.
- **Don't track the indexes at all.** Then the folder views on GitHub lose their table of contents.
- **A git merge driver for the indexes.** Each person would have to configure it locally, and GitHub's web merge ignores it.

## Consequences

- Right after a merge, the index on `main` lags the new file by about a minute, until the bot commits.
- `scripts/index.py --check` now validates front matter only. It no longer checks whether an index is stale.
- The bot needs `contents: write`. If the org caps the workflow token at read-only, the indexes stop updating, and the fix is to allow write in the repo's Actions settings.
