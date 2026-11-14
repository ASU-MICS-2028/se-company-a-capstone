---
title: State pattern
tags: [patterns, behavioral, state]
source: "Lecture 10; Lecture 11; Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# State pattern

**State** is a behavioural Gang of Four pattern. An object's current state decides its behaviour, including which states it may move to next. It switches its behaviour *internally*, as its state changes. (Strategy, by contrast, is switched from outside.)

**Worked example: food order lifecycle (Lecture 10).**

- States: order received, pending, confirmed, preparing, ready, out for delivery, delivered (plus cancelled). The lecturer added "order received" as the first state: acknowledge the order before it joins the queue.
- Rule: you can cancel while pending or confirmed, but not once preparing has started.
- **Enum** for the states, not strings or ints. An enum fixes the set of valid values. A string can be mistyped ("confirm" against "Confirm"), and an int allows values like 1,000,000 that are not states.
- **Hash map** of allowed transitions: key = current state, value = the states allowed next.
- Algorithm: **state transition validation**. Look up the current state, then check whether the target is allowed.

Complexity: the lookup is O(1), but checking the list of allowed next states is O(k) in the worst case. The lecturer's fix: **memoization**, remembering the last state with an index to it so the transition becomes O(1).

**Account for the whole state space (Lecture 12).** An e-bike example (idle, in motion, charging) showed the need to rule out impossible combinations, such as riding while charging. Missing states break the system.

In UML, each concrete state "is-a" order state.

## Use it in the capstone

Any workflow in our system (a request, a case or an order) should be modelled as an explicit state machine with an enum and allowed transitions. Include a state diagram in the design docs, and test the invalid transitions.

## Related

- [State space explosion](state-space-explosion.md)
- [Strategy pattern](strategy-pattern.md)
- [UML is-a relationships](uml-is-a-relationships.md)
- [Big O rules of thumb](big-o-rules-of-thumb.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck uses: order workflows, user session lifecycles, device connection states.

**Campus example:** a Bamboo Bike lock moving Locked → Unlocking → In use → Returned, where unlock is allowed only from Locked.
