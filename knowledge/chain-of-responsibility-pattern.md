---
title: Chain of Responsibility pattern
tags: [patterns, behavioral, chain-of-responsibility]
source: "Lecture 11; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Chain of Responsibility pattern

**Chain of Responsibility** is a behavioural Gang of Four pattern. A request is passed along a chain of handlers. Each handler checks "is this mine?" It handles the request or passes it to the next handler, until one claims it or the chain ends.

**Example: restaurant orders.** Instead of cashiers deciding which chef gets each dish (and breaking whenever a chef or dish is added), the order passes through a chain: rice chef → grill chef → bar → head chef. A drink order is skipped by rice and grill, then claimed by the bar.

**Software example:** Python exception handling. An error travels back up the chain of calling functions, and each one gets a chance to catch it.

**Lecturer's example:** early ring-style networks linking US universities to ARPANET. A broadcast message passed node by node. Each node did a handshake to check "is this meant for me?" Only the intended recipient decrypted it. The others passed it on without seeing the contents.

The lecturer noted it may not be the most efficient choice for the restaurant case, but it explains the idea well.

## Use it in the capstone

Use it for request pipelines, such as input validation → authentication → authorisation → business rules, or triage rules in a decision-support feature where the first matching rule handles the case.

## Related

- [Composite pattern](composite-pattern.md)
- [Command pattern](command-pattern.md)
- [A firewall is not enough](firewall-is-not-enough.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck uses: approval workflows, escalation logic and middleware pipelines. The deck pairs it with Facade for health systems (NHIS, mHealth).

**Campus example (deck's Akornor exercise):** payment passes through chained processors (MoMo, then card, then student credit, then cash). Add a final default handler so no request falls off the end.
