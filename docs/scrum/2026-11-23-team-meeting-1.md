# Team meeting 1 (23 Nov 2026)

**Type:** working session and Sprint 2 kick-off, held just before the health-centre visit.
**Present:** Joseph Etse, Liza Aikins, Henry Kofi Brandoh, Kobina Opei Jr., and Eric Sunu (who joined part-way through).
**Record:** an AI-generated transcript, kept privately. The speaker labels in the transcript are uncertain, so these notes record only what the team agreed.

## What we covered

1. **Walkthrough of the product and proposal** for members who hadn't read it in full:
   - Twɛn is a virtual OPD queue. Patients join by USSD, SMS, web or at the desk, and get a "come now" SMS timed to their travel time.
   - Staff work from an offline-capable board.
   - Priority (pregnant women, older people, emergencies) is always a staff decision.
2. **Intelligent component.** A gradient-boosting model predicts the remaining wait. It is compared with an M/M/c queueing model and a naive rule (position × mean service time ÷ staff), scored by MAE and by the share of predictions within ±15 minutes. The comparison tests whether a learned model is needed at all.
3. **Where to find your work.** The README shows who owns what, each person's tasks are in Issues, and the Project board shows progress. Roles were assigned at random, so anyone can swap with another member if both agree.
4. **Channels.** USSD and SMS stay the core because they work without data. A WhatsApp chatbot was raised and set aside: it needs data, and Meta business-account approval is slow.
5. **UI quality.** To avoid generic, AI-looking screens, collect 2–3 reference designs from Mobbin, Dribbble or Godly and give them to the design tool along with the brief.
6. **User research site.** The local health centre is the only site we can reach in the time we have, so a teaching hospital is out. We went the same day rather than on Wednesday or at the weekend.

## Decisions

| Decision | Recorded in |
|---|---|
| Go to the local health centre today with four people for interviews and observation | [P01](../ux/research/interviews/2026-11-23-P01-patient-health-centre.md), [S01](../ux/research/interviews/2026-11-23-S01-nurse-health-centre.md) |
| Keep USSD and SMS as the core channels; no WhatsApp bot | Consistent with the proposal; no new decision file needed |
| Roles stay as assigned. Swaps only by agreement between the two members, then recorded in `decisions/` | [roles decision](../../decisions/2026-11-23-product-owner-is-the-instructor.md) |

## Roles confirmed in the meeting

| Person | Work |
|---|---|
| Liza Aikins | User research (#29), which feeds requirements (#5) and personas (#6) |
| Henry Kofi Brandoh | Intelligent component (#9): the gradient-boosting model plus the M/M/c and naive baselines |
| Kobina Opei Jr. | Frontend built from the designs (#10), and integration of the frontend, backend and model (#18) |
| Micheal Boadi | Usability testing (#30), quality assurance, and the live demo (#16) |
| Eric Sunu | Architecture and backend (#7, #8) |
| Joseph Etse | Scrum Master (#3, #15) |

## Ideas parked for later

- **Seasonal demand forecast.** Use visit records to predict seasonal spikes (for example malaria) so facilities can plan staff. Not in Sprint 2. It fits finding F6 (Monday, Tuesday and January peaks), so Henry looks at it only if the data allows, after the baselines.

## Actions

| Action | Owner | Status |
|---|---|---|
| Refine the survey questions before the visit | Liza | Done ([survey sheets](../ux/research/survey.md)) |
| Arrange transport to the health centre | a team member | Done |
| Visit the health centre for interviews and observation | Joseph, Liza, Henry, Kobina | Done: P01, S01 and photos |
| Lead user research and hand it over to #5 and #6 | Liza | In progress ([findings](../ux/research/findings.md)) |
| Build the wait-time model and compare it with the baselines | Henry | Sprint 2 backlog items 7–8 |
| Collect 2–3 UI reference designs | Kobina | Open |
