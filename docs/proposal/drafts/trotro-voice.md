# Trotro Voice: a spoken, offline-first trotro journey planner for blind riders and newcomers in Accra

Nyansapo Systems · ICS 530 · Draft proposal · 15 Nov 2026 · Status: for team vote

## 1. Problem statement and motivation

Trotros (privately run minibuses) carry an estimated 3.5 million passenger trips across Greater Accra each weekday [2]. The network was "mostly invisible in official records" until recently, and routes keep extending outward [2]. Fares change by union announcement. The latest change was an 8% rise on 26 September 2026, which put intra-city fares between GH¢5.50 and GH¢36.80 [8].

Sighted locals learn the system from others; blind riders depend on others at every step. A 2025 study of 230 persons with disabilities in Accra found that buses have no voice announcements. Visually impaired riders therefore work out where they are "through a proxy", mostly the mate (the conductor) calling stops: "I know where I am because bus conductors call out my location" [1]. Mates' calls depend on things like seat availability. That leaves blind riders "at heightened risk of missing their designated stops" [1]. Newcomers share a milder version of this gap.

**The real need is not "an app".** It is independent, confident journeys. We add a private second source of what the mate calls, on the phone and screen reader blind riders already carry.

**Prior art.** Trufi's Trotro app (2019) routes over the same open data but is listed as "in Test phase", with nothing about screen readers, voice or offline use [7]. We compete on accessibility and offline use, and we continue our Visual Access work for Kofi Mensah ([persona](../../../knowledge/kofi-mensah-primary-persona.md)).

## 2. Stakeholders and personas

| Stakeholder | Type | Design decision it drives |
|---|---|---|
| Blind and low-vision riders | Direct | Voice and screen reader first; earphone privacy |
| Newcomers | Direct | Line names as mates call them; fare estimate |
| Mates and drivers | Direct (reporters) and indirect | Opt-in fare and stop reports; complement, not replace |
| Disability groups; AMA Department of Transport | Indirect, high influence | Evaluation partners; open data |
| OSM Ghana mappers | Indirect | ODbL attribution and share-alike [6] |

**Primary persona: Kofi Mensah (fictional).** He is 24 and has been totally blind since age nine. He uses TalkBack on a mid-range Android phone with earphones. He lives in Madina and interns near Kaneshie; line 275 "Madina-Adenta ↔ Kaneshie" is in the open feed [4]. His dependence on mates and his risk of missed stops are drawn from [1]. *As Kofi, 24, a blind TalkBack user, I want to say my destination, hear which line to stand for, and get a private "alight next" warning, so that I can ride without depending on a stranger.*

**Secondary persona: Efua Asante (fictional).** She is 31, a nurse just transferred from Tamale. She is sighted, on a small data bundle, and new to Accra's lines. Her problem is grounded in routes that are missing from official records [2] and fares that keep changing [8]. *As Efua, 31, new to Accra, I want the line, the transfer point and the expected fare offline, so that I can commute without overpaying or getting lost.*

## 3. Proposed system

Trotro Voice is an installable web app (PWA). The rider speaks or picks a destination. The app answers in short spoken sentences. It names the line by the destination the mate calls ("Kaneshie"), then gives the boarding point, any transfer, an estimated fare and an estimated time. During the ride, phone GPS drives prompts such as "Kaneshie is the stop after next" and then "Alight at the next stop". Riders, and mates who opt in, can report the fare they paid or a stop's local name.

**What is intelligent, stated honestly.** *Algorithmic decision support* and *adaptive UX*, both accepted by the brief; no deep-learning claim.

1. **Multi-criteria, profile-aware routing.** Dijkstra runs over a stop graph ([notes](../../../knowledge/graphs-bfs-dfs-dijkstra.md)). Each edge costs time + λ₁·transfers + λ₂·fare + λ₃·walking. Kofi's profile weights transfers and walking heavily, because each transfer means finding a new bus by ear. The same query gives Kofi and Efua different, defensible routes: that contrast is the demo.
2. **Crowd fare estimation.** A distance-band table seeded from the published union fare schedule [8] (to be transcribed) is replaced, segment by segment, by the median of recent reports once at least *k* exist. The app always states its confidence ("about 8 cedis, from 12 reports").
3. **Alight state machine.** Rules over GPS distance, speed and accuracy warn one stop early, and say "location unclear" instead of guessing when the fix is poor.
4. *Should:* a scikit-learn travel-time correction (linear regression on segment length and time of day), trained on trips we log ourselves. We claim it only if we collect enough trips.

Evaluation: about 20 trips team members know well, against a fewest-stops (BFS) baseline.

## 4. Illustrative use case

Kofi travels from Madina to Kaneshie on a Monday at 7:00.

