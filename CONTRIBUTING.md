# Contributing

How Nyansapo Systems works. Using a coding assistant? It follows [AGENTS.md](AGENTS.md), which builds on this file.

## The one rule: write it down, small and plain

Each of us owns a part, and the rest of the team relies on what you write about it. So write every change, decision and lesson as its own **small file**, in plain words, for a teammate who wasn't there. If someone has to ask you how your part works, the file wasn't clear enough. Fix the file, not just the answer.

## Where things go

| You have… | Put it in… | File name | Template |
|---|---|---|---|
| A task | A **GitHub issue** + `plans/` | `plans/<issue>-<slug>.md` | [plans/TEMPLATE.md](plans/TEMPLATE.md) |
| A change (code, docs, diagram, paper, slides) | `changes/` | `YYYY-MM-DD-<slug>.md` | [changes/TEMPLATE.md](changes/TEMPLATE.md) |
| A decision | `decisions/` | `YYYY-MM-DD-<slug>.md` | [decisions/TEMPLATE.md](decisions/TEMPLATE.md) |
| A fact, concept or procedure from the course | `knowledge/` | `<idea>.md` | [knowledge/TEMPLATE.md](knowledge/TEMPLATE.md) |
| Something we learned by doing | `learnings/` | `<lesson>.md` | [learnings/TEMPLATE.md](learnings/TEMPLATE.md) |
| A deliverable (proposal, diagrams, test plan…) | `docs/<area>/` | Your choice | [docs/README.md](docs/README.md) |

**One idea per file.** If a file needs two headings for two ideas, it should be two files that link to each other with relative markdown links: `[Idempotency keys](idempotency-keys.md)`. Those links work on GitHub and in Obsidian, so you can open the repo as an Obsidian vault.

**Each folder's `index.md` is generated.** Never edit it by hand. Run `python3 scripts/index.py` after adding files. If git reports a conflict in an `index.md`, take either side and rerun the script.

## The flow

1. **Pick an issue.** Assign yourself and add `status: in progress`. Check its "Depends on" first. If a dependency isn't done, work against a mock or stub of its contract, or comment and add `status: blocked`.
2. **Set the plan's** `owner` and `status: in-progress`.
3. **Branch** off an up-to-date `main`: `<issue>-<short-name>`, e.g. `7-api-contract`.
4. **Work in small steps.** Test each one, including how it can fail.
5. **In the same PR, add:**
   - a `changes/` file: what changed, who was in charge, who helped, and **exactly how AI was used** (or "None.")
   - a `decisions/` file for each decision you made
   - `learnings/` notes for anything the team should remember
   - updates to the plan's `Done when` boxes and `Log`
   - regenerated indexes: `python3 scripts/index.py`
6. **Open a PR** that says `Closes #<issue>`. One teammate reviews, then we squash-merge.
7. When the issue closes, set the plan's `status: done`.

## AI use

AI is allowed, and must be declared (brief, section 7). We declare it per change in `changes/`: which tool, what part, what the AI did, and what a person checked or changed. The paper's AI Use Declaration is compiled from these files, so vague entries like "used AI for help" will be sent back.

## Ground rules

- **The repo is public.** No secrets, keys, passwords, student IDs, phone numbers or personal emails. Never commit `.env`.
- **No real personal data.** Use synthetic or properly licensed data, and document where it came from.
- **What is decided stays decided.** To change a decision, write a new decision file that supersedes it.
- **Honour Code.** Collaboration stays inside Nyansapo Systems. Declare any cross-group help in `changes/`.
