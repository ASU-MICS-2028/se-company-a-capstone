---
title: "Patient web page: join today's queue, then a ticket page that says when to leave"
date: 2026-11-27
owner: Kobina Opei Jr.
contributors: none
issue: "#10"
pr: "#68"
ai_used: yes
---

# Patient web page: join today's queue, then a ticket page that says when to leave

## What changed

- **`/join`**, built from prototype P03 but cut to what contract v0.2 supports:
  - the phone number, which accepts `024 555 0147`, `0245550147` or `+233…` and is sent as `+233…`
  - "How long does it take you to get here?" with four choices
  - a one-line consent
  - EN / Twi in the corner, which sets the language of the texts
  - no login, and no health questions
- **`/ticket/:id`** (P05, P06, P11 to P13):
  - while waiting, a big **"Leave home around HH:MM"**: the start of the expected range minus the top of the travel band, so a patient who follows it arrives early, not late. No count of people ahead (team decision, 27 Nov).
  - then "Leave now" (with the time the place is held), "You're checked in", "Go to the desk now", "You've been seen", "You missed your turn", or "Cancelled"
  - it refreshes every 30 s, as the contract asks, and stops once the visit is over. If a refresh fails, it keeps the last ticket and says so.
- **Safe to retry:** one idempotency key per filled-in form. If the answer is lost, pressing the button again returns the same ticket, not a second one, and the error message says so.
- **Errors in plain words:** the phone already has a ticket (409, using the contract's own wording), too many tries (429), no connection.
- **Mock:** `joinFromWeb` and `getWebTicket`. Full phone numbers stay inside the mock and never appear on a ticket. A USSD or desk ticket id answers 404.
- **Colour:** white text on ember `#D9480F` is only 4.3:1, which fails WCAG AA for normal text. So the "Leave now" card uses a slightly darker ember, `#C2410C` (5.2:1). It is a new token, `--color-urgent-strong`.

Left out because the contract doesn't support them yet: booking another day, the 2-week calendar, choosing a service, the SMS code, "Find my booking", "I've arrived" by the patient (staff check patients in), and "Rejoin". Twi screens wait for a translator. The toggle already sets the language of the texts, which falls back to English until the Twi templates exist.

## Why

Step 5 of the #10 plan. The scope cut keeps one patient web page: join, then ticket status.

## Who did what

| Person | Part |
|---|---|
| Kobina Opei Jr. | Owns #10 and the patient-flow decisions (travel time, no people-ahead count, English default with a toggle), reviews and merges |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| Join and ticket pages, styles | Claude Code | Built them from the P03, P05, P06 and P11 to P13 prototypes, cut to contract v0.2 | Not yet checked |
| Leave-time rule | Claude Code | Proposed "start of the range minus the top of the band" | Not yet checked |
| Mock patient endpoints | Claude Code | Wrote them from the contract's `joinFromWeb` and `getWebTicket` | Not yet checked |
| Tests (38 new, 104 in all) | Claude Code | Wrote tests for phone parsing, the leave time, every ticket state, 409, 429, a lost answer and keyboard-only use | Not yet checked |
| Contrast fix | Claude Code | Measured the contrast and picked the darker ember | Not yet checked |

## How to check it

```bash
cd frontend
npm ci
npm run lint && npm run typecheck && npm test && npm run build
npm run dev   # open http://localhost:5173/join on a phone-sized window
```

Tests end with `104 passed | 3 skipped`. On the page: press "Get my ticket" with nothing filled in and three plain messages appear, with focus on the phone field. Fill it in, choose "Under 15 min", tick the box and send: you get a ticket like `B-015` and "Leave home around HH:MM".
