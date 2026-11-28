---
title: Priority moves use a fixed list of reasons, and a missed call puts the patient back in line
date: 2026-11-28
status: proposed
deciders: Eric Sunu (#7), from Joseph Etse's review of PR #55, for review by Kobina Opei Jr. and Henry Kofi Brandoh
issue: "#44"
ai_used: yes
---

# Priority moves use a fixed list of reasons, and a missed call puts the patient back in line

## Context

The survey results (#69) changed two board rules before the contract freezes:

- **F12:** 2 of 3 patients want priority decided by fixed rules, and staff would reject a system that breaks the clinic's queueing rules. The contract's override reasons (`priority`, `emergency`, `correction`, `other`) were not a fixed list: `priority` and `other` could mean anything.
- **F13 and B6:** today a called patient who is not there is "called again later" (2 answers) or their folder goes to the back (1). The contract had no move back from `called`, so the only choice was a no-show, which closes the ticket.

Both are cheap to change now and breaking after the freeze, because the board (#10) and the backend (#8) build on them.

## Decision

- **Override reasons** are `pregnant`, `older_person`, `disability`, `emergency` and `correction`. `correction` (fixing a staff mistake) needs a note, or the request is refused with 422. The first three come from F12 plus `disability`, which Joseph added in his review.
- **Recall:** a new staff move, `POST /tickets/{ticketId}/recall`, takes a `called` ticket back to `arrived`, behind every ticket that is `arrived` at that moment. Staff call the patients who are present, then this patient again. Staff can recall more than once, or mark a no-show instead. Each recall is a `recalled` event.

## Options we rejected

- **Keep `other` with a free-text note:** it lets any move through under a vague label, which is what F12 says patients don't want.
- **Make the reasons a clinic setting:** more flexible, but one clinic doesn't need it, and a fixed enum gives the board a fixed menu.
- **Reuse `/arrived` for recall:** the "safe to repeat" rule makes `arrived` on a `called` ticket a no-op, so a retried check-in tap can't be told apart from a recall.
- **Recall keeps the ticket's place:** it would still be the first arrived ticket, so the next call-next would call the same absent patient.
- **Recall sends the ticket to the back of the whole queue:** that is the minority answer (1 of 3), and it punishes a patient who stepped out for a minute.
- **Leave recall out of scope:** staff would have to mark a no-show and issue a new ticket at the back, which loses the patient's place and breaks fairness.

## Consequences

- Reasons such as `pregnant` and `disability` are queue categories, not diagnoses. They appear only on staff endpoints and in the event log, never on the patient page, USSD or SMS. The paper should say so, since the event log is also evaluation data.
- `recall`, like `call-next`, is not repeatable by nature, so the board sends a fresh `Idempotency-Key` for each tap.
- A ticket's `position` and `predictedWait` come back after a recall, and `calledAt` holds the latest call.
- Kobina's board (#67) needs the new reason list and a recall button. His patient page (#68) is not affected by this decision.

## AI use

Claude Code drafted this decision and the contract edits from Joseph's review and the survey findings, and checked the new rules with a schema validator. Eric's check: not yet done.
