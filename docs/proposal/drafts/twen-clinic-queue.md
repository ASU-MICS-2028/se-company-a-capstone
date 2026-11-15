# Twɛn: a smart clinic queue that lets patients wait at home, not on a bench

Nyansapo Systems · ICS 530 · Draft proposal · 15 Nov 2026 · Status: for team vote

## 1. Problem statement and motivation

*Twɛn* is Twi for "wait". At many Ghanaian outpatient departments (OPDs), the queue is the service. At Korle-Bu Teaching Hospital, 56.4% of 274 sampled outpatients waited 120 minutes or more. Early-morning arrival was common (43.4%) and linked to *longer* waits, as were Monday visits and lower education. The authors recommend digital queue management [1]. At Holy Family Hospital, Techiman, the average OPD wait was 2 hours 50 minutes, and records was the slowest stage (mean 74.5 minutes) [2]. A 2026 news report describes a trader waking at 3 a.m. to be first in line, losing a day's pay [3]; no study we found measures that lost income.

The real need is not "an app". Patients need to **know when to come**, so they can keep working until they are close to being seen. Clinics need a fair queue that survives network failure. Twɛn does **no diagnosis or triage** (Section 9).

## 2. Stakeholders and personas

| Stakeholder | Type | Goal | Pain point | Design decision it drives |
|---|---|---|---|---|
| OPD patients | Direct | Be seen without losing the day | Dawn arrival, unknown wait | USSD ticket, predicted wait, "come now" SMS |
| OPD nurses, records staff | Direct | Fair, steady flow | Workload [2] | Live board, no-show, offline mode |
| Patients without a phone | Direct | Equal place | Digital exclusion [4] | Desk tickets, same queue |
| Pregnant women, elderly, emergencies | Direct | Seen first when needed | Rigid first-come rules | Staff-only, logged override |
| Hospital administrator | Indirect | Throughput | No data on flow | Daily wait report |
| Carers | Indirect | Plan around the visit | Unpaid days | SMS to a carer's number |
| Data Protection Commission | Indirect | Lawful processing | Health-linked data | Minimal data (Section 9) |

**Primary persona (fictional): Adwoa Boateng, 34, tomato trader, Nsawam.** Adwoa attends the district hospital OPD monthly for blood-pressure review. She has a button phone, reads Twi more easily than English, and leaves home before 5 a.m. to hold a place, so her stall stays closed. Evidence: early arrival and lower education predict longer waits [1]; 4.9 million Ghanaians aged 15+ had no functional smartphone in 2021 [4].
*User story:* As a market trader, aged 34, with a basic phone, I want a USSD ticket, my expected wait in Twi, and an SMS telling me when to leave, so that I can open my stall and still be seen today.

**Secondary persona (fictional): Nurse Comfort Asante, 46, OPD nurse-in-charge.** Comfort runs the morning queue with paper folders and loses track of who has stepped out. Evidence: workload and patient flow are the most cited causes of delay [2].
*User story:* As an OPD nurse-in-charge, aged 46, I want an offline-capable board where I mark no-shows and move a pregnant woman forward, so that the queue stays fair without extra paperwork.

## 3. Proposed system

Twɛn is a virtual OPD queue. Patients join by USSD, SMS, web or at the desk, and get a ticket and a **predicted wait**. Near their turn, a **"come now" SMS** arrives, timed by how long they usually take to arrive. Staff run a **live board**: call next, mark no-shows, apply priority. Priority for pregnant women, the elderly and emergencies is always a **staff decision**, never the algorithm's.

The intelligent part, demonstrable live:

1. **Wait-time prediction.** A scikit-learn gradient-boosting regressor predicts each ticket's remaining wait. Features: time of day, weekday, position in queue, staff on duty, and recent service times. Baselines: an **M/M/c queueing model** (Erlang C) and a naive "position × mean service time ÷ staff" rule. Metric: mean absolute error in minutes and share within ±15 minutes.
2. **Adaptive notification timing.** Twɛn learns each patient's (or area's) travel lead time from the gap between SMS and check-in, smoothed with an exponentially weighted average. It sends the SMS when the predicted wait falls below that lead time plus a buffer.

