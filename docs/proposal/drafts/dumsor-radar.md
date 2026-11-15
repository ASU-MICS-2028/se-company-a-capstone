# Kanea: outage forecasts and plain-language action alerts for small businesses (Dumsor Radar)

Nyansapo Systems · ICS 530 · Draft proposal · 15 Nov 2026 · Status: for team vote

*"Kanea" is Twi for lamp; Twi speakers to confirm.*

## 1. Problem statement and motivation

"Dumsor" (off-on) means unplanned power cuts, and they persist. A 2024 Institute of Economic Affairs survey in Greater Accra found that 70.7% of businesses said outages had major or severe effects on their work. 75.4% of respondents had outages at least three times a week, and 64.5% reported damaged appliances or financial losses [6]. An earlier ISSER study of 885 manufacturing firms estimated GH¢250 million in losses over a four-year crisis up to 2016 and a 10% fall in monthly productivity. It also found that "none of the coping strategies were effective" [7].

The core problem is not only the outages but that people **cannot plan around them**. In June 2024, ECG's deputy managing director said the company "cannot provide a planned load shedding schedule to customers because of uncertainties in power supply" [8]. In July 2025 analysts were still asking for a timetable [9]. A cold-store owner who knew there was a 70% chance of a cut at 6 pm could freeze stock by 4 pm. Without warning, the loss is already made.

The real need is not "an app" but **honest advance warning, turned into one action, in a form a busy trader will hear**.

## 2. Stakeholders and personas

| Stakeholder | Type | Goal | Design decision it drives |
|---|---|---|---|
| Small business owners (cold stores, barbers, chop bars, charging kiosks) | Direct, primary | Avoid spoiled stock and lost customers | Action-first alerts, not charts |
| Employees and apprentices | Direct, secondary | Know when to charge tools or start work | Voice note they can hear without reading |
| ECG and PURC | Indirect, high power | Reputation; reliability reporting | Forecasts labelled as our estimates, not ECG schedules |
| nLine (data provider) | Indirect, high power | Non-commercial, attributed use [1] | Attribution; no commercial use |
| SMS gateway | Indirect | Paid traffic | SMS only as fallback |
| Course instructor and assessors | Indirect, high power | Rigour in dependability | Availability computed for grid and for us |

**Primary persona (fictional): Auntie Akosua Boateng, 46, cold-store owner, Dansoman, Accra.** She sells frozen fish and chicken from three chest freezers. She prefers Twi to written English and uses a shared Android phone. A long evening outage spoils stock she cannot sell next day. Evidence: outages hit most Accra businesses several times a week and damage goods [6]; generators did not protect output [7]; Dansoman is a GridWatch focus district [1]. *User story:* As a cold-store owner, aged 46, I want a Twi voice alert with one action hours before a likely outage, so that I can protect my stock.

**Secondary persona (fictional): Kwame Asante, 27, barber, Kaneshie.** Cordless clippers, basic phone. He loses customers when clippers die mid-cut. Evidence: [6]; Kaneshie is a GridWatch district [1]. *User story:* As a barber, aged 27, I want an SMS saying "charge clippers before 6 pm" so that I do not turn customers away.

## 3. Proposed system

Kanea forecasts, for each Accra electricity district and each of the next 24 hours, the **probability of an outage**. It learns from the nLine GridWatch Accra dataset: 1,300+ plug-in sensors recording voltage and frequency every 2 minutes, July 2018 to mid-2023/2024 [1][2][3]. The same sensors were trusted to measure outages in a US government (MCC) impact evaluation in Accra [4]. Users add live signal by tapping "power off" or "power back".

A **decision-support layer** turns each forecast into one action for the user's business type: "70% chance of power cut from 6 pm. Move fish into the coldest freezer and keep the lid shut from 4 pm." Alerts go by push, with SMS fallback, plus a Twi or English voice note.

