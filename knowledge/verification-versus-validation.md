---
title: Verification versus validation
tags: [quality, testing, formal-methods]
source: "Lecture 1"
---

# Verification versus validation

The testing stage is about **V&V**: verification and validation. In industry it is often just called **quality assurance (QA)**, and a QA officer does it.

- **Validation** checks that the system does what users need, usually by running it and testing it.
- **Verification**, in the lecturer's strict sense, means a rigorous **mathematical** assessment that the system meets its specification. This is the field of **formal methods** (using logic and maths to prove properties of software).

His observation: in Ghana, and across much of Africa, teams validate but rarely verify. Formal verification matters most for safety-critical systems, where a failure can kill people (see his submarine airlock example).

## Use it in the capstone

In the test plan, separate validation activities (user tests, acceptance tests) from any verification we do (for example, checking critical logic against the spec). Say honestly in the paper which we did.

## Related

- [Testing stages: developer, QA, alpha and beta](testing-stages-developer-qa-alpha-beta.md)
- [Deployment targets are not only the web](deployment-targets-are-not-only-the-web.md)
- [Testing with extreme inputs](testing-with-extreme-inputs.md)