## 4. Illustrative use case

1. Sunday evening, Adwoa dials the Twɛn USSD code, picks Twi and "District Hospital OPD, tomorrow".
2. Twɛn issues ticket **B-047**: "Expected time to be seen: about 10:30. We will SMS you when to leave."
3. Monday 06:00, she opens her stall instead of queuing.
4. At 08:15 only two clinicians are on duty, not three. Twɛn re-predicts and SMSes Adwoa a new estimate, 11:10.
5. Adwoa usually needs about 50 minutes, so her "Come now. You are 8th in line" SMS is due at 10:05.
6. **Failure path:** at 10:00 the hospital internet drops. The board keeps running locally; Adwoa's SMS waits in the outbox. At 10:20 the link returns, events sync, and the SMS is sent **once** (duplicates dropped by idempotency key). Because it went out late, the board flags "notification delayed" and Comfort holds Adwoa's place rather than marking a no-show.
7. Adwoa checks in at 11:12. Comfort taps "arrived", which updates Adwoa's travel-time estimate.
8. She is seen at 11:25, losing two hours, not a whole day.

## 5. Target users and UX considerations

- **No smartphone needed.** USSD and SMS are primary because millions of adults have no smartphone [4].
- **Low literacy, local language.** Short fixed templates in Twi and English; the time and position come first.
- **No phone at all.** Desk tickets join the same queue; phone owners never jump ahead.
- **Staff board.** Runs on a low-end laptop; large targets, keyboard shortcuts, status by text and icon, never colour alone, screen-reader labelled (from our Visual Access work; [screen-reader notes](../../../knowledge/designing-for-screen-reader-users.md)).
- **Poor connectivity.** Local-first board ([PWA notes](../../../knowledge/caching-and-pwa-for-poor-connectivity.md)).
- **Honest uncertainty.** Predictions show a range ("10:30–11:00").

## 6. Architecture and programming model

```
 Patient phone ──USSD/SMS──> Africa's Talking (sandbox) ──webhook──┐
                                                                    v
 Staff board PWA  <──sync events──>  FastAPI "Queue API"  ──>  PostgreSQL
 (IndexedDB, local                    │   └─ /predict ──> Wait model (scikit-learn)
  event log)                          │
                                      └─ same transaction ──> outbox table
                                                               │
                                       Notifier worker <───────┘ (retry, backoff,
                                         └─> SMS adapter ──> Africa's Talking   idempotency key)
```

**Style.** Client-server, with an **event-driven publish-subscribe** notification path and a **local-first** clinic edge. We trade strong consistency for queue availability. This is safe because each clinic's board is the single writer for its queue; remote tickets merge in issue order on reconnect.

**Why an outbox.** Our team's rule: never call an external service inside the committing request. A ticket change and its event are saved in one transaction; a worker sends SMS at a controlled rate, retries with backoff, and drops duplicates by `ticketId + eventType + seq` ([outbox learning](../../../learnings/order-notifications-must-be-async-transactional-outbox.md), [idempotency keys](../../../knowledge/idempotency-keys.md), [publish-subscribe with queued workers](../../../knowledge/publish-subscribe-with-queued-workers.md)). A slow SMS provider grows a backlog; it never freezes the queue.

**Programming model.** Async webhook handlers; an append-only event log (joined, called, arrived, no-show, override); the model served in-process, retrained offline.

**Stack.** FastAPI (async, teachable Python); PostgreSQL (transactions make the outbox correct); scikit-learn (small, explainable); React PWA with IndexedDB (offline storage built in); Africa's Talking sandbox (free USSD/SMS simulator [5]). No Kafka; one outbox worker suffices at clinic scale.

