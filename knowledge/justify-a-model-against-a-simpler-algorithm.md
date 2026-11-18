---
title: Justify a model against a simpler algorithm
tags: [research, ai, course]
source: "Lecture 14"
---

# Justify a model against a simpler algorithm

When we presented Twɛn in Lecture 14, the lecturer asked why a clinic queue needs a trained model at all. Clinic hours are short and predictable (roughly 5–10 a.m. arrivals), so a scheduling rule or a simple learning algorithm might do the job. He called a model here a possible "sledgehammer to kill a fly". He did not forbid it. He said he would look at how our proposal justifies it.

The general rule: an intelligent component has to earn its place. Show, with numbers, that it beats the simplest thing that could work, and say what it costs (data, training, explanation, failure modes).

## Use it in the capstone

The wait-time model (#9) is evaluated against two baselines, the M/M/c (Erlang C) formula and the rule "position × mean service time ÷ staff on duty", using mean absolute error in minutes and the share of predictions within ±15 minutes. If it does not clearly win, we say so in the paper and ship the baseline. Have this answer ready for the demo Q&A.

## Related

- [Capstone research question](capstone-research-question.md)
- [Capstone rubric criteria](capstone-rubric-criteria.md)
