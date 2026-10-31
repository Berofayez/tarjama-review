# Church Translation Review

Planning work for a web app that lets reviewers check and fix AI translations of Arabic church books into English. Working name: Tarjama Review.

## What's here

| File | What it is |
| --- | --- |
| [docs/PRD.md](docs/PRD.md) | The MVP PRD (snapshot). |
| [docs/SYSTEM_DESIGN.md](docs/SYSTEM_DESIGN.md) | Proposed system architecture, technology tradeoffs, and a step-by-step project plan. |
| [wireframes/tarjama-wireframes.html](wireframes/tarjama-wireframes.html) | Clickable wireframes. Open the file in a browser. |

## First build checkpoint

This checkpoint verifies that the React UI can reach the ASP.NET Core API. It does not use a database, sign-in, or an LLM yet.

Prerequisites: .NET 10 SDK and Node.js 22.13 or newer.

In one terminal, start the API:

```sh
dotnet run --project src/Tarjama.Api
```

In another terminal, start the UI:

```sh
npm install --prefix src/tarjama-web
npm run dev --prefix src/tarjama-web
```

Open the local URL printed by Vite. The UI requests `/api/health`; Vite forwards that request to the API on port 5200.

## Planning artifacts

This repository contains the current PRD snapshot, system design plan, and clickable wireframes. Keep these artifacts in sync as project decisions change.

## Key decisions so far

- Arabic → English only.
- A church glossary is in the MVP. Example: "Old Man", never "Old Self".
- Bible quotes are detected automatically and compared with NKJV. KJV is used until NKJV permission is granted.
- Every paragraph requires reviewer confirmation; AI doubt marks and other flags only help prioritize attention.
