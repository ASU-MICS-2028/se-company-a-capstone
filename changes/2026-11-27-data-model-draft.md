---
title: Data model draft, with the ERD and a check script
date: 2026-11-27
owner: Eric Sunu
contributors: none
issue: "#47"
pr: "#62"
ai_used: yes
---

# Data model draft, with the ERD and a check script

## What changed

- **`docs/architecture/data-model.md`** (new) has:
  - the eight PostgreSQL tables, each with a reason for being there: `clinics`, `staff_users`, `service_status` (a Should), `ticket_counters`, `tickets`, `events`, `sms_outbox` and `idempotency_keys`
  - a Mermaid ERD
  - how the database enforces each queue rule
  - a map from every contract field to a column, or to how it is derived
  - ten open questions, each with a proposed answer
- **`docs/architecture/data-model-check.sh`** (new) loads the doc's SQL into PostgreSQL 16 and runs 40 checks, including two-session races.
- A decision: each clinic's events take their `seq` from a counter row, so a higher seq never commits before a lower one.
- A learning about `call-next`. `SKIP LOCKED` removes the wait, and a plain lock already prevents calling a patient twice. The lock should be `FOR NO KEY UPDATE`: `FOR UPDATE` skipped a ticket only because an event about it was being saved. PR #57 says `FOR UPDATE SKIP LOCKED`, so this refines its wording without changing the choice.
- The plan for #47.

## Why

#47 asks for the tables, keys, constraints, indexes and an ERD behind contract v0.2, so the backend (#49 onward) builds on a tested schema. It follows v0.2 as it stands in [PR #55](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/55), and will change if that review changes the contract.

## Who did what

| Person | Part |
|---|---|
| Eric Sunu | Owner. Set the stack and outbox rules this builds on (PR #57). Final check of the tables, the decision and the open questions: not yet done |

## AI use

| Part of the change | Tool | What the AI did | What a person checked or changed |
|---|---|---|---|
| Tables, indexes and constraints | Claude Code | Designed all eight tables from the contract and the proposed decisions. Chose: text with checks instead of enum types, the calling-order key with halfway overrides, a generated `service_day`, codes and `smsStatus` derived instead of stored, the token hash, the append-only trigger, scoped idempotency keys | not yet checked |
| Event seq decision | Claude Code | Proposed the per-clinic counter and wrote the decision record | not yet checked |
| ERD, field map, open questions | Claude Code | Wrote them. The proposed answers to the ten open questions are Claude Code's | not yet checked |
| Check script and learning | Claude Code | Wrote 40 checks, ran them on PostgreSQL 16 in Docker, and corrected its own wrong guess about plain `FOR UPDATE` after the test disproved it. An AI review pass then found the `FOR UPDATE` skip, a halving rule that lost precision, a phone check that blocked open question 8, and paraphrases in quotation marks; all four were fixed and retested | not yet checked |

## How to check it

Start PostgreSQL 16 (the version CI uses), then run the script:

```bash
docker run -d --rm --name twen-pg16 -e POSTGRES_PASSWORD=postgres -p 55432:5432 postgres:16
```

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:55432/postgres sh docs/architecture/data-model-check.sh
```

You should see `--- schema from data-model.md loaded: 8 tables`, 40 lines starting with PASS, and `--- 0 failed`. That is the result on 27 Nov, with PostgreSQL 16.16 in Docker and a psql 17 client.

To see that the checks can fail, break a rule in a copy of the doc and run the script next to it. On 27 Nov:

- Turning the phone index into a plain (not unique) index failed 3 checks.
- Turning the events primary key into a unique constraint, and removing the `actor_id` check, failed 2.

Then:

```bash
python3 scripts/index.py --check
```

```bash
python3 -m unittest discover -s tests
```

Both should pass. Paste the ERD block into [mermaid.live](https://mermaid.live) to edit the diagram, or view it rendered on GitHub.
