---
title: "Frontend: React with TypeScript, built with Vite"
date: 2026-11-16
status: accepted
deciders: Joseph Etse, for Nyansapo Systems
issue: "#7"
ai_used: yes
---

# Frontend: React with TypeScript, built with Vite

## Context

The submitted proposal already fixes most of the stack: FastAPI (Python), PostgreSQL, scikit-learn, and a React PWA with IndexedDB for the staff board. It did not choose the frontend language or the build tool. Frontend work (#10) builds against a mock of the API contract (#7), so the frontend needs types that match that contract.

## Decision

The frontend is **React in TypeScript**, set up and built with **Vite**. The patient-facing homepage and the staff board live in the same app. Hosting is decided later, before the Sprint 4 deploy.

## Options we rejected

- **Plain JavaScript:** no compile-time check that the screens match the API contract. TypeScript can generate types from the OpenAPI file.
- **Next.js:** server rendering adds a server we don't need. The staff board must run offline in the browser, and a static Vite build suits a PWA and free static hosting.
- **Choosing hosting now:** nothing is deployed until Sprint 4, so the choice can wait.

## Consequences

- #10 starts with a Vite React TypeScript template and adds PWA support (for example `vite-plugin-pwa`).
- API types are generated from the #7 OpenAPI contract, not written by hand.
- The draft homepage ([docs/homepage/](../docs/homepage/README.md)) becomes the app's first page, with unbuilt features marked "coming soon".
- Hosting gets its own decision file when we pick it.

## AI use

Claude Code drafted this record and suggested TypeScript and Vite. Joseph chose them.
