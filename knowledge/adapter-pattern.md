---
title: Adapter pattern
tags: [patterns, structural, integration]
source: "Lecture 11; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Adapter pattern

**Adapter** is a structural Gang of Four pattern. It converts one interface into the one your code expects, so two classes that don't match can work together. Think of a travel plug adapter.

**Two kinds:**

- **Class adapter:** uses inheritance (it extends the class it adapts).
- **Object adapter:** uses composition (it wraps an instance and maps calls onto it).

**Practical uses:**

- **Several payment SDKs** (software development kits, each with its own methods): one adapter exposes a single `pay()` method and maps the inputs to whichever SDK is in use.
- **Several cloud storage vendors** behind one interface.
- **Legacy systems:** tap into an old system's services instead of rebuilding it.
- **Data formats:** a SOAP API returns XML, but the system expects JSON, so an adapter converts it.

**Lecturer's story.** A few years ago, the state of California needed about 70 COBOL developers for its 1960s-era finance systems. It found only three, all in their late seventies or older, and even an international call drew only about 30 applicants. After stakeholder engagement, the fix was to build adapters so Python developers could query and update the old systems. "An adapter is essentially an API."

## Use it in the capstone

Wrap each external service we depend on (mobile money, SMS, AI model API, maps) behind our own adapter interface, so we can swap providers without touching core logic. Show these as boundaries on the C4 container diagram.

## Related

- [Proxy pattern](proxy-pattern.md)
- [Facade pattern](facade-pattern.md)
- [Bridge pattern](bridge-pattern.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck uses: data migration and payment gateway integration. The deck pairs Adapter with Iterator for agriculture and public services (Esoko, GhanaPostGPS).

**African example:** a `GhanaPostGPSAdapter` that turns digital addresses into latitude and longitude for our routing code.