**The intelligent part** is a gradient-boosted classifier (scikit-learn `HistGradientBoostingClassifier`). Its features are hour, weekday, district, outages in the last 24 hours and 7 days, the same hour last week, and recent crowd reports. Probabilities are calibrated (`CalibratedClassifierCV`) so "70%" means a cut about 7 times in 10. A time-based split compares it with a naive baseline (historical rate per district-hour) on Brier score, ROC-AUC and a reliability diagram. If it fails to beat the baseline, the paper says so.

**Dependability is the theme, not an add-on.** SAIDI (average outage hours per customer) and SAIFI (average number of outages per customer) are the same arithmetic the course uses for availability. Grid availability is A = 1 − SAIDI / 8,760 hours per year. We compute it per district, then for our own system.

## 4. Illustrative use case

Auntie Akosua protects her stock on a Thursday evening.

1. At sign-up she picks district (Dansoman), business (cold store), language (Twi) and channel (push, SMS fallback).
2. At 13:00 the forecast job predicts a 0.72 probability of an outage in Dansoman between 18:00 and 21:00.
3. Her threshold is 0.6, so the decision engine picks the cold-store template "freeze stock by 16:00".
4. In one database transaction the API writes the alert and an outbox event. A worker sends the push and Twi voice note.
5. She plays the note, which reads back the time and action, and taps "OK".
6. At 15:45 she moves her stock and keeps the lids shut.
7. At 18:20 the power goes off. She taps "power is off", adding live signal for her district.
8. At 20:50 she taps "power is back". A 2.5-hour outage is recorded.

**Failure path.** At step 4 the push provider times out. The worker retries with backoff, then falls back to SMS. Key `alertId + channel` prevents duplicates. At step 7 she has no data, so the PWA queues the report on the phone and syncs it later with its original timestamp.

## 5. Target users and UX considerations

- **Low literacy and local language.** Every alert has a short voice note in Twi or English. We pre-record a fixed set of templates in team members' voices, which is cheaper and more dependable than live text-to-speech. Khaya offers Twi TTS [10], but its docs flag open issues, so it is a Should.
- **Low-end phones and poor connectivity.** Offline-capable PWA; SMS reaches any phone; one-tap reporting works offline.
- **Honest uncertainty.** We show "7 in 10 chance", not a red-amber-green colour. Status is always shown as words and an icon, never by colour alone (a Visual Access lesson: [learning](../../../learnings/status-shown-only-by-colour-fails-screen-reader-users.md)).
- **Screen readers.** Labelled controls, one action per screen, and large tap targets ([accessibility notes](../../../knowledge/designing-for-screen-reader-users.md)).
- **Alert fatigue.** User-set threshold and quiet hours; at most two alerts a day.

## 6. Architecture and programming model

**Style:** a modular monolith API with an **event-driven alert path** (publish-subscribe with a transactional outbox and queued workers). The forecast runs as a **batch job**. Forecasts change hourly, so batch is enough. Alerts must not block or be lost, so they reuse our outbox design ([learning](../../../learnings/order-notifications-must-be-async-transactional-outbox.md); [transactional outbox](../../../knowledge/transactional-outbox.md)). Microservices rejected: too much to run in 3.5 weeks.

```
 GridWatch data ──> [ETL + training (Python, nightly)] ──> model file
                                                             │
 PWA (React) ──HTTPS──> [FastAPI API] ──> [PostgreSQL: forecasts, users,
   ^  offline queue          │                reports, alerts, outbox]
   │                         │                      │
   │              [Forecast job, hourly] <──────────┘
   │                                                │ outbox rows
   │                                       [Alert worker + retry]
   └──── push ─────────────────────────────────┤
   └──── SMS gateway (fallback) ───────────────┘
```

**Stack.** FastAPI (ML and API share Python). PostgreSQL (the outbox needs transactions). scikit-learn (small, has calibration). React PWA (installable, offline on cheap Android).

**First-pass availability** (figures ASSUMED; we will replace them with measured uptime).

