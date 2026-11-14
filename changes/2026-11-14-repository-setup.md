---
title: Set up the repository, issues, plans and knowledge base
date: 2026-11-14
owner: Joseph Etse
contributors: none
issue: "#3, #17"
pr: "none (initial commit)"
ai_used: yes
---

# Set up the repository, issues, plans and knowledge base

## What changed

- Folder structure: `plans/`, `changes/`, `decisions/`, `knowledge/`, `learnings/`, `docs/`, each log folder with a `TEMPLATE.md` and a generated `index.md`.
- `scripts/index.py` builds the indexes; `tests/test_index.py` tests it; CI runs both on every PR.
- 18 GitHub issues (#1-#18), each with a plan file; workstream labels; milestones M1 (14 Nov), M2 (10 Dec), M3 (18 Dec).
- Issue and PR templates; `AGENTS.md` for coding assistants; `CONTRIBUTING.md` for people.
- The first knowledge base: atomic notes from lectures 1-13, course documents, readings, and our Prosit work.

## Why

See [decisions/2026-11-14-issues-and-atomic-files.md](../decisions/2026-11-14-issues-and-atomic-files.md) and [decisions/2026-11-14-independent-workstreams.md](../decisions/2026-11-14-independent-workstreams.md).

## Who did what

| Person | Part |
|---|---|
| Joseph Etse | Defined how we work (issues, atomic files, AI logging, independent workstreams), reviewed the setup |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| Structure, templates, AGENTS.md, CONTRIBUTING.md | Claude Code | Drafted from Joseph's description and the conventions in our earlier group repos | Joseph reviewed |
| `scripts/index.py` and its tests | Claude Code | Wrote the script and the tests | Tests run locally and in CI |
| Issues #1-#18 and plans | Claude Code | Derived the tasks from the brief, the rubric and the milestones | Team to confirm at Sprint 1 planning (#3) |
| `knowledge/` and `learnings/` notes | Claude Code (parallel helpers) | Summarised the lecture transcripts, course PDFs, readings and our Prosit deliverables into atomic notes | **Not yet reviewed.** Each owner checks the notes for their workstream (#17) |

## How to check it

```bash
python3 scripts/index.py --check
python3 -m unittest discover -s tests
```

Both should finish without errors. Open `knowledge/index.md` to browse the notes.
