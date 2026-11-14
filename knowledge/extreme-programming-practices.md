---
title: Extreme Programming (XP) practices
tags: [agile, xp]
source: "Personal notes: Agile Methodologies/Terms/Extreme Programming (XP) (ESP ch. 3)"
---

# Extreme Programming (XP) practices

**XP** takes known good practices to "extreme" levels. For example, it integrates and tests changed code several times *a day*, not weekly. It aims at fast, incremental development and delivery that welcomes change.

The ten core practices:
1. **Test-first development:** write the test before the code.
2. **Refactoring:** keep improving structure without changing behaviour.
3. **Small releases:** ship minimal useful increments often.
4. **Simple design:** build only for current needs.
5. **On-site customer:** a user representative works with the team.
6. **Sustainable pace:** no routine overtime.
7. **Pair programming:** two people, one machine.
8. **Collective ownership:** anyone may change any code.
9. **Incremental planning:** plan from stories, release by release.
10. **Continuous integration:** merge and test constantly.

Scrum describes *how to organise* the work. XP describes *how to engineer* it. Teams often combine them.

## Use it in the capstone

Adopt CI (GitHub Actions running tests on every pull request), pair programming for the intelligent component, and test-first for core logic. These feed rubric A (code quality) and the optional automated-tests bonus.

## Related

- [Agile Manifesto](agile-manifesto.md)
- [Agile practices catalogue](agile-practices-catalogue.md)
- [Other Agile methods: FDD, ASD, DSDM](other-agile-methods-fdd-asd-dsdm.md)
