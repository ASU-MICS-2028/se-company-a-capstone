---
title: Bridge pattern
tags: [patterns, structural, bridge]
source: "Lecture 11; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Bridge pattern

**Bridge** is a structural Gang of Four pattern. When one class hierarchy is answering **two independent questions at once**, split it into two hierarchies and connect them with a reference (the "bridge"). Then the two can change separately, and the number of classes stops multiplying.

**Example: travel agency notifications.** Message types: booking confirmation, visa status, payment update, flight update. Channels: SMS, WhatsApp, email, and so on. One class per combination (4 × 4) gives **16** classes with mostly duplicated logic.

With Bridge:

- a **notification** hierarchy (what to say): 4 classes
- a **channel** hierarchy (how to send): 4 classes
- each notification holds a reference to a channel.

That is **8** classes instead of 16. A new channel is one class, not four.

**Bridge versus Abstract Factory:** Abstract Factory makes sure objects *match*. Bridge makes sure two dimensions *don't multiply*.

## Use it in the capstone

Use it for our notification or alert system if we send several kinds of messages over several channels (SMS is vital where smartphones or data are scarce). It pairs with the publish-subscribe worker.

## Related

- [Abstract Factory pattern](abstract-factory-pattern.md)
- [Adapter pattern](adapter-pattern.md)
- [Publish-subscribe with queued workers](publish-subscribe-with-queued-workers.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck example: a mobile app's UI layer bridged to its backend data source, so SQLite can be swapped for Firebase without changing UI code. That is Bridge at the data-access layer, a second place it applies besides notifications.
