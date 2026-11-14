---
title: Memento pattern
tags: [prior-work, patterns, gof, behavioural]
source: "ICS530 Builder and Memento deck, Joseph Etse (5 Nov 2026); Gamma et al., Design Patterns (1994); Lecture 11; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Memento pattern

A **behavioural** GoF pattern: save an object's state so you can restore it later, without exposing its internals (keeping *encapsulation*).

**Three roles.**
- **Originator:** the object with state. `save()` packs its own state into a Memento; `restore(m)` unpacks it.
- **Memento:** the frozen snapshot. Only the Originator reads inside it.
- **Caretaker:** stores Mementos and hands them back, but never opens them.

Flow: Caretaker asks Originator to save → Originator makes a Memento → Caretaker stores it → later Caretaker returns it and the Originator restores itself.

**Example: ML training checkpoints.** A 72-hour run with a checkpoint every 9-hour epoch: a power cut at hour 60 loses 6 hours instead of 60. `TrainingJob` (Originator) saves epoch, model and optimiser state; `CheckpointManager` (Caretaker) writes to disk and keeps the last 3. TensorFlow ships this caretaker as `tf.train.CheckpointManager`.

**Where real code bends it.** A PyTorch `state_dict` is readable, and "keep the best" peeks at the validation score, but the intent holds.

**Watch out for** storage cost and how often you save.

## Use it in the capstone

Fits NFR02 from Prosit 1: cart and checkout survive an app close, crash or lost network and resume at the last step. Save a cart Memento after each committed step.

## Related

- [Builder pattern](builder-pattern.md)
- [Payments need an idempotency key](../learnings/payments-need-an-idempotency-key.md)

## Also in Lecture 11

- The lecturer linked Memento to BitTorrent-style downloads (resuming from where you stopped), and above all to **caching**. In African settings you need to cache on the device, and Memento is a pattern that makes that easier. See [Caching and PWAs for poor connectivity](caching-and-pwa-for-poor-connectivity.md).
- In the class presentation it was paired with the Adinkra symbol *Sankofa* ("go back and take what you left").

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck uses: undo/redo in editors, form wizards, and transaction rollback in capstone systems.

**Campus example:** Prosit 2's ADHD scenario, where an interrupted order is saved and restored when the student returns. This is a [universal design](universal-design.md) feature that helps everyone.
