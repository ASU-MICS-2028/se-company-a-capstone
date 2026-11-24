---
title: API contract v0.2, ready to freeze
date: 2026-11-24
owner: Eric Sunu
contributors: Joseph Etse (v0.1 draft)
issue: "#44"
pr: "#55"
ai_used: yes
---

# API contract v0.2, ready to freeze

## What changed

`docs/architecture/openapi.yaml` moves from Joseph's v0.1 draft to v0.2:

- **Ticket states** reordered so a patient arrives before being called: `waiting → notified → arrived → called → seen`. `call-next` only calls arrived patients. A state table says which moves are allowed and who makes them.
- **Hold window:** a new `holdUntil` on each ticket and `graceMinutes` on the clinic. The board shows late patients; staff decide on no-shows.
- **Staff on duty** can be set with a new `PATCH /clinics/{clinicId}`.
- **SMS delivery state** (`smsStatus`) on each ticket, with the mapping from Africa's Talking delivery reports.
- **Audit:** every event carries `actorId`, the staff user who acted.
- **Safe to repeat:** every staff write takes an `Idempotency-Key`, and repeating a move the ticket already made returns 200, not 409.
- **Ticket codes** have a stated format and a daily counter.
- **USSD replies** have a 160-character limit, menus use GSM-safe text, and patients can cancel by USSD.
- **Gateway secret** must never reach a log.
- **Lint:** no warnings. Two deliberate ignores, each with its reason, in `.redocly.lint-ignore.yaml`.

Also two decisions (arrival before calling; freezing at v0.2) and one learning (the GSM alphabet).

## Why

Eric's review of #43 found that the draft would call patients who are still travelling, and that it had no way to set staff on duty, show SMS failures, or attribute overrides. See [#44](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/44) and the [arrival decision](../decisions/2026-11-24-patients-arrive-before-they-are-called.md).

## Who did what

| Person | Part |
|---|---|
| Joseph Etse | v0.1 draft: structure, endpoints, schemas |
| Eric Sunu | Review of v0.1, the v0.2 design choices, final check |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| v0.2 edits to `openapi.yaml` | Claude Code | Applied Eric's review points, wrote the state table, hold window, SMS mapping and repeat rules, and ran Redocly | not yet checked |
| Decision and learning files | Claude Code | Drafted them from Eric's review notes and the proposal | not yet checked |

## How to check it

```bash
pnpm --package=@redocly/cli@1.25.0 dlx redocly lint docs/architecture/openapi.yaml
```

You should see "Your API description is valid" and "2 problems are explicitly ignored", with no warnings. CI runs the same check with `npx`.
