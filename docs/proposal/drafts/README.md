# Product concepts: drafts for the team vote (#1)

Five full proposal drafts, one per concept. Each follows the brief's ten sections and ends with its own risks and sources. Vote, then turn the winner into `docs/proposal/proposal.md` (#2) and record the choice in `decisions/`.

| Concept | Problem | The intelligent part | Data | Strongest point | Biggest weakness |
|---|---|---|---|---|---|
| [Twɛn](twen-clinic-queue.md) (clinic queue) | OPD patients wait 2+ hours and arrive at dawn | Wait-time model vs an M/M/c baseline; adaptive "come now" SMS timing | Synthetic, fitted to published Ghanaian OPD studies; Africa's Talking sandbox for USSD/SMS | Reuses our outbox, idempotency and notification work; reaches button phones; easy to demo | Synthetic data; kiosk queue systems and GHS e-booking already exist |
| [Kanea](dumsor-radar.md) (Dumsor Radar) | Small businesses can't plan around power cuts | Calibrated hourly outage forecasts turned into plain actions | nLine GridWatch Accra sensor data (CC BY-NC, API key needed, ends 2023/24) | Best fit for a dependability examiner: grid availability = 1 − SAIDI/8,760 | Raw voltage data needs heavy work; the model may barely beat a baseline |
| [Cassava Check](cassava-check.md) | Mosaic disease on 95% of surveyed farms; 1 extension officer per 706 farmers | On-phone leaf classifier with a "not sure, ask an officer" fallback | Makerere cassava images (Uganda, non-commercial) | Clear visual demo; offline queue with idempotent sync | PlantVillage Nuru already does the core of it |
| [Trotro Voice](trotro-voice.md) | Blind riders depend on the mate to know where to alight | Rider-weighted Dijkstra routing, crowd fare medians, GPS alight prompts | AccraMobility GTFS (ODbL, 2017 fieldwork, no fares) | Continues our Visual Access work and Kofi persona | Old data; safety of a wrong "alight now"; no blind testers lined up |
| [MoMo Shield](momo-shield.md) | MoMo scam texts still get through operator filters | Explainable scam classifier, tuned for recall, with offline rules | Public spam sets + our own ~600 synthetic Ghana messages | Very relatable; cheap to build | No real Ghana labelled data; operators already filter at scale |

## Scored with the brief's grading

The weights come from section 6 of the brief. Each score, from 1 to 5, rates how well the concept positions us to earn that component's marks. Expected grade = Σ(score ÷ 5 × weight). These are the drafting pass's judgements, so change them before the vote.

| Component (weight) | Twɛn | Kanea | Cassava | Trotro | MoMo |
|---|---|---|---|---|---|
| Proposal (10%): evidence citable, data in hand | 4 | 4 | 4 | 4 | 3 |
| Prototype (40%): end-to-end with working AI in 3.5 weeks | 5 | 3 | 4 | 3 | 4 |
| Documentation (10%): material for requirements, UX, C4, tests, reliability | 5 | 4 | 4 | 4 | 3 |
| ACM paper (20%): research question and an evaluation against a baseline | 4 | 5 | 3 | 3 | 2 |
| Presentation and demo (20%): a live demo nothing outside our control can break | 4 | 4 | 5 | 4 | 4 |
| **Expected grade (of 100)** | **90** | **76** | **80** | **68** | **68** |

**Recommendation from the drafting pass: Twɛn (90).**

- **Next best:** Cassava Check (80) has the safest visual demo, but the weakest research angle, because Nuru already exists.
- **Strongest paper:** Kanea (76), but only if the nLine API key arrives by 17 Nov.

Why Twɛn:

- Twɛn is the only concept whose data we fully control, so nothing outside the team can block it.
- Its dependability story is our own Prosit work: the transactional outbox, idempotency keys, and a staff board that keeps running offline.
- The finding that an M/M/c queue model badly underestimates real OPD waits is a ready-made research result for the paper.
- If the team prefers Kanea, request the nLine API key on **16 Nov**.

All five drafts were written with AI and **have not been checked by a person yet**. Before submitting, check each statistic against its source, and confirm the Twi words (*Twɛn*, *Kanea*) with a Twi speaker.
