# Cassava Check: offline leaf diagnosis for farmers, outbreak maps for extension officers

Nyansapo Systems · ICS 530 · Draft proposal · 15 Nov 2026 · Status: for team vote

## 1. Problem statement and motivation

Cassava is Ghana's largest crop by weight: 22.96 million tonnes in 2020, against 8.8 million for yam and 3.0 million for maize [1]. When cassava fails, many households lose food and income at once.

Cassava mosaic disease (CMD) is already common. A 2007–2008 survey of 136 farms found symptoms on 95% of them, 77% moderate to severe [2]. Four national surveys (2015–2022) found the lowest levels in 2022 and credited clean planting material [3]. So CMD can be pushed back, if it is spotted early. Cassava brown streak disease (CBSD), which destroys the root itself, is not yet reported in West Africa but is spreading from Central and East Africa; Ghana is training officers to catch it [4].

The people who could spot disease early are thinly spread. MoFA reports one extension officer per 706 farmers (2021), against a target of 1:500, and calls the shortage "a challenge" [1].

The real need is not "an app". Farmers need a trusted answer about a sick plant on the day they notice it, in their language, without mobile data. Officers need to know which farms to visit first. Cassava Check serves both with one data flow: each farmer's photo is also an early-warning signal for the district.

## 2. Stakeholders and personas

| Stakeholder | Type | Pain point | Design decision it drives |
|---|---|---|---|
| Smallholder cassava farmers | Direct | No officer nearby; no signal on the farm | On-device diagnosis; Twi audio and pictures |
| District extension officers | Direct | ~700 farmers each [1]; late reports | Outbreak map and visit list |
| District agriculture directors | Indirect | Patchy field data | Weekly district export |
| CSIR Crop Research Institute | Indirect | Needs early CBSD warning [4] | "Possible CBSD" always goes to a human |
| Dataset owners (Makerere AI Lab, NaCRRI) | Indirect | Non-commercial terms [7] | Academic use only, cited |

**Primary persona (fictional): Akua Boatemaa, 46, cassava farmer near Somanya, Eastern Region.** She reads a little English, speaks Twi, and shares a low-end Android phone with her family. Her far field has no signal. Evidence: Eastern Region districts joined 2025 cassava virus surveillance training [4]; CMD is widespread [2][3]; officers are few [1].
*Story:* As Akua, a 46-year-old farmer, I want to photograph a leaf and hear the answer in Twi with pictures, even offline, so that I can act the same day instead of waiting weeks for an officer.

**Secondary persona (fictional): Kwame Asante, 31, district extension officer.** He covers hundreds of farmers by motorbike [1] and was trained to report cases on Kobo Collect [4].
*Story:* As Kwame, I want suspected outbreaks mapped and ranked, so that I can plan this week's visits around the worst clusters.

## 3. Proposed system

Cassava Check is an offline-first progressive web app (PWA) plus a district dashboard. A small image model on the phone classifies a leaf photo as healthy, CMD, CBSD, bacterial blight or green mite. The app shows the result, its confidence in words, and next steps in English or Twi with pictures and audio. Below a confidence threshold it says "Not sure. Ask an officer" instead of guessing.

Each result is saved on the phone with a unique ID and a village-level location, then synced when signal returns. The dashboard maps suspected cases for officers and builds a visit list. Every "possible CBSD" goes to human review: a false alarm costs one visit, a missed case could cost a region.

**Honest positioning.** PlantVillage Nuru (Penn State and IITA) already diagnoses CMD and CBSD offline and sends data to dashboards when online [9]. We do not claim a better classifier. Our difference: (1) a triage map built around one officer's workload, (2) sync that is provably safe to retry, with measured availability, and (3) testable inclusive UX (Twi audio, read-back, screen readers, no colour-only status). It shows SE rigour on a proven idea; it is not a rival product.

## 4. Illustrative use case

**Akua checks a sick plant with no signal.**

1. Akua sees mottled, twisted leaves. She opens Cassava Check, installed at a farmer group meeting.
2. She taps the large camera button. Twi audio: "Hold one leaf flat, in daylight."
3. A blur and brightness check passes.
4. The on-device model returns CMD, "very likely", in under two seconds (target).
5. A picture card and audio say: "This looks like mosaic disease. Do not take cuttings from this plant. Use clean cuttings next season." "Read again" repeats it.
6. The report is saved locally. Status reads "Waiting to send (1)", in words and an icon.
7. Two days later, at the market, the phone gets signal and syncs. Status becomes "Sent".
8. Kwame's map shows a new cluster of three CMD reports near Somanya. He adds the area to Thursday's visits.

**Failure path.**
- 4a. Top confidence is below the threshold. The app says "Not sure. Ask an officer" and flags the report for review. It never shows a guessed name.
- 7a. The server saves the report, but the signal drops before the reply arrives. The phone retries with the same idempotency key; the server returns the original result and stores no duplicate. The map shows one case, not two.

