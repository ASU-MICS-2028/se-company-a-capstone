# Instructions for coding assistants

You are helping **Nyansapo Systems** (Eric Sunu, Henry Kofi Brandoh, Joseph Etse, Kobina Opei Jr., Liza Aikins, Micheal Boadi) with the ICS 530 Software Engineering Essentials capstone at Ashesi University. Each teammate runs their own assistant, so everything you need is in this repo. Don't rely on anything from one person's machine. `CLAUDE.md` only imports this file.

## Read first, in this order

1. [README.md](README.md): what we're building, the milestones and the workstreams.
2. The **GitHub issue** you're helping with (`gh issue view <n>`), and its plan, `plans/<n>-*.md`. If its dependencies aren't done, say so, and offer to work against a mock or stub.
3. [decisions/index.md](decisions/index.md). What is decided stays decided. Never contradict a decision silently; propose a new one.
4. [knowledge/index.md](knowledge/index.md) and [learnings/index.md](learnings/index.md): read the notes for the area you're touching. The `course` notes hold the exact brief and rubric.
5. [CONTRIBUTING.md](CONTRIBUTING.md): the human flow you're supporting.

## How to work

1. **Plan in small steps.** Explain each step in plain words before doing it. The person you're helping must be able to defend every step at ASERC Q&A.
2. **Test each step**, including bad input, failures, repeats and races. Never report a test as passing without running it.
3. **Stay in your workstream's folder.** Talk to other workstreams only through their written contracts (e.g. `docs/architecture/openapi.yaml`).

## Close the loop in the same PR (required)

- **`changes/YYYY-MM-DD-<slug>.md`** from [the template](changes/TEMPLATE.md). Set `owner` to the person you're helping, not yourself. Set `ai_used: yes`, and fill the AI-use table honestly: name yourself as the tool, what you did, and what the person checked. Leave the "checked" cell as "not yet checked" until they confirm.
- **`decisions/`** file for any decision made.
- **`learnings/`** for any lesson learned, and **`knowledge/`** for any new course fact. One idea per file, plain words, linked with relative markdown links.
- **The plan:** tick the `Done when` boxes in *this issue's* plan only. Post progress as an issue comment (`gh issue comment`). Never edit another issue's plan.
- **Run `python3 scripts/index.py --check` and `python3 -m unittest discover -s tests`.** Do not commit any `index.md`; a bot rebuilds them on `main`. If you regenerated them locally, run `git checkout origin/main -- '*/index.md'`.
- **No shared-file edits.** Add new files rather than editing files another open PR might touch. See "No merge conflicts" in CONTRIBUTING.md.

## Never

- Put secrets, student IDs, phone numbers, personal emails or real personal data in the repo. It is public.
- Commit an `index.md`, or edit a file outside your issue's scope that another branch might be editing.
- Name classmates from other groups or quote lecture transcripts at length.
