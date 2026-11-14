---
title: End-to-end testing
tags: [quality, testing]
source: "Lecture 13"
---

# End-to-end testing

The lecturer named three levels of testing:

- **Unit tests:** check one function or class on its own.
- **Integration tests:** check that components work together (for example, the API and the database).
- **End-to-end (E2E) tests:** check a whole **feature flow** as a user would experience it, from the UI through the backend and back. For example: sign up, place a request, receive a notification.

"People often do unit tests and maybe integration tests… you have to do end-to-end. People don't do it, and it is very significant."

When AI writes the code, testing still needs its own thorough prompt that asks for all three levels.

## Use it in the capstone

The test plan should list E2E scenarios for each core use case in the proposal, run against the deployed system. Browser automation tools such as Playwright or Cypress suit this. Passing E2E runs are good evidence for the demo and the reliability section.

## Related

- [Prompt engineering for building systems](prompt-engineering-for-building-systems.md)
- [Testing stages: developer, QA, alpha and beta](testing-stages-developer-qa-alpha-beta.md)
- [Capstone must be fully functional and deployed](capstone-must-be-fully-functional-and-deployed.md)
