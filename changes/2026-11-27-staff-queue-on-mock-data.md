---
title: Staff queue screen, running on mock data that follows the API contract
date: 2026-11-27
owner: Kobina Opei Jr.
contributors: none
issue: "#10"
pr: "#66"
ai_used: yes
---

# Staff queue screen, running on mock data that follows the API contract

## What changed

- **One data module** (`frontend/src/api/client.ts`). Screens call `api.getQueue(...)` and never fetch for themselves. Today `api` is a mock. When the backend is ready (#18), only this file changes.
- **Mock backend** (`frontend/src/api/mock.ts`, `mockData.ts`): 14 made-up tickets for one morning, with every status the board shows. It answers like contract v0.2: active tickets by default, calling order, 404 for an unknown clinic, masked phones, a wait range rather than a single time, and a `holdUntil` only after a text was sent.
- **Types generated from the contract** (`schema.d.ts`), so TypeScript stops us if a screen uses a field the contract doesn't have.
- **A contract test** validates every mock ticket and the clinic against the contract's own schemas. It skips itself until v0.2 (PR #55) is on `main`.
- **The live queue screen** at `/staff`: ticket number, masked phone, channel tag (USSD, Web, Walk-in), expected time range and status, with status filter buttons that show counts, and a channel filter. It warns "Text failed" or "Late" under a ticket, so staff hold the place. It handles loading, an error with "Try again", an empty filter, and a failed refresh (it keeps the last list and says when it is from).
- **Accessibility from the start:** a real table with a caption and row headers, labelled filter, `aria-pressed` on the filter buttons, a skip link, a visible focus ring, and a test that drives it with the keyboard only.
- Status words follow the prototypes ([decision](../decisions/2026-11-27-staff-board-status-words.md)).

## Why

Steps 2 and 3 of the #10 plan, and the 29 Nov goal: one staff screen running on mock data.

## Who did what

| Person | Part |
|---|---|
| Kobina Opei Jr. | Owns #10, chose the step order and the prototype decisions, reviews and merges |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| Data module, mock, seed tickets | Claude Code | Read contract v0.2 in PR #55 and wrote the mock to follow it | Not yet checked |
| Contract test | Claude Code | Wrote a test that validates the mock against the contract with Ajv | Not yet checked |
| Queue screen and styles | Claude Code | Built the screen from the S02 "Live queue" prototype and the tokens | Not yet checked |
| Tests (33, plus 3 contract tests) | Claude Code | Wrote unit and screen tests, including errors, empty lists, a failed refresh, a late answer arriving after a newer one, and keyboard use. Checked that the late-answer test fails if the guard is removed. | Not yet checked |
| Status words decision | Claude Code | Drafted the mapping and the decision file | Not yet checked |

## How to check it

```bash
cd frontend
npm ci
npm run lint && npm run typecheck && npm test && npm run build
npm run dev   # then open http://localhost:5173/staff
```

The tests end with `33 passed | 3 skipped` (the 3 contract tests skip until #55 merges). The screen shows 14 tickets, two "At desk" at the top, then the line by place, then Missed and Done. Click "Arrived" to see 3 rows. Press Tab from the top of the page: the skip link, the menu, then each filter button gets a clear purple ring.
