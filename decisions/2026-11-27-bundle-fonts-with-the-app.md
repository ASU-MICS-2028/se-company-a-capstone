---
title: Bundle the fonts with the frontend instead of loading them from Google Fonts
date: 2026-11-27
status: proposed
deciders: Kobina Opei Jr.
issue: "#10"
ai_used: yes
---

# Bundle the fonts with the frontend instead of loading them from Google Fonts

## Context

The approved prototypes use three Google fonts: Instrument Serif (the wordmark), Plus Jakarta Sans (the interface) and JetBrains Mono (tickets, times, phones). The prototypes load them from `fonts.googleapis.com`. The staff board should keep working on a weak or lost network, and the patient page should not send patients' browsers to a third party.

## Decision

Install the fonts as npm packages (`@fontsource/*`) and let Vite bundle them into the app.

## Options we rejected

- **Load from Google Fonts:** one line of HTML, but the board falls back to system fonts offline, and every page load tells Google which patient opened the page.
- **Download the font files by hand:** works the same, but updates are manual and the licence files are easy to lose. The npm packages carry the licences (all three are under the SIL Open Font Licence).

## Consequences

- The build is about 300 kB bigger, cached after the first visit.
- Only the weights we use are imported, in `frontend/src/fonts.ts`. A new weight means one new import line there.

## AI use

Claude Code proposed this and drafted the record. Kobina accepts or rejects it in the PR review.
