# MoMo Shield: a plain-language scam checker for mobile-money SMS

Nyansapo Systems · ICS 530 · Draft proposal · 15 Nov 2026 · Status: for team vote

## 1. Problem statement and motivation

Mobile money is how Ghana pays: GH¢3.01 trillion moved through it in 2024, up 56.8% on 2023 [2]. Fraud follows the money. The Bank of Ghana put cyber and tech-related fraud losses at just under GH¢10 million in 2024, up from GH¢8.9 million [1]. Its 2023 review counted 13,451 fraud cases, about 20% of them mobile money [3]. These are reported cases only.

The commonest trick is simple. A fake "you have received money" SMS arrives from an ordinary phone number. A call follows: "I sent money to your number by mistake, please send it back." The victim sends their own money [6].

Operators filter at the network. Mobile Money Limited says its keyword rules block over 400,000 scam texts a day [5]. MTN uses machine learning, but says scammers now misspell words on purpose to slip past [4]. What gets through leaves the user as the last defence. The Ghana Chamber of Telecommunications is quoted as saying over half of users have limited awareness of scam tactics [3].

The real need is not "an app". It is **a second opinion, in a language the person understands, at the moment they decide whether to send money back**, with a reason that teaches the pattern.

## 2. Stakeholders and personas

| Stakeholder | Type | Need | Design decision it drives |
|---|---|---|---|
| MoMo users with low digital literacy, older users, traders | Direct | Tell fake alerts from real ones | One-word verdict; reason read aloud in English or Twi |
| Consumer-protection analyst (regulator or NGO desk) | Direct | Spot scam waves early | Dashboard of confirmed reports by type and week |
| Family helpers | Indirect | Protect relatives | Share verdict to WhatsApp |
| Mobile-money operators | Indirect, high power | Filters evaded by misspellings [4] | Exportable new patterns |
| Data Protection Commission | Indirect, high power | Lawful processing | Paste-only input, masked storage |
| Scammers | Adversary | Evade detection | Public app shows reasons, not model weights |

**Primary persona (fictional): Maame Akua Boateng, 63, provisions seller, Kumasi Central Market.** She reads basic English slowly and prefers Twi. Customers pay her by MoMo all day, so a "money received" SMS is normal and she rarely checks it. A pleading caller rushes her judgement. Evidence: scams pair a fake alert with a "sent by mistake" call [6]; real alerts come from a "Mobile Money" sender name, a detail hurried users miss [6]; awareness of scam tactics is low [3].

> As Maame Akua, 63, I want to paste a message and hear in Twi whether it is real and why, so that I never send back money I did not receive.

**Secondary persona (fictional): Efua Owusu, 34, fraud-awareness officer at a consumer-protection body.** She hears of new scams weeks late and wants counts by type and example wording, without personal data.

## 3. Proposed system

MoMo Shield is a mobile web app (PWA). The user pastes or shares a suspicious SMS and answers one question: "Who sent it: a name like *MobileMoney*, or a phone number?" The app answers **Scam**, **Looks real** or **Not sure**, with one reason, for example: "Real MoMo credits come from the Mobile Money name, not a phone number. Check your balance before sending anything back." The reason is shown in large text and read aloud.

The intelligent part is a **text classifier with explanations**. TF-IDF features (word and character n-grams, since scammers misspell on purpose [4]) feed a logistic regression. A small rule layer adds facts the text cannot show, such as sender type or a PIN request. The explanation combines rule hits with the words that raised the score most (coefficient × feature value), mapped to about ten fixed reason templates. Fixed templates can be checked by a person and recorded in Twi in advance.

Tapping **Report** sends the masked message to a review queue. Confirmed reports feed a **scam-pattern dashboard**: reports per type per week and example wording. A small multilingual transformer is a stretch goal, kept only if it beats the baseline.

## 4. Illustrative use case

