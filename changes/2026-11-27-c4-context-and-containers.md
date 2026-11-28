---
title: C4 level 1 (system context) and level 2 (containers) diagrams
date: 2026-11-27
owner: Eric Sunu
contributors: none
issue: "#48"
pr: "#64"
ai_used: yes
---

# C4 level 1 (system context) and level 2 (containers) diagrams

## What changed

New file `docs/architecture/c4.md` with two Mermaid diagrams that GitHub draws:

- **Figure C4-1, system context:** the patient, clinic staff, Africa's Talking (sandbox) and Twɛn as one box, with eight numbered arrows.
- **Figure C4-2, containers:** inside Twɛn, the patient web page, the staff board, the API, the outbox worker and PostgreSQL 16, with thirteen numbered arrows. Each arrow says what flows and how (USSD callback, SMS send, delivery report, HTTPS JSON, polling `/events`).

Each figure has a key that explains every box and why it is separate, and says what has no box and why. The file ends with what is not drawn yet: level 3 and the deployment view. Also new: the plan for #48, with the level 1 and level 2 boxes ticked.

## Why

#48 needs C4 levels 1 to 3 and the deployment assumptions (rubric: System Design, 8%). Levels 1 and 2 are the Sprint 2 stretch item "First C4 context and container diagrams". They follow the proposals in PRs #55 (contract v0.2), #56 (predictor interface), #57 (style, stack and hosting) and #62 (data model), so they change if those reviews do.

## Who did what

| Person | Part |
|---|---|
| Eric Sunu | Owns #48. The architecture the diagrams show comes from his stack review and the proposals listed above. Final check: not yet done |
| The team | Review the diagrams in the pull request |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| Both diagrams and their keys | Claude Code | Drew them from the scope cut, contract v0.2, the decisions in PR #57, the data model and the predictor interface, and wrote the keys | not yet checked |
| Render check | Claude Code | Rendered both diagrams with the Mermaid CLI (12.2.0, Mermaid 12.3.0) through pnpm, looked at the images for crossing lines, confirmed a deliberately broken copy fails to parse, and viewed the file as GitHub draws it on the branch | not yet checked |
| Plan for #48 and this file | Claude Code | Wrote them | not yet checked |
| Review follow-ups (28 Nov) | Claude Code | From Joseph's review: the worker moves tickets to `notified` (settled by PR #57, so the open question is closed), duplicates from a crash or a timed-out send, one lock mode, the paper chit on the desk arrows (F13) and a desktop browser for the board (F14). Re-rendered both diagrams with Mermaid CLI 12.2.0 | not yet checked |

## How to check it

1. Open `docs/architecture/c4.md` on GitHub. Both diagrams should be drawn, not shown as code.
2. Pick any arrow and find it in the contract (PR #55) or the decisions (PR #57). Each label should match.
3. To check the source locally, run the command under "Editing these diagrams" in `c4.md`. It should print a tick for `c4-1.svg` and `c4-2.svg`.
