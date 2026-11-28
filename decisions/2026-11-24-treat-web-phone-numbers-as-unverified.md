---
title: Treat phone numbers from the web page as unverified
date: 2026-11-24
status: proposed
deciders: Eric Sunu (#7), for review by Joseph Etse and Kobina Opei Jr. in PR #55
issue: "#44"
ai_used: yes
---

# Treat phone numbers from the web page as unverified

## Context

Web booking is a Must again ([#58](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/58)), and a web ticket should behave like a USSD ticket, with one active ticket per phone. On USSD the mobile network supplies the caller's number, so we know who holds the phone. On the web, anyone can type any number, and the page has no login.

## Decision

The API treats a phone number typed on the web as unverified:

- If the number already has an active ticket, the join is refused with 409, and the reply says nothing about that ticket. The patient finds their ticket by USSD ("Check my ticket"), where the network proves the number.
- The join accepts an `Idempotency-Key`. The page makes one key per form submission and reuses it when retrying, so a reply lost on a weak network returns the same ticket instead of the 409.
- The public status read only shows a web ticket, by its random id, and never the full phone number. From midnight after the day the ticket was issued, it returns 404.
- Added 28 Nov from Joseph's review: the web join accepts Ghana mobile numbers only (`+233` and nine digits), because every number it accepts gets texted, and an open number field invites SMS pumping (fake joins that make us pay for texts). It is rate-limited per client IP and per phone, with a daily cap per clinic. The desk, where staff are signed in, gets a 409 that names the existing ticket, so staff can cancel a ticket made with a stranger's number.

## Options we rejected

- **Return the existing ticket, as USSD does:** anyone could look up a stranger's place in the queue by typing their number.
- **Verify the number with an SMS code first:** safer, but it adds a second step, a second SMS per join, and more to build before 10 Dec. It is the next step if fake tickets become a problem.

## Consequences

- Someone can still join with another person's number or add fake tickets. Rate limits (#59) slow this down, and staff can cancel.
- The same rule covers desk tickets, so `createTicket` can now return 409 for a phone that is already in the queue.
- **Accepted risk:** even the silent 409 tells someone who types a number that this phone is in today's queue at this clinic. That is a small health-related leak. We accept it for the demo, because the reply names no ticket and the rate limits slow down guessing. It is raised on #11 for the risk register.
- The daily cap means a flood of fake joins can close the web join for the rest of the day. USSD and the desk still work.
- The paper should say plainly that web phone numbers are not verified.

## AI use

Claude Code drafted this decision and the options while adding web booking to the contract. Eric's check: not yet done.