1. Maame Akua receives: "You have received GHS 450.00 from KWAKU A. Your new balance is GHS 1,212.40." A man calls, upset, saying he sent it by mistake.
2. She asks him to wait, long-presses the SMS, taps **Share** and picks MoMo Shield.
3. Two large buttons appear. She taps "A phone number".
4. The API scores the masked text 0.97 scam. Rules hit "sender is a phone number" and "balance claim".
5. The screen shows **SCAM** in words and an icon, never colour alone. Twi audio explains that real credits come from the Mobile Money name and tells her to check her real balance first.
6. She checks. No GHS 450 arrived. She hangs up.
7. She taps **Report**. The report carries an idempotency key.
8. That evening Efua confirms it on the dashboard and the week's "fake credit + mistaken transfer" count rises.

**Failure path: no signal at step 4.** After a 4-second timeout the PWA runs the same rules locally, cached with the app. It shows "**Likely scam** (checked on your phone only)" with the same reason and audio. The report waits in a browser queue and is sent when signal returns; the idempotency key stops a retry counting twice. If a score falls between thresholds, the app says **Not sure**: "Do not send money until you see it in your balance."

## 5. Target users and UX considerations

- **Low literacy:** one-word verdict, icon plus text, audio on by default, no jargon.
- **Twi:** reasons are fixed, so a Twi-speaking team member records them. We avoid machine translation for safety messages. Meta's Akan TTS model exists [13] but is non-commercial and untested, so it is optional.
- **Older users:** large text, two-choice screens, 48 px targets.
- **Screen readers:** from Visual Access we reuse semantic HTML, TalkBack-tested labels, and verdicts announced via an ARIA live region.
- **Poor data:** small PWA, offline rules mode, payload under 2 KB.
- **Feature phones:** about a quarter of Ghanaians aged 15+ lack a functional smartphone [14]. We cannot reach them this term and say so.

## 6. Architecture and programming model

We use a **layered client-server design with a stateless prediction API**. Classification needs no database, so it fails independently of reporting, which is a separate write path. Microservices are not justified for one small model in six weeks ([trade-off reasoning](../../../knowledge/architectural-trade-off-reasoning.md)).

```
[PWA: React, service worker, local rules, report queue]
      | HTTPS/JSON                 \ offline -> local rule engine
      v
[FastAPI] --/classify--> [in-process model: TF-IDF+LR, rules, explainer]
      +----/reports (idempotency key)--> [PostgreSQL] <-- [Dashboard, analyst login]
```

**FastAPI:** the model is Python, and we get an OpenAPI contract free. **scikit-learn:** fast, small, and LR coefficients explain themselves. **PostgreSQL:** a unique constraint enforces the [idempotency key](../../../knowledge/idempotency-keys.md). **React PWA:** share target and offline cache without app-store review.

**First-pass availability. All figures ASSUMED; to be replaced by measurements.** Static host 0.999; API host (student tier) 0.99; managed PostgreSQL 0.995; local rules on a device with the cached app 0.999.

Series: A = A1 × A2 × … Parallel: A = 1 − (1 − A1)(1 − A2).

- Full-quality verdict: 0.999 × 0.99 = **0.989** (about 96 hours down a year).
- Any verdict after install: 1 − (1 − 0.989)(1 − 0.999) = **0.99999**.
- Dashboard: 0.999 × 0.99 × 0.995 = **0.984**.

Caveat: the fallback is *degraded*; rules alone miss scams the classifier catches, so we report both numbers and measure rules-only recall. The dashboard can accept lower availability because nobody loses money while viewing it ([performance versus reliability](../../../knowledge/performance-versus-reliability.md)).

## 7. Data requirements

