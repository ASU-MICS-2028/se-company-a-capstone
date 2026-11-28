---
title: A patient must arrive before being called, and a late patient is held by staff, never dropped automatically
date: 2026-11-24
status: proposed
deciders: Eric Sunu (#7), for review by Joseph Etse, Kobina Opei Jr. and Henry Kofi Brandoh
issue: "#44"
ai_used: yes
---

# A patient must arrive before being called, and a late patient is held by staff, never dropped automatically

## Context

The v0.1 draft (#43) had the states `waiting → notified → called → arrived → seen`. That fits a waiting room, where everyone is present. Twɛn's patients wait at home or at the market and travel in after the "come now" SMS. Calling a ticket before the patient is in the building wastes the nurse's call, and the patient would then be marked a no-show for being on a trotro. The proposal's use case also has check-in before the consultation, and step 6 says that when the SMS goes out late, the nurse holds the patient's place rather than marking a no-show.

## Decision

- The normal path is `waiting → notified → arrived → called → seen`. `call-next` takes the first **arrived** ticket in calling order. Tickets ahead of it that are still travelling keep their place.
- Desk tickets start as `arrived`, unless the patient leaves and comes back on the SMS (`waitOffSite: true`).
- A notified patient's place is held until `holdUntil`: when the SMS was sent, plus the top of their travel band, plus the clinic's `graceMinutes`. It counts from sending, not queueing, so a delayed text never costs the patient time.
- After `holdUntil` the board shows the ticket as late. Marking a no-show stays a staff decision. The system never does it.

## Options we rejected

- **Keep v0.1's order:** staff would call people who are not there, and every slow trotro becomes a no-show.
- **Drop late patients automatically:** simpler to build, but it punishes the patient for our SMS delays and for transport, which finding F2 says patients don't control. Priority and removal stay with staff, as the proposal promises.
- **Count the hold from when the SMS was queued:** if the provider is down for 20 minutes, the patient loses those 20 minutes.

## Consequences

- The board needs a "late" marker and must show delayed or failed SMS (`smsStatus`).
- Arrival must be recorded at the desk, so check-in is one tap on the board.
- `holdUntil` and `graceMinutes` are new fields in the contract (v0.2). The backend (#50) computes them; the paper can measure how often staff hold a place.

## AI use

Claude Code drafted this record from Eric's review notes on #43 and the proposal's use case. Eric chose the state order during review planning. The hold window formula and `waitOffSite` are Claude Code's proposals, which Eric has not yet reviewed.
