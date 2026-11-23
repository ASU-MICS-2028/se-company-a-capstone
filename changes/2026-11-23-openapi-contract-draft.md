---
title: OpenAPI contract draft v0.1
date: 2026-11-23
owner: Eric Sunu
contributors: Joseph Etse
issue: "#7"
pr: ""
ai_used: yes
---

# OpenAPI contract draft v0.1

## What changed

Added `docs/architecture/openapi.yaml`, an OpenAPI 3.1 draft scoped to the Musts in the proposed scope cut:

- Desk tickets, plus the USSD callback in Africa's Talking format, with a menu that asks for the patient's travel-time band.
- The staff board: the queue, call-next, arrived, seen, no-show, a staff override with a required reason, and cancel.
- An append-only event log the board can poll.
- The SMS delivery-report callback for the outbox.
- A health check.
- Predicted waits always returned as a range, and the method that produced them (`mmc`, `naive` or `gbm`).
- Phone numbers are never returned in full.
- `PUT /clinics/{id}/status` ("is the prescriber in", finding F1) is designed now, marked `x-scope: should`, and built only if there's time.

Redocly lint: valid, with 2 minor warnings.

## Why

The contract unblocks the backend (#8), the frontend (#10) and the model interface (#9). Sprint 2 backlog item 5.

## Who did what

| Person | Part |
|---|---|
| Eric Sunu | Owns the contract. Reviews, changes and freezes it. |
| Joseph Etse | Asked for the draft |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| Contract | Claude Code | Drafted the endpoints and schemas from the proposal, the scope-cut decision and findings.md, and linted the file | Eric reviews before it is frozen |

## How to check it

Run `npx @redocly/cli lint docs/architecture/openapi.yaml`. It should say the file is valid. Paste it into editor.swagger.io to browse it.