| Source | Size | Licence | Use |
|---|---|---|---|
| UCI SMS Spam Collection [8] | 5,574 (747 spam) | CC BY 4.0 | General spam signal |
| Mishra & Soni SMS Phishing [9] | 5,971 (638 smishing) | CC BY 4.0 | Smishing vs spam vs ham |
| Smishtank [10] | 1,062 smishing | Not stated; ask first | Optional |
| Salman et al. [7] | 153,551 | "Will release"; no download found | Only if obtained |
| Our Ghana-style synthetic set | ~600 (estimate) | Ours | Fine-tuning and **main test set** |

No public set is Ghanaian; UCI's spam is from a UK forum and its ham from Singapore students [8]. The synthetic set carries the Ghana signal. **Labelling protocol:** (1) a codebook with five scam types (fake credit, mistaken transfer, fake promo, fake reversal or agent, PIN/OTP request) and legit types (real alerts, personal messages); (2) scams written from patterns in public reports [4][5][6], never copied from victims; (3) legit alerts follow real formats with every name, number, amount and ID replaced; (4) two people label each message blind, we report Cohen's kappa, and a third resolves disagreements; (5) test messages are written by different members than training messages, so the model cannot learn one author's style.

**Evaluation.** Precision, recall and F1 for the scam class, plus a cross-domain test (train on public data, test on Ghana data); that gap is a paper finding. **False negatives cost more than false positives:** a missed scam can cost a trader a day's takings, while a false alarm costs a balance check. So we tune for scam recall (target ≥ 0.95, not a result) and soften lower precision with the "Not sure" band.

**Related work.** The CMU-Africa honeynet (Lamptey et al.) collects real smishing from SIMs in Ghana and four other countries [6]. Its availability is not stated; we will ask, but do not depend on it.

**Flows and security.** The client masks phone numbers, names and amounts before sending. `/classify` stores nothing. `/reports` stores masked text, sender type, verdict and time. HTTPS throughout; analysts log in and see masked text only.

## 8. Six-week scope

| Must | Should | Won't (this term) |
|---|---|---|
| Paste/share → verdict + reason | Twi audio for all reasons | Auto-reading the SMS inbox (Section 9) |
| Classifier + rules + explanations | Transformer comparison | SMS/USSD channel (needs paid short code) |
| English audio; Twi for top 3 reasons | Pattern CSV export | Voice-call scam detection |
| Offline fallback + queued reports | Role-play usability test (5 people) | Real victim data |
| Dashboard; evaluation report; tests | | |

- **Sprint 1 (16–22 Nov):** OpenAPI contract and mock; codebook; 300 labelled messages; baseline model; wireframes.
- **Sprint 2 (23–29 Nov):** real `/classify`; verdict screen; masking; shared rule layer.
- **Sprint 3 (30 Nov–6 Dec):** explanations, audio, reports, dashboard, offline mode, full metrics.
- **Sprint 4 (7–10 Dec):** hardening, accessibility pass, deploy. **Core demo 10 Dec.**
- **11–18 Dec:** usability round, paper, poster, talk. **Final and ASERC 18 Dec.**

**Parallel work.** The contract is fixed on day 2. Frontend and requirements-UX build against a mock returning fixed verdicts. Intelligence delivers a `model.pkl` behind the same interface. Backend owns API and database; quality writes tests from the spec. Paper and presentation start in Sprint 1.

## 9. Ethical, legal and social considerations

- **Reading SMS.** Inbox access would expose bank OTPs and private messages. Google Play also limits SMS permissions to default SMS apps, and its anti-smishing exception needs a proven track record [11]. So we use **paste or share only**: the user chooses one message.
- **Data Protection Act, 2012 (Act 843)** requires purpose specification, security safeguards, prior consent, processing that is "necessary, relevant, and not excessive", and registration with the Data Protection Commission [12]. We store nothing on `/classify`, store masked text only for reports, and ask consent at the Report tap. Real deployment would need registration; this project uses synthetic data only.
- **Error harm.** The app never says "safe"; "Looks real" always comes with the balance-check advice.
- **Inclusion.** Twi first; Ewe, Ga, Dagbani and other speakers are not yet served.
- **Dual use.** Exact rules teach scammers what to avoid, so the dashboard is restricted.

