---
title: Interpreter pattern
tags: [patterns, behavioral, interpreter]
source: "Lecture 12; Ashesi CSIS Capstone Design Patterns & DS&A deck"
---

# Interpreter pattern

**Interpreter** is a behavioural Gang of Four pattern for small languages. You encode each **grammar rule as a class**. A sentence in the language is then parsed into a **tree** of expressions, which is evaluated by calling `interpret(context)` on the root.

- **Terminal expressions** are the leaves: values and variables such as `age`, `80` or `hasID`.
- **Non-terminal expressions** combine others: `AND`, `>`, `+`.

**Example: a rule check.** "age > 80 AND has ID" becomes a tree: `AND` at the root, `>` (with children `age` and `80`) on one side, and `hasID` on the other. Evaluate the left subtree, evaluate the right, then combine.

**Practical example:** "free shipping if the order total is at least 50 and the customer is a member". A total of 30 returns false.

Other uses: spreadsheet formulas (which follow BODMAS precedence), calculators, regular expressions, SQL-like filters.

**Strength:** easy to extend. Add a rule by adding a class.

**Limit:** if the language has many rules (a full programming language), the class count explodes. Use a proper **parser** instead, perhaps with Interpreter for small sections.

## Use it in the capstone

Fits a rules-based decision-support feature, where administrators define simple eligibility or alert rules that the system evaluates. Keep the grammar small.

## Related

- [Composite pattern](composite-pattern.md)
- [Prototype pattern](prototype-pattern.md)

## Also in Ashesi CSIS Capstone Design Patterns & DS&A deck

Deck example: a rule engine for a campus fee-waiver eligibility checker. The deck's caution: Interpreter adds complexity, so prefer a parser library for non-trivial grammars.

**African example:** USSD advisory rules written by NGO staff, such as "IF region = Northern AND crop = maize THEN send advisory 3".
