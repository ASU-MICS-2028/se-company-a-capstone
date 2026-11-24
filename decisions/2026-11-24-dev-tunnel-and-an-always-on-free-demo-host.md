---
title: Develop through a tunnel, and demo on a free host that never sleeps, chosen by 30 November
date: 2026-11-24
status: proposed
deciders: Eric Sunu (#7), for the team to agree
issue: "#45"
ai_used: yes
---

# Develop through a tunnel, and demo on a free host that never sleeps, chosen by 30 November

## Context

- Africa's Talking calls our USSD and delivery-report endpoints over the internet, so even development needs a public HTTPS address, not just a laptop.
- The lecturer wants the system on free cloud hosting, not localhost, and the demo must not fail ([deployed, not localhost](../knowledge/capstone-must-be-fully-functional-and-deployed.md), [staging server](../knowledge/deploy-demos-to-a-staging-server.md)).
- A USSD session waits for our reply while the patient looks at the screen. A free host that sleeps when idle and takes a while to wake would make the first dial fail. We have not yet measured how long the sandbox waits.
- We run two processes, the API and the [outbox worker](2026-11-24-outbox-worker-is-a-separate-polling-process.md), plus PostgreSQL. The same host serves the staff board and, since web booking came back ([#58](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/58)), the public patient page.
- The proposal left hosting to Sprint 4. Choosing now avoids discovering in December that our host can't run the worker.

## Decision

- **Development:** expose the local API through a tunnel, and register its address with the Africa's Talking sandbox. Prefer a tunnel with a **fixed address** (for example ngrok's free static domain), so the callback URL is set once. A tunnel whose address changes on each run (for example cloudflared's quick tunnel) means re-registering the callback every session.
- **Demo:** a **free host that never sleeps** and can run both processes and PostgreSQL. Pick one by **30 Nov**, after checking current free tiers, and record it here.
- Candidates to check (none verified yet; free tiers change often): a free-tier virtual machine running our Docker Compose file (for example Oracle Cloud's Always Free or Google Cloud's free e2-micro), or a platform whose free tier keeps a service running. A hosted PostgreSQL (Neon or Supabase) is acceptable if the host has none.
- **Rejected for the API:** any free tier that sleeps when idle, unless a check shows its wake-up is faster than the USSD timeout.

## Options we rejected

- **Demo from a laptop on a tunnel:** it fails the lecturer's not-localhost rule, and the laptop's network becomes part of the demo.
- **Wait until Sprint 4:** USSD and SMS work in Sprint 3 needs a public address, and a host that can't run the worker would be found too late.
- **A paid host:** the brief asks for free hosting. If no free option works, we ask the lecturer about the small budget he mentioned.

## Consequences

- #49's Docker Compose file is written so the same file runs on the demo host.
- #48's deployment view names the host once chosen.
- The availability figure (#12) is measured against the demo host, not a laptop.
- Open until 30 Nov: which host. Eric checks the candidates and updates this file, then the team agrees.

## AI use

Claude Code drafted this record from Eric's stack review notes and the course notes linked above. The hosting candidates are suggestions to check, not verified facts.
