---
title: Monitoring and maintenance
tags: [se-overview, maintenance, operations]
source: "Lecture 1"
---

# Monitoring and maintenance

The last lifecycle stage is **monitoring and maintenance**, and the lecturer insisted they go together: you maintain well only if you monitor.

- **Monitoring** means watching the health of the running system so problems are caught early, ideally before users notice.
- **Maintenance** means fixing, patching and updating it.

He said that in Ghana clients often skip monitoring: the vendor builds and deploys, then nobody looks until there is a crisis and the vendor is called in. Better practice:
- Put monitoring in the **contract**. The builder knows the system best, so let them monitor at a distance and step in or advise when needed.
- They should see system health, not private data. Know who else has monitoring access, so blame is not misplaced when something breaks.
- Example: the vendor warns that cloud spending is close to the monthly budget and will be exceeded in three days.
- An in-house team and a built-in dashboard can do the same job.

## Use it in the capstone

Include a short monitoring plan (health checks, logs, cost alerts) in the architecture or quality doc; it supports our availability and reliability calculations.

## Related

- [Software development lifecycle stages](software-development-lifecycle-stages.md)
- [No software is bug-free](no-software-is-bug-free.md)
- [Build and maintain against the requirements document](build-and-maintain-against-the-requirements-document.md)