**First-pass availability (component figures ASSUMED, to be measured).** "Available" means staff can issue tickets and call the next patient.

- *Cloud-only design (series):* A = A_internet × A_api × A_db = 0.97 × 0.995 × 0.999 ≈ **0.964**, about 26 hours down per month of 30 days.
- *Local-first path (series):* A = A_laptop × A_power(UPS) = 0.99 × 0.98 ≈ **0.970**.
- *Both paths in parallel:* A = 1 − (1 − 0.964)(1 − 0.970) ≈ **0.9989**, about 47 minutes down per month.

Caveat: parallel assumes independent failures, but a power cut can kill the router *and* the laptop. We will measure this common-cause failure. SMS is excluded: if it fails, notifications are delayed but the queue runs.

## 7. Data requirements

- **Synthetic arrivals and service times (ours).** A time-varying Poisson process with a dawn peak and Monday effect [1], calibrated to about 475 patients over 9 hours (about 53 an hour) and about 5 minutes per consultation at AngloGold Ashanti Hospital, Obuasi [6], plus records delays [2]. Staff absences are injected. We **validate the generator** against published summaries, such as the share of waits ≥120 minutes [1].
- **Travel lead times:** synthetic estimates per area; no real figure exists.
- **No real patient data.** Studies supply aggregate parameters only. USSD/SMS runs in the Africa's Talking sandbox simulator, which never reaches real handsets [5].
- **Flows:** phone → gateway → Queue API → Postgres → outbox → SMS; board ⇄ API sync.
- **Security:** store only phone number, ticket, clinic and timestamps; no name, symptom or diagnosis. Hashed numbers for analytics, TLS, role-based staff login, logged overrides, 30-day deletion.

## 8. Six-week scope

| Must (10 Dec demo) | Should | Won't |
|---|---|---|
| USSD/SMS and desk tickets | Twi templates | Diagnosis, triage AI |
| Staff board: no-show, override, keeps running offline | Merging remote tickets made during an outage | Real patient data, live pilot |
| Wait model vs M/M/c and naive baselines | Adaptive notification timing | Labs and pharmacy stages |
| Outbox and idempotent SMS worker | Admin report | EMR/NHIS integration |
| Validated synthetic generator | Fault-injection test | Payments |

**Plan** (1-week sprints, each with a Sprint Goal):
- **Sprint 1 (16–22 Nov):** OpenAPI contract and mocks frozen by Tuesday; generator; sandbox USSD; wireframes.
- **Sprint 2 (23–29 Nov):** Queue API, schema, outbox worker, board v1, model v1 vs baselines.
- **Sprint 3 (30 Nov–6 Dec):** offline board, adaptive timing, evaluation, usability test.
- **Sprint 4 (7–10 Dec):** hardening, staging deploy, **core demo 10 Dec**.
- **11–18 Dec:** fault injection and measured availability, ACM paper, **ASERC talk 18 Dec**.

**Parallel workstreams** behind the frozen contract: product/scrum, requirements-ux, architecture (C4, ADRs, availability), backend, intelligence (generator, model), frontend, quality, paper, presentation. Frontend and USSD build against mocks until the backend lands.

## 9. Ethical, legal and social considerations

- **No diagnosis, no triage AI.** Urgency ranking is clinical judgement. A wrong ranking could harm someone and would shift responsibility from a nurse to our software, a liability no student team should carry. Twɛn predicts *time*, not *health*; priority stays with staff, every override logged.
- **Fairness.** Desk tickets join the same queue, and we test that ordering does not depend on channel. Persons with disabilities in Ghana are 34% less likely to own a mobile phone [7], so walk-ins are first-class.
- **Data Protection Act, 2012 (Act 843).** Health data is "special personal data" [8], and a clinic ticket reveals someone is seeking care, so we treat it as sensitive: minimal collection, a purpose notice on the first USSD screen, access and correction, safeguards, breach notification. A real deployment needs the hospital, as controller, registered with the Data Protection Commission [8].
- **Social.** Wrong predictions can cost a turn; ranges and a "hold place" button limit that harm.

