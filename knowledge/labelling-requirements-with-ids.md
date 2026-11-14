---
title: Labelling requirements with IDs
tags: [ux, requirements, documentation]
source: "Lecture 1"
---

# Labelling requirements with IDs

Once you have listed your requirements, **formalise** them. The lecturer's first rule: give every requirement a label that shows its type and a number.

- Usability (UX) requirements: `UX01`, `UX02`, ...
- Security requirements: `SR01`, `SR02`, ...
- Use similar prefixes for other types (functional, performance and so on).

Labels let you trace a requirement from the spec into designs, code, tests and later maintenance. Pair each label with a priority using [MoSCoW prioritisation](moscow-prioritisation.md).

Example from the drone delivery project he described (customer app plus admin website with sensor analytics):
- A user can place an order.
- A user can pay, with several payment options.
- A user can track the order after paying.

## Use it in the capstone

Every requirement in our requirements doc should carry an ID and a MoSCoW priority, and our test plan should cite those IDs so each test traces back to a requirement.

## Related

- [MoSCoW prioritisation](moscow-prioritisation.md)
- [Functional, non-functional requirements and constraints](functional-non-functional-requirements-and-constraints.md)
- [Build and maintain against the requirements document](build-and-maintain-against-the-requirements-document.md)
- [Label every diagram with an ID and a one-line description](label-every-diagram-with-id-and-description.md)