## 10. Risks

1. **Scarce Ghana-specific labelled data (highest).** Models trained on UK and Asian spam may miss MoMo scams, and a clean synthetic set may inflate scores. *Mitigation:* cross-domain test, separate test authors, rules for the best-known pattern, a request to CMU-Africa, and a plain limitation in the paper.
2. **Operators already filter** [4][5]. *Mitigation:* we target what gets through, explain why in Twi, and give analysts a cross-network view. If that seems thin, this concept should lose the vote.
3. **Twi audio quality.** *Mitigation:* native-speaker recordings of fixed templates; English always available.
4. **Over-trust.** *Mitigation:* no "safe" verdict, the "Not sure" band, and wording tested with users.

## Sources

1. Graphic Online, "Mobile money and bank fraud cost Ghana GH¢10m in 2024 — BoG to tighten cyber watch", 8 May 2025. https://www.graphic.com.gh/business/business-news/mobile-money-and-bank-fraud-cost-ghana-ghc10m-in-2024-bog-to-tighten-cyber-watch.html
2. MyJoyOnline, "Mobile money transactions hit GH¢3trn as digital payments surge – BoG report", 15 Dec 2025. https://www.myjoyonline.com/mobile-money-transactions-hits-gh%C2%A23trn-as-digital-payments-surge-bog-report/
3. D. N. Armaah, "The data-driven truth about financial scams in Ghana", MyJoyOnline, 19 Apr 2025 (cites BoG 2023 Financial Stability Review and Ghana Chamber of Telecommunications). https://myjoyonline.com/the-data-driven-truth-about-financial-scams-in-ghana
4. MyJoyOnline, "MTN deploys AI to detect and block fraudulent mobile money messages", 14 Jan 2026. https://www.myjoyonline.com/mtn-deploys-ai-to-detect-and-block-fraudulent-mobile-money-messages/
5. The Ghana Report, "Over 400,000 scam texts blocked daily – Mobile Money Ltd" (year not shown on page). https://theghanareport.com/over-400000-scam-texts-blocked-daily-mobile-money-ltd
6. CMU-Africa, "A honeynet infrastructure to battle SMS scammers", Oct 2024 (Lamptey et al., COMPASS '24 demo). https://www.africa.engineering.cmu.edu/news/2024/10/10-smishing.html
7. M. Salman, M. Ikram, M. A. Kaafar, "An Empirical Analysis of SMS Scam Detection Systems", arXiv:2210.10451, 2022. https://arxiv.org/abs/2210.10451
8. UCI Machine Learning Repository, "SMS Spam Collection", 2012, CC BY 4.0. https://archive.ics.uci.edu/dataset/228/sms+spam+collection
9. S. Mishra, D. Soni, "SMS Phishing Dataset for Machine Learning and Pattern Recognition", Mendeley Data, 2022, CC BY 4.0. https://data.mendeley.com/datasets/f45bkkt8pr/1
10. "Smishing Dataset I: Phishing SMS Dataset from Smishtank.com", arXiv:2402.18430. https://arxiv.org/html/2402.18430v2
11. Google Play Console Help, "Use of SMS or Call Log permission groups". https://support.google.com/googleplay/android-developer/answer/10208820
12. Wikipedia, "Data Protection Act, 2012" (Ghana, Act 843), summarising sections 17, 19, 20, 27. https://en.wikipedia.org/wiki/Data_Protection_Act,_2012
13. Meta AI, "facebook/mms-tts-aka" (Akan TTS, CC BY-NC 4.0), Hugging Face. https://huggingface.co/facebook/mms-tts-aka
14. Graphic Online, "Digital exclusion: Five million people in Ghana offline, census reveals", 4 Jun 2023. https://graphic.com.gh/tech-news/digital-exclusion-five-million-people-in-ghana-offline-census-reveals.html