## 10. Risks

1. **The model may only learn our generator.** Synthetic data is circular. *Mitigation:* calibrate from published parameters, test on held-out stress scenarios (staff absence, Monday surge), and report honestly, even a loss to the baseline.
2. **The M/M/c baseline is weak on real OPD flow.** With the Obuasi figures (53 arrivals an hour, 12 served an hour per doctor, 5 doctors) [6], our steady-state Erlang C calculation gives only about 6 minutes of queueing at the doctor. Observed waits are 2–3 hours [1][2], so delay comes from the dawn surge and other stages. *Mitigation:* report the gap as a finding, add a time-varying baseline, and scope claims to one queue stage.
3. **Offline sync is hard in 3.5 weeks.** *Mitigation:* single writer per clinic, append-only log, no multi-master merge. Merging remote tickets made during an outage is a Should; the Must is that the board keeps running.
4. **Overlap.** Kiosk queue systems already exist in Ghanaian hospitals [9], and the Ghana Health Service is reportedly piloting online booking [3]. *Mitigation:* differentiate on no smartphone, no kiosk hardware, offline-first; a thin layer beside an EMR.

## Sources

1. Elemoah D, Abeasi DA, Agyei FB, Sasemame ES, Akumiah PO. "The waiting game: determinants and effects of OPD service delays in a Tertiary Health Facility." *BMC Health Services Research* 25:1545 (2025). https://doi.org/10.1186/s12913-025-13594-9 (metadata: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1186/s12913-025-13594-9&resultType=core&format=json)
2. Appiah K. *Patient Satisfaction with Waiting Time at the Out Patient Department (OPD), Holy Family Hospital, Techiman.* MPH thesis, University of Ghana (2019). https://ugspace.ug.edu.gh/handle/123456789/30766
3. Osei-Frempong S. "The long wait at Ghana's hospitals: A daily struggle, and the road to relief." Ghana News Agency, 10 May 2026 (news commentary; parts promotional). https://gna.org.gh/2026/05/the-long-wait-at-ghanas-hospitals-a-daily-struggle-and-the-road-to-relief/
4. MyJoyOnline. "5 million persons 15 years and older were offline during census – Ghana Statistical Service." 18 May 2023. https://www.myjoyonline.com/5-million-persons-15-years-and-older-were-offline-during-census-ghana-statistical-service/
5. Africa's Talking Help Center. "How do I get started on the Africa's Talking sandbox?" https://help.africastalking.com/en/articles/1170660-how-do-i-get-started-on-the-africa-s-talking-sandbox
6. Afrane S, Appah A. "Queuing theory and the management of waiting-time in hospitals: The case of AngloGold Ashanti Hospital in Ghana." *IJARBSS* 4(2) (2014). https://hrmars.com/papers_submitted/590/Queuing_theory_and_the_management_of_Waiting-time_in_Hospitals_The_case_of_Anglo_Gold_Ashanti_Hospital_in_Ghana.pdf
7. GSMA. *Closing the mobile disability gap in Ghana* (2022). https://www.gsma.com/mobilefordevelopment/wp-content/uploads/2022/04/Closing-the-mobile-disability-gap-in-Ghana.pdf
8. DLA Piper. "Data protection laws in Ghana" (summary of Act 843). https://www.dlapiperdataprotection.com/index.html?c=GH&t=law ; statute: https://ghalii.org/akn/gh/act/2012/843/eng@2012-05-18
9. Wavetec case study. "Nyaho Medical Centre reduces wait times and optimizes patient flow." https://www.casestudies.com/company/wavetec/case-study/wavetec-transforms-customer-journey-at-nyaho-medical-centre-ghana
