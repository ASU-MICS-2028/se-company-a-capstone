---
title: License the repo under MIT
date: 2026-11-24
status: proposed
deciders: Eric Sunu (#7). Suggested by a teammate in the team chat on 24 Nov; the team confirms it by reviewing PR #61
issue: "#60"
ai_used: yes
---

# License the repo under MIT

## Context

The repo is public, but it has no licence. Without one, the default is "all rights reserved": others may read the code but have no right to reuse it. The API contract's linter also warns that the contract names no licence (see `.redocly.lint-ignore.yaml` in PR #55).

## Decision

Use the MIT licence for the whole repo, added in its own small PR. The copyright line reads "Nyansapo Systems" unless the team prefers another holder.

## Options we rejected

- **No licence:** nobody may reuse the work, which defeats publishing it.
- **Apache 2.0:** adds a patent grant and notice rules that a course project doesn't need.
- **GPL 3.0:** forces anyone who reuses it to publish their changes. Heavier than we need.

## Consequences

- Anyone may reuse the code and documents if they keep the notice. There is no warranty.
- Once this merges, the contract gets `info.license` (MIT) and its lint ignore goes, as a non-breaking 0.2.x change.
- Not checked: whether Ashesi has a rule about licensing coursework. Ask before merging.

## AI use

Claude Code drafted this file and fetched the standard MIT text from GitHub's licence list. Eric's check: not yet done.
