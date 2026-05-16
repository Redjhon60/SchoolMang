# School Manager Pro

A complete, professional School Management System (ERP) for a private school in Morocco. Bilingual French/Arabic interface, full CRUD for students, payments, employees, expenses, transport, timetable, and receipts.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/school-manager run dev` — run the frontend (port assigned by Replit)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Default Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| Comptable | comptable | compta123 |
| Secrétaire | secretaire | secret123 |

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + TailwindCSS + Recharts + shadcn/ui + wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Desktop build: Electron + electron-builder (see `artifacts/school-manager/BUILD_DESKTOP.md`)

## Where things live

- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `lib/db/src/schema/` — All DB table definitions
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/school-manager/src/pages/` — React pages
- `artifacts/school-manager/electron/` — Electron main + preload for desktop build
- `artifacts/school-manager/BUILD_DESKTOP.md` — Steps to build the Windows .exe

## Architecture decisions

- Auth uses simple token-based auth (base64 user ID) — sufficient for local/offline school ERP use
- All monetary values stored as `numeric` strings in PostgreSQL, converted to `number` in API responses
- Student payment status is computed dynamically per request based on current month's payments
- Receipt is auto-generated on every payment creation, stored in `receipts` table
- Receipt number format: `REC-YYYY-XXXXXX`

## Product

Full School ERP with:
1. **Auth** — Login with Admin/Comptable/Secrétaire roles
2. **Dashboard** — Live stats (students, revenue, expenses), 4 interactive charts, recent activity
3. **Students** — Full CRUD, profile page, payment history, class/status filters
4. **Payments** — Record monthly/transport/insurance payments, partial payment support
5. **Receipts** — Auto-generated PDFs with school logo, receipt number, print button
6. **Employees** — Staff management, salary payment tracking, bonuses/advances
7. **Expenses** — Fixed/variable expenses, category breakdown charts
8. **Transport** — Bus management, transport subscriber list
9. **Timetable** — Weekly schedule grid per class, add/edit/delete
10. **Settings** — School info, theme, language, auto-backup

## Classes

PS, MS, GS, CP, CE1, CE2, CM1, CM2, 6EME, 1AC, 2AC, 3AC, TC, 1BAC, 2BAC

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after any OpenAPI spec change
- Run `pnpm --filter @workspace/db run push` after any schema change
- For the desktop .exe build, read `artifacts/school-manager/BUILD_DESKTOP.md`
- Transport workflow starts the API server then the frontend — do NOT restart the frontend before the API is up

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
