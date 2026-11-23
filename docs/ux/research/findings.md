# User research findings (#29)

**Status:** draft. The interviews and the literature are in. The survey results get added after it closes on 26 Nov.
**Owner:** Liza Aikins. Used by: requirements (#5), personas and wireframes (#6), the data generator (#9), and the paper's Methodology and Results (#13).

## Where the evidence comes from

| Source | What it is | What it can support |
|---|---|---|
| Interviews | Two, at one community health centre on 23 Nov: a nurse ([S01](interviews/2026-11-23-S01-nurse-health-centre.md)) and a patient ([P01](interviews/2026-11-23-P01-patient-health-centre.md)) | Needs and workflows that the studies don't cover. It can't show that long waits happen, because this site has no queue. |
| Survey A and B | Convenience sample, open 24–26 Nov, target 20 or more patients (at least 5 read aloud) | Phones, travel, cost of a visit, willingness to act on a text |
| Published studies | Korle-Bu [1], Techiman [2], Obuasi [3], news [4] | The problem itself: how long waits are, early arrival, and where the bottlenecks are |

We stopped at two interviews. See the [decision](../../../decisions/2026-11-23-stop-interviews-use-survey-and-literature.md).

## The problem (from the literature)

- At Korle-Bu, 56.4% of 274 sampled outpatients waited 120 minutes or more. Arriving early was common (43.4%) and went with *longer* waits, as did Monday visits [1].
- At Holy Family Hospital, Techiman, the average OPD wait was 2 h 50 min. Records was the slowest stage, at a mean of 74.5 min [2].
- At AngloGold Ashanti Hospital, Obuasi, the OPD saw about 475 patients over 9 hours, with consultations of about 5 minutes [3].
- No study we found measures the income people lose by waiting. Survey question A2 is meant to fill that gap.

## What we learned

Each finding names its evidence and what it changes.

### F1. People don't know whether the prescriber is in until they arrive
- **Evidence:** both interviews, raised independently. The patient: "they will tell you, 'Oh, doctor is not around'… you pass through all the procedures, then when you get there…". The nurse: staff know when the prescriber is on leave, but "you can't tell the community".
- **Strength:** two of two interviews. Not in the literature we cited.
- **Changes:** add a "service status today" item (prescriber in or away, services open), shown in the USSD menu and on the staff board, which staff can update in one step. Candidate story for #5: *As a patient, I want to know whether the prescriber is in before I travel, so that I don't make a wasted trip.* It could matter to patients as much as the queue ticket.

### F2. Travel time depends on transport, not distance
- **Evidence:** P01 lives minutes away but sometimes waits about an hour at the roadside for a car.
- **Changes:** the "come now" text needs a buffer for waiting for transport, not just distance. Survey question A3 measures door-to-clinic time, and A8 measures how soon people can set off. Use both, and treat P01's case as the tail the buffer must cover. For the data generator (#9), draw travel time from a long-tailed distribution, not from distance.

### F3. A visit costs the patient their work time, even when someone covers for them
- **Evidence:** P01 runs her own business with a worker and still has to step away. Employees have to ask permission to leave.
- **Changes:** this supports the problem statement. Survey A2 will put numbers on it.

### F4. Emergencies must bypass booking
- **Evidence:** P01: "but sometimes emergency…".
- **Changes:** an explicit requirement that walk-in and emergency patients are never blocked or pushed back by bookings. It already fits the staff-only priority override in the proposal (§3, §9).

### F5. The staff side is paper-based, and one nurse does every job
- **Evidence:** S01. The nurse fetches folders, takes vitals, consults, prescribes and dispenses. A folder can't be found without the patient's card unless the visit was recent. One computer is broken, and the other is used only for NHIS claims. When asked what would help, she named a front desk, someone to fetch folders and someone to dispense.
- **Strength:** one site, but it matches records being the slowest stage at Techiman [2].
- **Changes:** the staff board must take seconds to use and must not add data entry. Something like "call next" and "set status" should be all a nurse does. Running offline on one low-end device stays a hard requirement. Out of scope: digitising folders.

### F6. Demand varies by weekday and by season
- **Evidence:** S01. Mondays and Tuesdays are busiest. November and December are quiet, and January brings a surge. Many people try herbal remedies or a pharmacy first. This matches the Monday effect at Korle-Bu [1].
- **Changes:** the data generator (#9) gets day-of-week and month effects. Note for the evaluation: a demo or pilot in December would see unusually low demand.

### F7. Smaller facilities aren't our target
- **Evidence:** S01 sees 15–20 patients a day, sometimes none, and nobody waits.
- **Changes:** keep the scope on hospital and polyclinic OPDs, as in the proposal. F1 (service status) could still help health centres on its own.

### F8. Trust in a particular person matters
- **Evidence:** S01. Some patients prefer the nurse to the prescriber. Patients in the community visit the nurse's house instead of calling.
- **Changes:** messages should name the facility and sound personal, not automated. Note this for the message templates (#6). No feature change.

## Survey results

*To fill in after 26 Nov. Report:*
- The number of responses, and how they were collected (A0), including how many were read aloud.
- Answers to questions A1, A2 and A4, and to questions A5 and A8 side by side.
- The share choosing "nurse decides" in A10 and "same order" in A11.
- The staff answers to B1–B7.

Check A1 and A7 against Korle-Bu (56.4% waiting 2 h or more; 43.4% arriving early).

## How this changes personas and requirements

| Item | Change | Source |
|---|---|---|
| Requirements (#5) | New: service status (prescriber in or away), updated in one step by staff | F1 |
| Requirements (#5) | New: emergencies and walk-ins are never blocked by bookings | F4 |
| Requirements (#5) | Non-functional: a staff action takes 2 taps or fewer, adds no new data entry, and works offline on one device | F5 |
| Notification timing | Buffer covers waiting for transport, informed by A3 and A8 | F2 |
| Data generator (#9) | Weekday and month effects; long-tailed travel time | F2, F6 |
| Personas (#6) | Patient persona: self-employed, close to the clinic but dependent on transport. Staff persona: a nurse covering every role, paper-first. | F2, F3, F5 |

## Threats to validity

- **Interviews:** only two, at one low-volume health centre, on one day. Neither person had a long OPD wait. We pitched the booking idea early in P01, so her "I would use it" is weak evidence.
- **Survey:** a convenience sample. People who answer through WhatsApp have smartphones, so the read-aloud responses are reported separately.
- **Literature:** the studies cover three hospitals and may not represent urban polyclinics.
- **Transcription:** the interviews were transcribed and translated from Twi by an AI tool (Gemini) and checked by the interviewers.

## References

1. Elemoah D, Abeasi DA, Agyei FB, Sasemame ES, Akumiah PO. "The waiting game: determinants and effects of OPD service delays in a Tertiary Health Facility." *BMC Health Services Research* 25:1545 (2025). https://doi.org/10.1186/s12913-025-13594-9
2. Appiah K. *Patient Satisfaction with Waiting Time at the Out Patient Department (OPD), Holy Family Hospital, Techiman.* MPH thesis, University of Ghana (2019). https://ugspace.ug.edu.gh/handle/123456789/30766
3. Afrane S, Appah A. "Queuing theory and the management of waiting-time in hospitals: The case of AngloGold Ashanti Hospital in Ghana." *IJARBSS* 4(2) (2014).
4. Osei-Frempong S. "The long wait at Ghana's hospitals." Ghana News Agency, 10 May 2026 (news commentary).
