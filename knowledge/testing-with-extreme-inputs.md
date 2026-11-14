---
title: Testing with extreme inputs
tags: [quality, testing]
source: "Lecture 1"
---

# Testing with extreme inputs

When testing, don't only feed the system the expected inputs. The lecturer's login example asks what happens when a user:

- swaps username and password,
- leaves both empty and presses login again and again,
- types a valid username with a one-character password,
- pastes a whole essay into the username field.

Does the system let them in? Does it check and reject? Every such test should relate back to a stated requirement. These "extreme" or edge-case inputs (boundary values, empty values, wrong types, oversized data) are where many defects hide.

## Use it in the capstone

For each input form in our prototype, the test plan should include normal, boundary, empty and malicious cases, each linked to a requirement ID.

## Related

- [Testing stages: developer, QA, alpha and beta](testing-stages-developer-qa-alpha-beta.md)
- [Labelling requirements with IDs](labelling-requirements-with-ids.md)