Series components: A_series = A1 × A2 × … × An. Parallel channels: A_parallel = 1 − (1 − A1)(1 − A2).

ASSUMED: API host 0.99, PostgreSQL 0.995, alert worker 0.99, push 0.95, SMS 0.98.

Push and SMS in parallel: 1 − (0.05 × 0.02) = 0.999.
Alert path end to end: 0.99 × 0.995 × 0.99 × 0.999 ≈ **0.974**.

Without the SMS fallback, the path is 0.99 × 0.995 × 0.99 × 0.95 ≈ 0.926. The fallback removes about two-thirds of the downtime ([build redundancy into systems](../../../knowledge/build-redundancy-into-systems.md)). If the forecast job fails, the API serves the last good forecast with its age. Cloud hosting keeps our servers off the Accra grid. The paper sets our availability beside the grid's A = 1 − SAIDI/8,760.

## 7. Data requirements

| Source | What | Access and licence | Use |
|---|---|---|---|
| nLine GridWatch Accra [1][2][3] | Voltage, frequency every 2 min; 1,300+ sensors; 21 districts; 2018 to 2023 or 2024 (sources differ) | **CC BY-NC 4.0**; free API key via form [1]; `nline-data-api` tool; 25–50 MB/day compressed [2] | Training, evaluation. We **derive** outages from voltage |
| MCC/Mathematica endline GridWatch data, doi:10.3886/8y5c-gx92 [5] | Weekly SAIDI/SAIFI, voltage, undervoltage per site | **Could not open** (HTTP 403). A search listing says 433 sites, 16 districts, 2018–2024, no downloadable files. Treat as unavailable | Cross-check SAIDI |
| Crowd reports | District, on/off, timestamp | Our own; synthetic during the demo | Live feature; ground truth |
| User profiles | Phone number, district, business type, language | Our own; synthetic test users only | Alert routing |

**Flow.** Nightly ETL pulls a district-filtered slice, derives outage events and district-hour labels, and trains the model. An hourly job writes forecasts. With no live public feed, the demo **replays** a held-out 2023 week on a simulated clock, and we say so.

**Security and privacy.** Phone numbers are the only personal data. Encrypted at rest, used only for alerts. Reports store district, not GPS. HTTPS; per-user rate limits.

## 8. Six-week scope

| Must | Should | Won't (this term) |
|---|---|---|
| District-hour forecast from GridWatch with calibrated probabilities and baseline comparison | Khaya Twi TTS for free-text alerts | Real SMS to real customers at scale |
| Decision templates for 3 business types; pre-recorded Twi/English voice notes | Crowd reports used as a live model feature | Nationwide coverage beyond Accra |
| PWA: sign-up, forecast view, one-tap report, offline queue | Reliability diagram in the UI | Native apps, USSD |
| Outbox, retry, push with SMS fallback (sandbox gateway) | Admin page for district SAIDI/SAIFI | Commercial use (blocked by the licence) |
| Measured availability for our system; SAIDI/SAIFI per district | | |

**Plan.**
- **Week 1 (16–22 Nov):** request the nLine API key on day 1. Freeze the OpenAPI contract and mock data. Requirements, personas, UX wireframes. Sprint 1 planning.
- **Week 2 (23–29 Nov):** ETL and outage derivation; baseline model. API endpoints and database schema with outbox. PWA screens against mocks.
- **Week 3 (30 Nov–6 Dec):** gradient boosting with calibration and evaluation. Alert worker, retry and SMS fallback. Voice notes recorded. Integration on a staging server.
- **Week 4 (7–10 Dec):** failure-path tests (kill the push provider, kill the forecast job). Replay demo. **Core demo 10 Dec.**
- **Week 5 (11–18 Dec):** measured availability; SAIDI/SAIFI analysis; ACM paper; poster; **ASERC talk 18 Dec.**

