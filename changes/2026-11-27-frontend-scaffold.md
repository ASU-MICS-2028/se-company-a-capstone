---
title: Set up the frontend app (React, TypeScript, Vite)
date: 2026-11-27
owner: Kobina Opei Jr.
contributors: none
issue: "#10"
pr: "#<PR number, once open>"
ai_used: yes
---

# Set up the frontend app (React, TypeScript, Vite)

## What changed

- New `frontend/` folder: a React + TypeScript app made with the Vite template, as the [frontend decision](../decisions/2026-11-16-frontend-typescript-vite.md) says.
- The four scripts CI looks for: `lint`, `typecheck`, `test` and `build`, plus a committed `package-lock.json`, so the `code / frontend` CI job now really runs.
- Tests use Vitest and Testing Library. One first test checks the page heading.
- `src/styles/tokens.css` holds the colours, fonts and corners from the approved hi-fi prototypes.
- Fonts are bundled with the app instead of loaded from Google ([decision](../decisions/2026-11-27-bundle-fonts-with-the-app.md)).
- A placeholder start page. No real screens yet: they come in the next PRs.

## Why

Step 1 of the #10 plan ("Scaffold"). Everything else in the frontend builds on it, and a small first PR is easy to review.

## Who did what

| Person | Part |
|---|---|
| Kobina Opei Jr. | Owns #10, set the step order, and reviews and merges |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| Scaffold, scripts, tokens, test, README | Claude Code | Ran the Vite template, added Vitest and the CI script names, copied the colour and font values from the prototypes into `tokens.css`, wrote the first test and the README | Not yet checked |
| Font decision | Claude Code | Proposed bundling the fonts and drafted the decision file | Not yet checked |

## How to check it

```bash
cd frontend
npm ci
npm run lint && npm run typecheck && npm test && npm run build
npm run dev
```

All four checks pass, the test says `1 passed`, and the dev page shows "Twɛn" in the serif logo font on a light grey page.
