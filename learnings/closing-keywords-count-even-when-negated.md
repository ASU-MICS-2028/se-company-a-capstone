---
title: GitHub reads closing keywords even inside a negative sentence
date: 2026-11-27
owner: Eric Sunu
tags: [process, github]
issue: "#48"
---

# GitHub reads closing keywords even inside a negative sentence

## What happened

Twice this sprint, a PR that must not close its issue was linked to close it. PR #57 said it "can't close #45", and PR #64 first said it "does not close #48". GitHub saw "close #45" and "close #48" and linked each PR to close its issue on merge.

## What we learned

GitHub doesn't read the sentence. Any of its keywords (close, closes, fix, fixes, resolve, resolves and their other forms) right before an issue number counts, even after "not" or "can't". It also counts in commit messages that reach the default branch.

## Do this next time

- For a PR that only does part of an issue, write "Part of #48" and keep those keywords away from the number.
- After editing a PR body, check what it will close: `gh pr view <n> --json closingIssuesReferences`. An empty list means it closes nothing.

## Related

- [How we work](../CONTRIBUTING.md)
