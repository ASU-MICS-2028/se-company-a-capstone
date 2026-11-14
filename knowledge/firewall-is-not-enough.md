---
title: A firewall is not enough
tags: [architecture, security]
source: "Lecture 13"
---

# A firewall is not enough

In the ride-hailing architecture review, a firewall sat between users and the backend. The lecturer asked: *if I add a firewall, is my system entirely secure?* No.

Security needs **layers**:

- **Input validation** at every entry point, starting **on the front end** (the mobile app can pre-check input, such as whether a password is valid, before sending it), and again before anything is written to the database.
- **Authentication:** proving who you are.
- **Authorisation:** what you are allowed to do. Know the difference. The lecturer often asks whether the two are the same, and they are not.
- The firewall itself has strategies (rule sets) worth reading about.
- Also secure the routes that bypass the front door, such as direct database access (the lesson from the crypto exchange hack in Lecture 10).

## Use it in the capstone

The security section of the architecture doc should show each layer (client validation, API gateway or firewall, authentication, authorisation, database permissions). The test plan should include invalid-input and unauthorised-access tests.

## Related

- [Privacy versus security](privacy-vs-security.md)
- [Ride-hailing architecture review](ride-hailing-architecture-review.md)
- [Chain of Responsibility pattern](chain-of-responsibility-pattern.md)