## 5. Target users and UX considerations

- **Low literacy:** symptom photos, icons and Twi audio carry the meaning; text is secondary.
- **Language:** English and Twi first; all strings in one file so Ga and Ewe can follow.
- **Low-end phones:** a quantised model of a few megabytes; photos resized on the phone.
- **Poor connectivity:** diagnosis never needs a network; sync retries on its own.
- **Screen readers:** from Visual Access we reuse TalkBack labels, read-back of results, large targets and no status by colour alone.
- **Trust:** confidence shown as "very likely / possible / not sure", not raw percentages.

## 6. Architecture and programming model

**Style: offline-first client with store-and-forward sync, plus a layered server.** Diagnosis must work where there is no network, so the model runs on the device. The outbreak map needs aggregation, so it lives on a server. A cloud-only classifier fails Akua in her field (see below); full peer-to-peer sync is too complex for 3.5 weeks.

```
 Phone (PWA)                                  Server (FastAPI)
 +------------------------------+  HTTPS     +--------------------------+
 | Camera + quality check       | (when      | Sync API: idempotent     |
 | TF.js model, INT8 (intelli-  |  online)   |   POST /reports          |
 |   gent component)            | ---------> | Review queue (CBSD, low  |
 | Advice cards, EN/Twi audio   |            |   confidence)            |
 | IndexedDB outbox + retry     |            | PostgreSQL + PostGIS     |
 +------------------------------+            | Dashboard map (React)    |
                                             +--------------------------+
```

**Programming model.** The phone writes each report to a local outbox, and a background worker sends it: our [transactional outbox](../../../knowledge/transactional-outbox.md) pattern ([learning](../../../learnings/order-notifications-must-be-async-transactional-outbox.md)) moved onto the device. Each report carries a client-made UUID as an [idempotency key](../../../knowledge/idempotency-keys.md), as in our [payments learning](../../../learnings/payments-need-an-idempotency-key.md), enforced by a unique database constraint. Trade-offs follow our [trade-off reasoning note](../../../knowledge/architectural-trade-off-reasoning.md).

**Stack.** FastAPI: Python matches the ML work. PostgreSQL + PostGIS: one boring database that also answers "cases within 5 km". React PWA: installable and offline-cached. Keras transfer learning (MobileNet/EfficientNet-Lite) exported to TF.js: the standard on-device path.

**First-pass availability (component figures ASSUMED, to be measured).** Series: A = A1 × A2 × …; parallel (n replicas): A = 1 − (1 − A)^n.

| Component | Phone + app | On-device model | Rural network | Sync API | PostgreSQL | Host |
|---|---|---|---|---|---|---|
| Assumed A | 0.98 | 0.999 | 0.60 | 0.995 | 0.999 | 0.995 |

- Diagnosis, our design: 0.98 × 0.999 = **0.979**. The network is not in the chain.
- Diagnosis, cloud-only: 0.98 × 0.60 × 0.995 × 0.999 × 0.995 ≈ **0.58**. This is why the model lives on the phone.
- Dashboard, one API instance: 0.995 × 0.999 × 0.995 ≈ **0.989**; two in parallel: (1 − 0.005²) × 0.999 × 0.995 ≈ **0.994**. Database and host then dominate.

Reliability is argued separately: the outbox means no report is lost while the phone survives; idempotency means no retry double-counts. A fault-injection script that drops replies mid-sync will test both.

## 7. Data requirements

| Source | What | Licence |
|---|---|---|
| Kaggle "Cassava Leaf Disease Classification" (2020), Makerere AI Lab and NaCRRI | ~21,000 labelled leaf photos, 5 classes, crowdsourced in Uganda [8] | "Non-commercial purposes only" [7]; accept rules on Kaggle; no redistribution |
| iCassava 2019 [5][6] | 9,430 labelled images; CMD and CBSD are 72% [6] | No dataset licence found; treat as research-only |
| Synthetic reports | Fake reports at random village points for the demo | Ours; no real personal data |

**Domain shift.** All training images are from Uganda. Ghana has different varieties and light, and its CMD is ACMV or mixed ACMV/EACMV [2]. Test accuracy will overstate field accuracy here; we will say so. If time allows, a small consented set of Ghana photos becomes a held-out check.

**Evaluation.** Per-class precision, recall and confusion matrix, since classes are unbalanced [6]. Calibration via reliability diagrams, expected calibration error and temperature scaling, because the "not sure" threshold only works if confidence means something.

**Flows and security.** Photos stay on the phone; only label, confidence, time and village-level location sync, over HTTPS. Officers log in with roles; farmers stay anonymous by device ID.

## 8. Six-week scope

