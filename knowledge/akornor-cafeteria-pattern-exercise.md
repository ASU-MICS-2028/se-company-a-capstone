---
title: Akornor cafeteria pattern exercise
tags: [patterns, data]
source: "Ashesi CSIS Capstone Design Patterns & DS&A deck, slide 17"
---

# Akornor cafeteria pattern exercise

The deck applies patterns and data structures to one familiar system, the Akornor ordering and inventory system:

| Concern | Choice | Why |
|---|---|---|
| Ordering | [Command](command-pattern.md) | Each order is an object, so it can be undone, redone, queued and logged |
| Menu and pricing changes | [Strategy](strategy-pattern.md) | Swap the pricing or meal-of-the-day algorithm at runtime without touching order logic |
| Payment | [Chain of Responsibility](chain-of-responsibility-pattern.md) | MoMo, card, student credit and cash handled by chained processors |
| Notifications | [Observer](observer-pattern.md) | Kitchen, cashier and pickup display subscribe to order-status events |
| Serving line | Queue (FIFO); priority queue for pre-orders | First come, first served, with urgency where needed |
| Kitchen coordination | [Mediator](mediator-pattern.md) | A central coordinator decouples grill, drinks and packaging stations |

Tasks: identify creational, structural and behavioural patterns; justify each with a UML sketch; discuss the trade-offs with a partner.

The earlier class challenge for a campus food app asks the same five things: the design problem, a pattern, a data structure, the algorithm with its Big-O, and how the pattern constrains the data structure (and whether scale would change that).

## Use it in the capstone

Run the same five-question exercise on our own system in a design session, then paste the resulting table into the architecture doc.

## Related

- [Stacks and queues](stacks-and-queues.md)
- [Pattern decision guide](pattern-decision-guide.md)
- [Capstone design patterns and DS&A deck summary](capstone-design-patterns-dsa-deck.md)
