---
title: Deploy demos to a staging server, not localhost
tags: [quality, agile, course]
source: "Lecture 9"
---

# Deploy demos to a staging server, not localhost

The lecturer said he is tired of demos that run on **localhost**, meaning the developer's own laptop. "No pet projects." A localhost demo shows that it works on one machine. It does not show that it works where the client will run it.

What he expects instead:

- A **staging server**: a real server set up like the client's live (production) environment. The demo runs there.
- At the [sprint review](sprint-review.md) the client tries the staged system. If they find problems, you get time to fix them. If they approve, you push it to production.
- Only then does the work meet the [Definition of Done](definition-of-done.md).

Why it matters: setup, network, configuration and data problems often show up only away from the developer's machine. Finding them on staging is cheaper than finding them in front of users.

## Use it in the capstone

Host the prototype on a public or cloud staging environment for reviews, the interview and the conference talk. Note the deployment target in the C4 deployment view, and test availability against that host rather than a laptop.

## Related

- [Definition of Done](definition-of-done.md)
- [Deployment targets are not only the web](deployment-targets-are-not-only-the-web.md)
- [Monitoring and maintenance](monitoring-and-maintenance.md)
