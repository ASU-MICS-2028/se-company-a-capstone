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
- **Web booking** ([#58](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/58)): a `web` channel, a public join (`POST /clinics/{clinicId}/web-tickets`) and a public status read for the patient page (`GET /web-tickets/{ticketId}`), both rate-limited. One active ticket per phone, whichever channel issued it, so `createTicket` (desk) can now answer 409 too.
- **Grace window:** a new clinic's `graceMinutes` starts at 20.
- **Health:** the 503 now has a body (`database: down`), matching what the backend scaffold returns (#49, PR #65).
- **Lint:** no warnings. Two deliberate ignores, each with its reason, in `.redocly.lint-ignore.yaml`.
- **From Joseph's review and the survey (#69), 28 Nov:**
  - Override reasons are a fixed list: `pregnant`, `older_person`, `disability`, `emergency`, `correction`. `correction` needs a note.
  - A new `POST /tickets/{ticketId}/recall` takes a patient who missed their call back to `arrived`, behind everyone who is there now. New event type `recalled`.
  - `PublicTicket` carries `travelBand`, so the patient page can say when to leave.
  - The web join takes Ghana numbers only (`+233` and nine digits). The masking rule and the rate-limit keys are written down.
  - The desk 409 names the existing ticket (`ticketId`, `code`). The web 409 still says nothing.
  - A web ticket's page returns 404 from midnight after its day.

Also four decisions (arrival before calling; freezing at v0.2; web phone numbers are unverified; fixed priority reasons and recall) and one learning (the GSM alphabet).

## Why

Eric's review of #43 found that the draft would call patients who are still travelling, and that it had no way to set staff on duty, show SMS failures, or attribute overrides. See [#44](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/44) and the [arrival decision](../decisions/2026-11-24-patients-arrive-before-they-are-called.md). Web booking came back as a Must in #58 (team decision, 24 Nov), so the contract needed a public way in.

## Who did what

| Person | Part |
|---|---|
| Joseph Etse | v0.1 draft: structure, endpoints, schemas. The web booking scope change (#58) and the outline of its two endpoints |
| Eric Sunu | Review of v0.1 (state order, polling, callback secret, predictor port, and the seven gaps v0.2 closes). Final check of v0.2: not yet done |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| v0.2 edits to `openapi.yaml` | Claude Code | Applied Eric's review points, wrote the state table, hold window, SMS mapping and repeat rules, and ran Redocly | not yet checked |
| Web booking endpoints | Claude Code | Wrote both endpoints from Joseph's outline. Chose: a 409 that reveals nothing about the existing ticket, `Idempotency-Key` on the join, 404 for non-web ids on the public read, rate limits kept out of the contract, and the one-ticket-per-phone rule across channels (so the desk endpoint can now return 409) | not yet checked |
| Decision and learning files | Claude Code | Drafted them from Eric's review notes and the proposal | not yet checked |
| Review changes (28 Nov) | Claude Code | Applied Joseph's review of #55: reason list, recall move and where a recalled ticket lands, `travelBand`, Ghana-only web phones, masking rule, rate-limit keys, desk 409 with the ticket id, 404 after the day. Checked the new rules with a schema validator (16 cases) | not yet checked |

## How to check it

```bash
pnpm --package=@redocly/cli@1.25.0 dlx redocly lint docs/architecture/openapi.yaml
```

You should see "Your API description is valid" and "2 problems are explicitly ignored", with no warnings. CI runs the same check with `npx`.