1. He opens the app. TalkBack says "Where to? Double-tap to speak". This button never moves.
2. He says "Kaneshie market". Fuzzy matching finds the stop, and the app reads it back: "Kaneshie Market. Is that right?" He confirms. This is our [read-back rule](../../../learnings/read-back-confirmation-catches-wrong-orders.md).
3. The router runs on the phone from the cached graph: "Take the Kaneshie trotro from Madina station. No transfers. About [estimate] minutes. Fare about [median] cedis, from [n] reports."
4. At the station he checks with a mate, "Kaneshie?", and taps "I've boarded".
5. Two stops out, his earphones say "Kaneshie is the stop after next". One stop out: "Alight at the next stop", with a vibration.
6. After he alights, the app asks "What fare did you pay?" He says "eight". The report goes into an on-device queue.
7. **Failure path: the GPS fix degrades in traffic.** The app does not guess. It says "Location unclear. Listen for the mate, or tap to hear the remaining stops." It falls back to labelled timetable estimates until the fix returns. With no data connection, steps 1–5 still work: the list picker replaces speech, and routing is local.
8. Back online, the queued report uploads exactly once, guarded by an idempotency key.

## 5. Target users and UX considerations

- **Screen reader first.** Every control is labelled, the speaking order is logical, and status is never shown by colour alone ([learning](../../../learnings/status-shown-only-by-colour-fails-screen-reader-users.md)). We test with TalkBack on a low-end Android phone.
- **Voice is a convenience, not a dependency.** Browser speech recognition normally sends audio to a server and "won't work offline". On-device recognition needs a language-pack download [9]. A type-ahead list picker always works. Stop names such as "Okponglo" may be misheard, so we match against the feed's 1,646 station names [4] and read the result back.
- **Privacy in public.** Prompts go to the earphones by default. The home stop is never spoken aloud ([learning](../../../learnings/speak-private-details-only-through-earphones.md)).
- **Low-end phones and costly data.** The graph downloads once and is cached ([notes](../../../knowledge/caching-and-pwa-for-poor-connectivity.md)). Without route shapes it should be well under 1 MB (estimate; to measure).

## 6. Architecture and programming model

**Style: an offline-first client–server system with a thin server.** The server runs a pipe-and-filter pipeline (GTFS → validate → graph and fare medians) and publishes versioned graph snapshots. The routing engine lives only on the client, so online and offline use the same code. We rejected server-side routing because it fails exactly when riders lose signal. Crowd reports reuse our Visual Access patterns: an on-device outbox ([transactional outbox](../../../knowledge/transactional-outbox.md)) plus [idempotency keys](../../../knowledge/idempotency-keys.md).

```
PHONE (React PWA)                         SERVER (FastAPI + PostgreSQL)
 voice/TalkBack UI -> router (Dijkstra)    GET /graph/latest  (versioned snapshot)
 IndexedDB graph cache  <---------------   pipeline: GTFS -> graph, fare medians
 GPS alight state machine
 report outbox  ----------------------->   POST /reports (idempotent)
```

**Stack.** FastAPI: Python matches the pipeline and scikit-learn, and it generates the OpenAPI contract. PostgreSQL: reports need constraints and history. React PWA: one installable codebase that works offline through a service worker. Dijkstra in TypeScript: about 100 testable lines, with no routing server to operate.

**First-pass availability.** Every figure here is ASSUMED: device A_d = 0.99, mobile network A_n = 0.95, API A_api = 0.995, database A_db = 0.999, cached graph valid A_c = 0.98.

- Online-only, in series: A_d·A_n·A_api·A_db = 0.99 × 0.95 × 0.995 × 0.999 ≈ **0.935**, about 47 h down per 30-day month.
- With the offline path in parallel: A_d·[1 − (1 − A_n·A_api·A_db)(1 − A_c)] = 0.99 × (1 − 0.0557 × 0.02) ≈ **0.989**, about 8 h per month. Now the phone itself is the limit.
- Alight prompts: A_d × A_gps (0.97, ASSUMED) ≈ 0.960. This is why the failure path hands control back to the mate.

The paper will keep *availability* (can I plan a route?) separate from *reliability* (is the route right?). Stale data hurts reliability, not availability ([graceful failure](../../../knowledge/no-single-point-of-failure.md)).

## 7. Data requirements

| Source | Status (checked 15 Nov 2026) | Licence |
|---|---|---|
| AccraMobility GTFS_Accra.zip [4] | **Downloaded and inspected.** Version 0.2, service 2019-03-04 to 2020-01-31. 277 routes, 2,525 stop points, 1,646 stations. No fare file. Every trip runs 05:00–22:00 at flat 5–30 min headways, so the timings are modelled, not observed. | "(C) OpenStreetMap contributors" [5]; ODbL share-alike [6] |
| Transitland f-ebzz-accratrotro [5] | Mirror of the feed; an older 2017–18 version is archived | As above |
| AccraMobile3 OSM mapping [3] | Fieldwork July–September 2017 | ODbL [6] |
| DT4A GitLab; Trufi GTFS (TUMI hub) | The hub refused our connection, so these are unverified | Unknown |
| Crowd reports | Synthetic in development; real only from consenting testers | Ours, shared under ODbL |

