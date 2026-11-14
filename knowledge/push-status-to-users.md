---
title: Push status to users instead of making them ask
tags: [ux, accessibility]
source: "Lecture 7"
---

# Push status to users instead of making them ask

A design reviewed in class had a visually impaired student going back to the counter to check whether the order was ready. The lecturer said it is better for the status to **persist** and be **pushed** to the user: send a notification when the order is ready, or a running update such as "you are second in the queue."

Ideas from the discussion:

- **Order numbers instead of names** protect privacy at collection. Read the number aloud to the user, and send it to their phone as well.
- **Private audio**, like the headphone jack on accessible ATMs, means the screen reader's output is not broadcast to the whole queue.
- **Alternative channels.** Offer a simple "order using voice" button that opens a chatbot-style voice agent. A student can order from their seat and be told when the food is ready.
- **Physical cues.** Some accessible spaces use textured floor paths that guide a cane user straight to the kiosk. Public screens and speakers can announce ready orders.

The general rule: users should never have to poll (keep asking) the system for state it already knows.

## Use it in the capstone

Wherever our system has a long-running process (a request, an analysis, a delivery), design a notification or status view and show it in a sequence diagram. Include a low-bandwidth channel such as SMS for African contexts.

## Related

- [Universal design](universal-design.md)
- [Transparency and tracking keep users](transparency-and-tracking-keep-users.md)
- [Publish-subscribe with queued workers](publish-subscribe-with-queued-workers.md)
