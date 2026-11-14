---
title: State space explosion
tags: [quality, formal-methods, state]
source: "Lecture 10; Lecture 12"
---

# State space explosion

Every system moves through many **states**, and there can be many paths from start to end. Tools such as **Markov chains** model the probability of moving between states. For safety-critical systems, **model checkers, SAT solvers and provers** check every reachable state.

**State space explosion** happens when the number of states grows past what the tool can handle. The lecturer's example came from his PhD on the safety of trains and tracks: the tools were limited to about 2,000 states, but real systems had 5,000 to 7,000. He used cloud environments to scale the analysis beyond that limit.

His lesson for everyday design (Lecture 12): know how big your state space is and account for every state. A room planned for 50 people fails if more turn up. A state the design never considered can break the whole system.

## Use it in the capstone

When we draw state diagrams, list all states and transitions, including errors, timeouts and cancellations. Test the edge transitions. This supports the reliability argument.

## Related

- [State pattern](state-pattern.md)
