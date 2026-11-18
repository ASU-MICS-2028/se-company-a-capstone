---
title: Twɛn project proposal submitted (Milestone 1)
date: 2026-11-15
owner: Joseph Etse
contributors: []
issue: "#1"
pr: "#23"
ai_used: yes
---

# Twɛn project proposal submitted (Milestone 1)

## What changed

We submitted the 4-page proposal as a PDF on 15 Nov 2026 at 19:23, before the 23:59 deadline. The working copy is the Word file in the team Google Drive, at `SE-Group-A/docs/proposal/`. The proposal contents:

- All ten sections from the brief.
- An architecture and data-flow diagram (Figure 1).
- A research question: can a learned wait-time model beat an M/M/c queueing baseline, and can adaptive SMS timing reduce waiting at the clinic without increasing missed turns?

## Why

Milestone 1 of the brief, worth 10 points. The rubric requires the proposal to be approved before implementation begins.

## Who did what

| Person | Part |
|---|---|
| Joseph Etse | Reviewed and edited the proposal, chose the font (Poppins) and submitted it |

## AI use

| Part | Tool | What the AI did | What a person checked |
|---|---|---|---|
| Draft | Claude Code | Turned the Twɛn concept draft into the proposal | Joseph reviewed and edited it |
| Citations | Claude Code subagent | Opened all nine sources and checked each claim, and recomputed the Erlang C and availability figures. It found eight claims that overstated their sources and corrected them. It could not open the Act 843 statute page (HTTP 403). | Joseph reviewed the corrected text |
| Rubric pass | Claude Code | Checked the proposal against the submission rubric. Added the research question, named a UX principle for each design decision, and added the architecture diagram and the Ashesi logo. Trimmed it to 4 pages in Poppins. | Joseph reviewed it before submitting |

## Still open

- Copy the instructor's feedback into #1. Implementation waits for his approval.
- Confirm the sections of Act 843 on special personal data and on registration against the statute itself.
- Ask a Twi speaker to confirm the name *Twɛn*.
- The draft in `docs/proposal/drafts/twen-clinic-queue.md` still has the uncorrected wording. The submitted PDF is the version of record.