**Expect outdated data.** The mapping dates from 2017, routes have since been extended [2], and fares have moved [8]. The feed is our starting point and crowd reports are the correction. Every answer states how old it is and how confident we are.

**Security and privacy.** A report holds a segment, a fare, a timestamp and a random device ID. No name, phone number or GPS trace; location stays on the device. HTTPS throughout. Report endpoints are rate-limited per device, and outliers (more than 3× the median) are excluded, to resist fare-inflation spam.

## 8. Six-week scope

| Must | Should | Won't |
|---|---|---|
| GTFS pipeline; offline PWA; profile-aware Dijkstra; spoken directions and TalkBack flow; list-picker input; GPS alight prompts with fallback; crowd fare estimates; availability analysis | Speech input; travel-time model; Twi prompts; mate report screen | Live bus tracking; payments; native iOS; USSD |

| Week | Dates | Goal |
|---|---|---|
| 1 | 15–21 Nov | Approval; requirements; freeze graph schema and /reports OpenAPI; pipeline spike; TalkBack paper prototype |
| 2 | 22–28 Nov | Router on a fixture graph; offline shell; fare medians |
| 3 | 29 Nov–5 Dec | GPS state machine; outbox; real-graph integration; failure-path tests |
| 4 | 6–10 Dec | Field-test 20 trips; deploy; **core demo 10 Dec** |
| 5 | 11–18 Dec | BFS-baseline evaluation; availability write-up; paper; **final and ASERC talk 18 Dec** |

**Parallel work.** Once the contract is frozen in week 1, *backend* builds the pipeline and API, and *intelligence* builds the router against a hand-made fixture graph. *Frontend* and *requirements-ux* build the TalkBack flows against a mocked router. *Quality* owns failure tests and the availability model; *architecture* the contract and C4 diagrams; *scrum* one-week sprints; *paper* and *presentation* start in week 2.

## 9. Ethical, legal and social considerations

- **Safety.** A wrong "alight now" could strand a blind rider. Prompts are advisory and come one stop early. The app never gives road-crossing instructions, and it says plainly when it is unsure.
- **Data protection.** Travel patterns are personal data under Ghana's Data Protection Act, 2012 (Act 843). Its principles include a defined purpose, minimality, security safeguards and a right of access, and controllers must register with the Data Protection Commission [10]. We keep collection minimal: no accounts and no uploaded traces. Development uses synthetic data, and a real launch would need registration.
- **Open data and images.** We give ODbL attribution and contribute corrections back to OSM [6]. Personas are fictional; images will be our own or licensed.

## 10. Risks

| Risk | Mitigation |
|---|---|
| **Stale or placeholder data:** no fares, modelled timings, 2017 routes | Show data age and confidence; crowd corrections; field-check 20 trips; report the measured error |
| **GPS error causes a missed stop**, a safety issue for Kofi | Accuracy threshold; warn one stop early; hand back to the mate; test on real rides first |
| **No blind testers within 3.5 weeks** | Contact Ashesi disability support and a blind users' association in week 1. Blindfolded TalkBack tests are a weaker fallback, and the paper will say so. |
| **"Just Dijkstra" judged not intelligent enough** | Show profile-dependent routes, crowd estimates with confidence, and the baseline comparison; add the time model if the data allows |

## Sources

1. P. K. Odame, E. F. Sam et al. 2025. The journey from home: Experiences of persons with disabilities of the urban transport system in Accra Metropolis, Ghana. *African Transport Studies* 3, 100047. https://vref.se/wp-content/uploads/2022/08/EP-2020-MAC-02-PI-Sam-published-paper.pdf
2. MIT Atlas of Popular Transport. From Tro-tros to Pragyas: Accra. https://atlasofpopulartransport.mit.edu/accra
3. OpenStreetMap Wiki. AccraMobile3. https://wiki.openstreetmap.org/wiki/AccraMobile3
4. AFDLab4Dev. AccraMobility, GTFS_Accra.zip (downloaded 15 Nov 2026). https://github.com/AFDLab4Dev/AccraMobility/raw/master/GTFS/GTFS_Accra.zip
5. Transitland. Feed f-ebzz-accratrotro. https://www.transit.land/feeds/f-ebzz-accratrotro
6. OpenStreetMap Foundation. Copyright and License. https://www.openstreetmap.org/copyright
7. OpenStreetMap Wiki. Trotro App. https://wiki.openstreetmap.org/wiki/Trotro_App
8. MyJoyOnline, 23 Sep 2026. Public transport fares go up by 8% from September 26. https://www.myjoyonline.com/public-transport-fares-go-up-by-8-from-september-26-check-how-much-you-will-pay/
9. MDN Web Docs. Using the Web Speech API. https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
10. Wikipedia. Data Protection Act, 2012 (secondary; verify against the official text from the Data Protection Commission, dpc.gov.gh). https://en.wikipedia.org/wiki/Data_Protection_Act,_2012