**Parallel workstreams.** All build against the week-1 API contract and mock forecasts: intelligence (data, model), backend (API, outbox, workers), frontend (PWA), requirements-UX (journeys, voice scripts), quality (failure tests early). Scrum, paper (owns availability analysis) and presentation run throughout.

## 9. Ethical, legal and social considerations

- **Licence.** The GridWatch data is CC BY-NC 4.0 [1]. Coursework is non-commercial; a commercial version needs nLine's permission. We attribute nLine.
- **Harm from wrong forecasts.** Missed outages cost stock; false alarms waste effort. We show probabilities, label them estimates, and publish accuracy.
- **Personal data.** Phone numbers and districts are personal data under Ghana's Data Protection Act, 2012 (Act 843). We collect the minimum, get explicit consent, allow deletion, and use synthetic users only in the course.
- **Fairness.** Accra only; sparse districts get weaker forecasts. We report error by district.
- **Public trust.** Crowd reports could be gamed; rate limits and agreement-weighting reduce this.

## 10. Risks

1. **The model may barely beat the baseline.** Outages may be driven by supply shocks that hour and weekday cannot capture. *Mitigation:* the baseline is itself useful, and calibrated uncertainty is the contribution.
2. **Data is stale and heavy.** The public data ends in 2023 or 2024 [1][2], and patterns in 2026 may differ. It is also large [2]. *Mitigation:* use a few districts and 12–18 months; present a method validated on history, with crowd reports as the path to live use.
3. **Data access delay.** Everything waits on the API key; the MCC data is inaccessible [5]. *Mitigation:* request on 16 Nov; build on a same-schema synthetic generator meanwhile.
4. **Outage derivation is our own.** The data gives voltage, not labelled outages. A bad threshold mislabels everything. *Mitigation:* a documented rule (e.g. under 50 V for two samples), a sensitivity test, and cross-checks against nLine KPIs.

## Sources

1. nLine, "GridWatch: Accra, Ghana" public data page (coverage, districts, CC BY-NC 4.0 licence, API key form). https://nline.io/public-data/gridwatch (see also https://nline.io/public-data)
2. nLine, `nline-data-api` (fields, July 2018–July 2024 range, size per day). https://github.com/nline/nline-data-api
3. Climate Change AI, "Helping global grids work smarter, not harder" (29 Aug 2024). https://climatechange.ai/blog/2024-08-29-ghana-power-grid
4. MCC, evaluation brief, Ghana line bifurcation (GridWatch outage measurement, 2018–2023). https://www.mcc.gov/resources/doc/evalbrief-032624-gha-line-bifurcation/
5. MCC/ICPSR, "Ghana Power Compact – EFOT: Endline GridWatch Sensor Data (Site-Level)", doi:10.3886/8y5c-gx92. https://mcc.icpsr.umich.edu/evaluations/index.php/catalog/28972 (returned HTTP 403; details from search listing only, unverified)
6. MyJoyOnline, "Dumsor brought untold hardship to most people in the Gt Accra region – IEA survey" (June 2024). https://www.myjoyonline.com/dumsor-brought-untold-hardship-to-most-people-in-the-gt-accra-region-iea-survey/
7. Graphic Online, "885 SMEs lost GH¢250m within four-year 'dumsor' period" (ISSER/IGC study). https://www.graphic.com.gh/news/general-news/885-smes-lost-gh-250m-within-four-year-dumsor-period.html
8. Ghana News Agency, "ECG attributes absence of load shedding schedule to supply uncertainty" (June 2024). https://gna.org.gh/2024/06/ecg-attributes-absence-of-load-shedding-schedule-to-supply-uncertainty/
9. Citi Newsroom, "Energy players urge govt to release load shedding timetable before July 13" (July 2025). https://www.citinewsroom.com/2025/07/energy-players-urge-govt-to-release-load-shedding-timetable-before-july-13/
10. Khaya SDK documentation, Text-to-Speech guide. https://khaya-sdk.readthedocs.io/en/latest/guides/tts/
