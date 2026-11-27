# Twɛn frontend

The staff board and the patient web page, in one React + TypeScript app built with Vite
([decision](../decisions/2026-11-16-frontend-typescript-vite.md)). Issue [#10](https://github.com/ASU-MICS-2028/se-company-a-capstone/issues/10).

## Run it

Needs Node 22 (the same as CI).

```bash
cd frontend
npm ci          # install exactly what package-lock.json says
npm run dev     # open the address it prints, usually http://localhost:5173
```

## Checks (the same ones CI runs)

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript, no output files
npm test           # Vitest unit tests
npm run build      # production build into dist/
```

## Where things are

| Path | What |
|---|---|
| `src/styles/tokens.css` | Every colour, font and corner from the approved prototypes. Change the look here, once. |
| `src/styles/base.css` | Page basics and the keyboard focus ring |
| `src/fonts.ts` | Fonts bundled with the app (no Google Fonts call), so it works offline |
| `src/api/client.ts` | **The one place screens get data from.** Today it uses the mock. Swapping to Eric's backend means changing this file only. |
| `src/api/mock.ts`, `src/api/mockData.ts` | An in-memory stand-in for the backend, answering the way the contract says, with made-up tickets |
| `src/api/schema.d.ts` | Types generated from `docs/architecture/openapi.yaml`. Never edit by hand: run `npm run gen:api`. |
| `src/staff/` | The staff board: the live queue screen, status words and filters |

## The API contract

The mock follows contract **v0.2** (PR #55). Until #55 is merged, `main` still has v0.1, so:

- `src/api/schema.d.ts` was generated from the v0.2 file. Don't run `npm run gen:api` on `main` before #55 merges, or you get v0.1 types back.
- The contract test (`src/api/__tests__/contract.test.ts`) checks every mock ticket against the contract's schemas. It skips itself while `main` has v0.1. To run it against another copy of the contract: `TWEN_CONTRACT=/path/to/openapi.yaml npm test`.

## Design source

The approved hi-fi prototypes (staff screens, patient screens P01 to P16, shared parts, colours and type).
Fonts: Instrument Serif for the Twɛn wordmark only, Plus Jakarta Sans for the interface, JetBrains Mono
for ticket numbers, times and phone numbers.
