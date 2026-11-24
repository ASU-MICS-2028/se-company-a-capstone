---
title: USSD and SMS text should stay in the GSM alphabet, so watch for ɛ, ɔ and dashes
date: 2026-11-24
owner: Eric Sunu
tags: [backend, ussd, sms, localisation]
issue: "#44"
---

# USSD and SMS text should stay in the GSM alphabet, so watch for ɛ, ɔ and dashes

## What happened

While writing the contract's USSD length limit (#44), we noticed that the v0.1 example menu started with "Twɛn" and used dashes ("15–30"). Neither ɛ nor the dash is in the GSM 7-bit alphabet, the basic character set phones and networks use for short text.

## What we learned

- Text made only of GSM characters fits the usual limits. One character outside the alphabet can switch the whole message to a wider encoding that holds far fewer characters. For SMS, that is 70 characters instead of 160.
- Twi needs ɛ and ɔ, so Twi screens may get much less room than English ones. How each network handles this for USSD is not something we have checked yet.
- Our own brand name, Twɛn, is one of those characters.

## Do this next time

- Write English menus and texts with plain hyphens and "Twen".
- Test every Twi screen in the Africa's Talking sandbox (#53) and shorten it if it gets cut.
- Keep the 160-character rule in a test that checks every screen.

## Related

- [API contract](../docs/architecture/openapi.yaml), `/gateway/{secret}/ussd`
