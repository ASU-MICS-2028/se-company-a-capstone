# User research findings (#29)

**Status:** draft. The interviews, the literature and the survey (closed 26 Nov) are all in.
**Owner:** Liza Aikins. Used by: requirements (#5), personas and wireframes (#6), the data generator (#9), and the paper's Methodology and Results (#13).

## Where the evidence comes from

| Source | What it is | What it can support |
|---|---|---|
| Interviews | Two, at one community health centre on 23 Nov: a nurse ([S01](interviews/2026-11-23-S01-nurse-health-centre.md)) and a patient ([P01](interviews/2026-11-23-P01-patient-health-centre.md)) | Needs and workflows that the studies don't cover. It can't show that long waits happen, because this site has no queue. |
| Surveys A, B and C | Convenience sample, open 23–26 Nov. 7 responses: 3 patients, 3 staff, 1 administrator. Target was 20 or more patients, with at least 5 read aloud. | Staff workflow, outages and devices; patient travel and lead time. Too small and too skewed for percentages. |
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

The raw responses are in private Drive (`Field research/Survey results 2026-11-27 (private)`), not in this repo.

**Who answered.** 7 people: 3 patients (A), 3 OPD staff (B: a doctor or physician assistant, a nurse, a public health officer) and 1 administrator (C). All 3 patients filled the form on their own smartphone, and all were under 40. **None were read aloud**, so we missed the target of 20 patients with 5 read aloud. Everything below is a signal to check, not a measurement. With n = 3, we report counts, never percentages.

### Patients (Survey A, n = 3)

| Question | Answers |
|---|---|
| A1. Total wait, last visit | 1–2 h (2), more than 4 h (1). So 1 of 3 waited 2 h or more (Korle-Bu: 56.4% [1]). |
| A2. Cost apart from fees | Lost work or income, paid for child or work cover, extra transport or food (1); time and stress (1); nothing (1) |
| A3. Door to clinic, including waiting for transport | 15–30 min, 30–60 min, 1–2 h |
| A8. Time needed to set off after "Come now" | 15 min, 30 min, an hour or more |
| A3 + A8 (lead time a "come now" text needs) | Roughly 45 min, 1 h, and 2–3 h. **A spread of about 2 hours across three people.** |
| A4. Phone | Smartphone (3) |
| A5. Would use a phone ticket and a text | Likely (3) |
| A7. Arrival time | 8–10 a.m. (2), don't remember (1) |
| A9. Used a code like *170# alone | Yes (3) |
| A10. Who decides who is seen first | "A computer system, by fixed rules" (2), not sure (1). **Nobody chose the nurse.** |
| A11. Phone joiners ahead of walk-ins? | Yes (1), not sure (2) |
| A12. Reading a text is hard | No (3) |
| A14. Language for messages | English (3) |
| A6. What would make waiting easier (free text) | Details already on file, even at a new facility; a more comfortable waiting area |

### Staff (Survey B, n = 3)

| Question | Answers |
|---|---|
| B1. Patients before noon | 50–150 (2, both public hospitals), under 50 (1, university clinic) |
| B2. Consultation length | More than 20 min (2), 10–20 min (1) |
| B3. Slowest stage for patients | Waiting for the doctor (3) |
| B4. How the next patient is chosen | Order of arrival (2), order of folders (1), numbered tickets (1), nurse judges urgency (1) |
| B5. Who can move a patient ahead | Any nurse on duty (2), only the nurse-in-charge (1) |
| B6. Called patient not there | Called again later (2), folder goes to the back (1) |
| B7. Internet or power cuts during clinic hours | About once a week (2), about once a month (1) |
| B8. Devices staff can use | Desktop computer (3); one also has a laptop and a tablet |
| B9. Would never accept (free text) | A system that breaks the clinic's queueing rules; a system with no chit showing the patient's code |

### Administrator (Survey C, n = 1)

Records patient flow in a paper register. Wants three daily numbers: average wait, patients seen per hour, and staff on duty against demand, on a screen or dashboard. The main barrier would be unreliable internet. It would be worth it if it "will ease up the crowded and long waiting periods".

### What the survey adds

#### F9. Staff say the bottleneck is the doctor, not records
- **Evidence:** B3, 3 of 3. Two public-hospital staff report consultations over 20 minutes.
- **Strength:** small, but unanimous. It differs from Techiman, where records was slowest [2], and from Obuasi's 5-minute consultations [3].
- **Changes:** the data generator (#9) should allow longer, more variable consultation times (a 10–25 minute range, not 5). It supports the product idea: the wait can't be removed, but it can be spent somewhere else.

#### F10. Lead times vary by hours, so one fixed buffer won't work
- **Evidence:** A3 + A8 range from about 45 minutes to 2–3 hours across three patients. This matches F2 (P01's roadside wait).
- **Changes:** keep the patient-chosen travel band (a Must). The "come now" text uses the band, not a single default. This is the core of paper question 3.

#### F11. Outages are weekly, so offline matters more than the scope cut assumed
- **Evidence:** B7: weekly (2), monthly (1). The administrator names unreliable internet as the main barrier. S01 runs on paper.
- **Changes:** the offline staff board is a **Should** in the proposed scope cut. This is evidence for moving it up. Raise it at the scope review; no change is made here.

#### F12. Patients want fixed rules, and staff want their rules respected
- **Evidence:** A10: 2 of 3 patients want priority decided by fixed rules, none by a nurse. B5: nurses move patients today. B9: staff would reject a system that breaks the clinic's queueing rules.
- **Changes:** keep priority as a staff action, but make it rule-based and visible: staff pick a reason from a fixed list (pregnant, older person, emergency), and the reason is logged (`actorId` in the contract). That gives patients the "fixed rules" they asked for without taking the decision from staff. A11 shows no agreement on putting phone joiners first, so keep one shared order.

#### F13. Every desk ticket needs a code on paper
- **Evidence:** B9: staff would reject a system without a chit showing the patient code. B6: a missed call today means "called again later" or "to the back".
- **Changes:** desk tickets (a Must) must produce a code staff can write or print on a chit. It confirms the `^[A-Z]-[0-9]{3}$` short code and the hold window (`holdUntil`, `graceMinutes`) in the contract.

#### F14. The staff board must run on a desktop browser
- **Evidence:** B8: all 3 have a desktop computer; only 1 has a tablet.
- **Changes:** design and test the board for a desktop browser first, and then a phone. Don't assume a tablet.

#### F15. Administrators want three numbers, not a report
- **Evidence:** C2–C3 (n = 1): average wait, patients per hour, staff against demand, on a dashboard.
- **Changes:** if the admin report (a Could) gets built, it is these three numbers on the staff board. No other report.

### What the survey could not answer

- **Whether people without smartphones can use USSD** (the scope review's first question, via A4). All 3 patients had smartphones and answered online. The sample can't show the split, so the case for USSD still rests on the literature and on our design goal, not on this survey.
- **A1 and A7 against Korle-Bu.** 1 of 3 waited 2 h or more, and 2 of 3 arrived 8–10 a.m. Three answers can't confirm or contradict the study.

## How this changes personas and requirements

| Item | Change | Source |
|---|---|---|
| Requirements (#5) | New: service status (prescriber in or away), updated in one step by staff | F1 |
| Requirements (#5) | New: emergencies and walk-ins are never blocked by bookings | F4 |
| Requirements (#5) | Non-functional: a staff action takes 2 taps or fewer, adds no new data entry, and works offline on one device | F5 |
| Notification timing | Buffer covers waiting for transport, informed by A3 and A8 | F2 |
| Data generator (#9) | Weekday and month effects; long-tailed travel time | F2, F6 |
| Personas (#6) | Patient persona: self-employed, close to the clinic but dependent on transport. Staff persona: a nurse covering every role, paper-first. | F2, F3, F5 |
| Requirements (#5) | Priority changes use a fixed list of reasons and are logged with who made them | F12 |
| Requirements (#5) | Every desk ticket gives a short code that staff can write or print on a chit | F13 |
| Requirements (#5) | Non-functional: the staff board works in a desktop browser first | F14 |
| Data generator (#9) | Consultations of 10–25 minutes, not 5 | F9 |
| Scope review | Evidence to move the offline board from Should towards Must | F11 |

## Threats to validity

- **Interviews:** only two, at one low-volume health centre, on one day. Neither person had a long OPD wait. We pitched the booking idea early in P01, so her "I would use it" is weak evidence.
- **Survey:** 7 responses, a convenience sample shared through WhatsApp. All 3 patients answered online on smartphones and were under 40; none were read aloud. The sample leaves out exactly the people USSD is for, so no phone-type claim can be made from it. Staff work at different kinds of facility (public hospitals and a university clinic), so their answers describe no single site.
- **Literature:** the studies cover three hospitals and may not represent urban polyclinics.
- **Transcription:** the interviews were transcribed and translated from Twi by an AI tool (Gemini) and checked by the interviewers.

## References

1. Elemoah D, Abeasi DA, Agyei FB, Sasemame ES, Akumiah PO. "The waiting game: determinants and effects of OPD service delays in a Tertiary Health Facility." *BMC Health Services Research* 25:1545 (2025). https://doi.org/10.1186/s12913-025-13594-9
2. Appiah K. *Patient Satisfaction with Waiting Time at the Out Patient Department (OPD), Holy Family Hospital, Techiman.* MPH thesis, University of Ghana (2019). https://ugspace.ug.edu.gh/handle/123456789/30766
3. Afrane S, Appah A. "Queuing theory and the management of waiting-time in hospitals: The case of AngloGold Ashanti Hospital in Ghana." *IJARBSS* 4(2) (2014).
4. Osei-Frempong S. "The long wait at Ghana's hospitals." Ghana News Agency, 10 May 2026 (news commentary).