| Must | Should | Won't (this term) |
|---|---|---|
| On-device classifier, per-class metrics, calibration | Twi audio for all advice | Ga, Ewe |
| "Not sure" threshold + review queue | Photo quality check | Photo upload by default |
| Offline outbox + idempotent sync | Cluster detection over time | SMS/USSD channel |
| Dashboard map | District CSV export | Native Android app |
| English UI, TalkBack labels, read-back | Fault-injection report | Large Ghana dataset |

**Plan.** Wk 1 (16–22 Nov): OpenAPI contract, mocks, baseline model, Scrum board. Wk 2 (23–29 Nov): quantised model, PWA camera flow, idempotent sync endpoint. Wk 3 (30 Nov–6 Dec): dashboard map, review queue, calibration, accessibility pass. Wk 4 (7–10 Dec): integration, fault-injection tests, **core demo 10 Dec**. Wk 5 (11–18 Dec): Twi audio, availability measurement, paper and poster, **final and ASERC talk 18 Dec**.

**Parallel work.** The contract for `POST /reports` and `GET /reports?district=` freezes in week 1. *Intelligence* trains in notebooks; *frontend* builds the PWA against a mock model; *backend* builds to the contract; *requirements-ux* writes advice cards and checks accessibility; *quality* writes contract and fault tests; *architecture* owns C4 and availability; *scrum*, *paper* and *presentation* run alongside. Nobody waits until week 4 integration.

## 9. Ethical, legal and social considerations

- **Wrong advice harms livelihoods.** A false "healthy" can spread disease through cuttings. Thresholds, the "not sure" path and forced CBSD review are the safeguards; the app says it is a guide, not a final diagnosis.
- **Data protection.** Location plus device ID can identify a farm. Under Ghana's Data Protection Act, 2012 (Act 843), data controllers must register with the Data Protection Commission [10]. The demo uses synthetic data; a real rollout needs consent, registration and coarse locations.
- **Dataset terms and fairness.** We honour the non-commercial rule [7], cite Makerere and NaCRRI [5], and state that Uganda-trained models may work worse on Ghanaian varieties.
- **Stigma.** An outbreak map could hurt a village's prices, so the dashboard is for officers only.

## 10. Risks

1. **Weak novelty versus Nuru [9].** *Mitigation:* frame the project around dependable sync and district triage, measured; cite Nuru openly.
2. **Domain shift and licence** [7][8]. *Mitigation:* report it, gather a small consented check set, stay academic.
3. **Model too slow on low-end phones.** *Mitigation:* MobileNet-class model, INT8, tested on the team's cheapest phone by week 2.
4. **CBSD is not yet in Ghana [4]**, so that class may only raise false alarms. *Mitigation:* never show CBSD as final; route to review; report its precision separately.

## Sources

1. Ministry of Food and Agriculture, *2022 Programme Based Budget Estimates*, Ministry of Finance, Ghana. https://www.mofep.gov.gh/sites/default/files/pbb-estimates/2022/2022-PBB-MOFA.pdf
2. Torkpo, S. K., Offei, K., Danquah, E. Y., Gafni, Y. (2017). Status of cassava mosaic begomoviruses in farmers' fields in Ghana. *AIMS Agriculture and Food* 2(3), 279–289. https://www.aimspress.com/article/10.3934/agrfood.2017.3.279/abstract.html
3. Oppong, A. et al. (2025). Trend Analysis of Four Cycles of National Cassava Mosaic Disease Surveys in Ghana. *Journal of Agricultural Science* 17(7). https://ideas.repec.org/a/ibn/jasjnl/v17y2025i7p41.html
4. Ghana News Agency (13 Sep 2025). Ghana steps up cassava virus surveillance with CSIR-WAVE training. https://gna.org.gh/2025/09/ghana-steps-up-cassava-virus-surveillance-with-csir-wave-training/
5. Mwebaze, E., Gebru, T., Frome, A., Nsumba, S., Tusubira, J. (2019). iCassava 2019 Fine-Grained Visual Categorization Challenge. arXiv:1908.02900. https://arxiv.org/abs/1908.02900
6. TensorFlow Datasets, "cassava" catalogue entry. https://www.tensorflow.org/datasets/catalog/cassava
7. Hugging Face mirror of the Kaggle Cassava Leaf Disease Classification data, quoting the Kaggle rule "non-commercial purposes only". https://huggingface.co/datasets/pufanyi/cassava-leaf-disease-classification
8. Das, A. S. cassava-leaf-disease-classification (GitHub summary of the 2020 Kaggle data). https://github.com/AkashSDas/cassava-leaf-disease-classification
9. IITA (24 Jun 2018). African farmers get new help against cassava diseases: Nuru, their artificially intelligent assistant. https://iita.org/news-item/african-farmers-get-new-help-against-cassava-diseases-nuru-their-artificially-intelligent-assistant/
10. Data Protection Commission, Ghana. https://dpc.gov.gh/
