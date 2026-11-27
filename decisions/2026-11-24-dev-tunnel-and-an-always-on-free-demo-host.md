---
title: Develop through an ngrok tunnel, and demo on an Oracle Cloud Always Free VM
date: 2026-11-24
status: proposed
deciders: Eric Sunu (#7), for the team to agree
issue: "#45"
ai_used: yes
---

# Develop through an ngrok tunnel, and demo on an Oracle Cloud Always Free VM

## Context

- Africa's Talking calls our USSD and delivery-report endpoints over the internet, so even development needs a public address, not just a laptop.
- The lecturer wants the system on free cloud hosting, not localhost, and the demo must not fail ([deployed, not localhost](../knowledge/capstone-must-be-fully-functional-and-deployed.md), [staging server](../knowledge/deploy-demos-to-a-staging-server.md)).
- A USSD session waits for our reply while the patient looks at the screen. The Africa's Talking USSD docs say: "Please note that the expected response time from your application is at most 10 seconds." A host that sleeps and takes longer than that to wake fails the first dial.
- We run two processes, the API and the [outbox worker](2026-11-24-outbox-worker-is-a-separate-polling-process.md), plus PostgreSQL. The worker polls the database every 1 to 2 s, all day. The same host serves the staff board and, since web booking came back ([#58](https://github.com/ASU-MICS-2028/se-company-a-capstone/pull/58)), the public patient page.
- The proposal left hosting to Sprint 4. Choosing now avoids discovering in December that our host can't run the worker.

## Decision

- **Development:** an **ngrok** tunnel on the free plan. Each free account gets one fixed dev domain, so we register the callback URL with the Africa's Talking sandbox once. Only Africa's Talking callbacks go through the tunnel; the board and patient page run on localhost, because the free plan allows 20,000 HTTP requests a month and the board polls.
- **Demo host:** an **Oracle Cloud Always Free** Arm virtual machine (shape `VM.Standard.A1.Flex`) running our Docker Compose file: the API, the outbox worker and PostgreSQL 16 on one machine. A VM does not sleep, the Always Free allowance has no end date, and it is far larger than we need (2 OCPUs and 12 GB of memory, 200 GB of disk, 10 TB a month of outbound data).
- **HTTPS on the VM:** a reverse proxy in front of the API with a Let's Encrypt certificate for the VM's public IP address. Let's Encrypt has issued six-day certificates for IP addresses since January 2026, so we need no domain name. A free hostname (DuckDNS or sslip.io) is the second route.
- **Fallback:** if nobody on the team can open an Oracle account by 30 Nov (the card is refused, or there is no Arm capacity), use **Azure for Students**: a small Linux VM paid from the $100 student credit, running the same Compose file. It needs a school email and no card, so it covers Oracle's main risk.
- **Database:** no hosted database while the VM runs PostgreSQL. If the fallback VM is too small for it, use Supabase's free database through its IPv4 pooler, as a plain PostgreSQL server only. Not Neon (see the evidence).

## Evidence (official pages, checked 27 Nov 2026)

| Candidate | Sleeps when idle? | API, worker and PostgreSQL? | Public HTTPS | Main limits | Card at sign-up | Ghana |
|---|---|---|---|---|---|---|
| **Oracle Always Free Arm VM** (chosen) | No. An instance idle for 7 days may be reclaimed (below) | Yes, a full VM runs Compose | Public IP included; we add the certificate | 2 OCPUs, 12 GB, 200 GB disk, 10 TB out a month; home region only | Yes: a credit card, or a debit card that works like one; no PIN debit, virtual or prepaid cards | Not named; offered wherever commercial Oracle Cloud is. Nearest regions: Johannesburg, Casablanca |
| **Azure for Students VM** (fallback) | No (a VM) | Yes | Not checked; same plan as Oracle | $100 credit for 12 months; the subscription is disabled when it runs out; activations while supplies last | No | Not named; offered in over 140 countries |
| Google Cloud e2-micro | No (a VM) | Tight; memory not stated on the pages read | Public IPv4 listed at $0.005 an hour; free-tier cover not stated | US regions only; 30 GB disk; 1 GB out a month | Yes, a card or other payment method | Not stated |
| Northflank Sandbox | No, always on | 2 services, 2 jobs, 1 database | Yes, `code.run` subdomain with TLS | Up to $20 a month of resources; caps not published | Yes | Not stated |
| Render free | Yes, after 15 min; wakes in about a minute | No free worker; free PostgreSQL expires after 30 days | Yes | 750 instance hours a month | Not stated | Not stated |
| Koyeb free | Yes, after 1 hour | No: the free instance can't be a worker | Yes | One instance, 512 MB | Not stated | Not stated |
| Railway free | Yes, after 5 to 10 min without outbound traffic | Up to 3 services | Yes, `up.railway.app` subdomain | $1 of usage a month (about 100 MB of RAM) | No | Not stated |
| Fly.io free | Not stated | Up to 3 machines; PostgreSQL is a paid plan | Not checked | $1 for 7 days without a card, $5 a month with one | The pages disagree | Not stated |

| Database or tunnel | Fits? | Why |
|---|---|---|
| Neon free | No | 100 compute-hours a month runs the smallest size for 400 hours. Our worker polls every 1 to 2 s, so the database never scales to zero and the allowance runs out around day 17 (our arithmetic); compute then stops until next month. |
| Supabase free | Yes, as the fallback database only | 500 MB, shared CPU and 500 MB of RAM; paused only after a week of low activity; on the free plan, IPv4 clients connect through the shared pooler. |
| ngrok free | Yes, for development | One fixed dev domain we can't rename; 20,000 HTTP requests and 1 GB out a month; the browser warning page appears only for GET requests from browsers, so Africa's Talking's POST callbacks pass. No card for HTTP tunnels. |

The Oracle idle rule: Oracle may reclaim an Always Free instance if, over 7 days, CPU (95th percentile), network and memory are **all** under 20% (memory counts for Arm shapes only). A quiet demo could meet the CPU and network parts, so we keep memory use above 20% (see Consequences).

Sources, all checked 27 Nov 2026:

- Africa's Talking: [USSD overview](https://developers.africastalking.com/docs/ussd/overview) (10 s response time, form-encoded POST, plain-text reply); [Kenyan USSD sessions](https://help.africastalking.com/en/articles/1284071-what-is-the-duration-of-a-ussd-session-for-kenyan-telcos) (Airtel: 15 s for the application to respond).
- Oracle: [Always Free resources](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm) (shapes, storage, outbound data, idle rule, home region, out of capacity); [Free Tier FAQ](https://www.oracle.com/cloud/free/faq/) (cards, countries, one account per person, Always Free kept after the trial); [regions](https://docs.oracle.com/en-us/iaas/Content/General/Concepts/regions.htm).
- Azure: [Azure for Students offer](https://azure.microsoft.com/en-us/pricing/offers/ms-azr-0170p); [Azure for Students](https://azure.microsoft.com/en-us/free/students); [about Azure for Students](https://learn.microsoft.com/en-us/azure/education-hub/about-azure-for-students).
- Google Cloud: [free features](https://docs.cloud.google.com/free/docs/free-cloud-features); [network pricing](https://cloud.google.com/vpc/network-pricing).
- Platforms: [Render free](https://render.com/docs/free); [Koyeb instances](https://www.koyeb.com/docs/reference/instances); [Railway free plan](https://docs.railway.com/pricing/free-plan); [Northflank pricing](https://northflank.com/pricing); [Fly.io pricing](https://docs.fly.io/about/pricing) and [free plan](https://docs.fly.io/about/free-plan).
- Databases: [Neon plans](https://neon.com/docs/introduction/plans); [Supabase pricing](https://supabase.com/pricing); [Supabase pausing](https://supabase.com/docs/guides/platform/free-project-pausing); [Supabase connections](https://supabase.com/docs/guides/database/connecting-to-postgres).
- Tunnel and certificates: [ngrok free plan limits](https://ngrok.com/docs/pricing-limits/free-plan-limits); [Let's Encrypt IP address certificates](https://letsencrypt.org/2026/01/15/6day-and-ip-general-availability).

## What we could not verify

- **Whether a Ghanaian bank card passes Oracle's check.** Only a sign-up can tell, and this research opened no accounts.
- **Whether Oracle has free Arm capacity** in our home region on the day we sign up. Johannesburg and Casablanca each list one availability domain, so Oracle's advice to try another availability domain doesn't help there.
- **Whether a quiet demo counts as idle.** Keeping memory above 20% should prevent it, because the rule needs all three under 20%. That is our reading of the rule, not something we've tested.
- **Azure for Students:** whether an Ashesi email passes verification, and whether its 750 free VM hours are per month.
- **Ghanaian USSD timeouts.** Africa's Talking publishes Kenyan and Nigerian figures, not Ghanaian ones, so we design to the 10 s rule in its docs.
- **Free hostnames:** the sslip.io and DuckDNS pages would not load, so that route is unchecked. We also haven't tried issuing the IP certificate yet.
- **HTTPS for callbacks:** Africa's Talking asks for a valid, reachable URL and does not say whether it must be HTTPS.
- **AWS's free plan** (up to $200 in credits for 6 months, and most new customers need no payment method) is a second no-card option, not checked in depth.

## Options we rejected

- **Demo from a laptop on a tunnel:** it fails the lecturer's not-localhost rule, and the laptop's network becomes part of the demo.
- **Wait until Sprint 4:** USSD and SMS work in Sprint 3 needs a public address, and a host that can't run the worker would be found too late.
- **A paid host:** the brief asks for free hosting. If both the host and the fallback fail, we ask the lecturer about the small budget he mentioned.
- **Free platform tiers that sleep (Render, Koyeb, Railway):** Render takes about a minute to wake, against a 10 s limit. Render and Koyeb don't run a free worker, and Railway's $1 a month can't run three processes all month.
- **Google Cloud e2-micro:** it works on paper, but it is US-only, has 1 GB a month of outbound data and a charged public IP. It also needs a card, so it doesn't cover Oracle's main risk.
- **Northflank:** it also works on paper, with free HTTPS, but it needs a card too and publishes no compute caps. It is our third choice if Oracle has no capacity and someone has a card.
- **Fly.io:** its pages disagree on whether a card is needed, and its PostgreSQL is paid.
- **Neon as the database:** the polling worker uses up the free compute in about 17 days.

## Consequences

- One teammate tries to open the Oracle account **before 30 Nov**. Oracle allows one free account per person, so the account belongs to that teammate. If it fails, we switch to the Azure fallback the same day.
- #49's Compose file runs unchanged on the VM. The Arm shape needs an `arm64` build of every image, which #49 checks.
- Size the Arm VM small (for example 1 OCPU and 4 GB), so normal use stays above 20% of memory, and check the memory metric after the first week.
- Someone logs in to the Oracle console at least monthly: the FAQ says accounts idle for 30 days or more may be treated as abandoned.
- In development, only Africa's Talking callbacks use the tunnel, which keeps us under ngrok's monthly request limit.
- #48's deployment view names Oracle Cloud (or the fallback, if we switch).
- The availability figure (#12) is measured against the demo host, not a laptop.
- Still open: the team agrees, and the Oracle sign-up is tried by 30 Nov.

## AI use

Claude Code drafted this record from Eric's stack review notes and the course notes linked above. On 27 Nov 2026 it checked the hosting candidates against the official pages listed in Sources. Fetch agents read most of the pages. Claude Code itself read, in a browser, the Oracle FAQ, Oracle's idle rule and Arm allowance, Google's IP price, the Africa's Talking USSD pages and the Let's Encrypt post. It opened no accounts. Eric has not yet checked it.
