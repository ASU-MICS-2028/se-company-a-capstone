---
title: Command pattern
tags: [patterns, behavioral, command]
source: "Lecture 11; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Command pattern

**Command** is a behavioural Gang of Four pattern. It wraps a request in a standalone object, so the request can be stored, queued, logged, undone or replayed.

**Four parts, with the restaurant analogy:**

| Role | Job | Restaurant |
|---|---|---|
| Client | Creates the command and sets its receiver | Customer asking for a dish |
| Invoker | Holds the command and triggers it when needed | Waiter carrying the slip |
| Command | Interface with `execute()`, carrying the request details | Order slip (dish, table, notes) |
| Receiver | Has the actual business logic | Chef who knows how to cook |

The waiter never learns to cook. That is the **decoupling**. Slips can be stacked, queued or cancelled, and one slip format works for any dish or chef.

**Real uses:**

- **Undo/redo** in text editors: executed commands go on a stack, and undo pops and reverses one.
- **GUI buttons and menu shortcuts**: "Save" is a command object.
- **Mobile money and banking**: each transfer is logged as a command, so it can be retrieved or reversed.

**Downside:** many small command classes to write.

**Command versus Visitor:** Command turns a request *into an object*. Visitor adds operations *to a set of classes*.

## Use it in the capstone

Use Command for user actions that need an audit log or undo (transactions, edits, admin actions). The log also helps the reliability story and debugging.

## Related

- [Visitor pattern](visitor-pattern.md)
- [Chain of Responsibility pattern](chain-of-responsibility-pattern.md)
- [Memento pattern](memento-pattern.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck uses: task schedulers, action histories, transactional operations.

**Campus example (deck's Akornor exercise):** each meal order is a command object with undo/redo support, so it can be queued for the kitchen, logged, and cancelled. **African example:** an agent-banking app queues deposit commands offline and replays them when the network returns.
