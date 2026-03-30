# RFID Attendance Payroll FE

Frontend for the Young Generation Academy attendance and payroll workflow, built with Next.js App Router, React Query, and a Service + Hook architecture.

## Setup

Requirements:
- Node.js 20+
- npm 10+
- Backend API reachable from `NEXT_PUBLIC_BASE_URL_API`

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

`lint` currently runs the TypeScript safety pass. The previous `next lint` script was invalid for the current Next.js version and was replaced with a working validation command.

## Environment Variables

Create a local `.env` file with:

```env
NEXT_PUBLIC_BASE_URL_API=http://127.0.0.1:8000/api
NEXT_PUBLIC_BASE_URL_API_STATUS=http://127.0.0.1:8000
```

## Architecture

This repo now follows these boundaries:

- `src/services`
  API and remote data access only. Services use the centralized client in `src/lib/api.ts`.
- `src/hooks`
  Stateful logic, data fetching, mutations, and UI-side orchestration. Hooks call services, not raw HTTP clients.
- `src/components`
  Reusable UI building blocks and feature UI.
- `src/app`
  Route-level screens and page composition.
- `src/lib`
  Shared utilities such as the API client and auth token helpers.
- `src/types`
  Shared TypeScript types.

### Service + Hook Pattern

1. Services call the backend through the shared Axios client.
2. Hooks wrap services with state, loading, errors, and React Query integration.
3. Components and pages consume hooks and focus on rendering and interaction.

## Folder Structure

```text
src/
  app/
  components/
  context/
  hooks/
  lib/
  services/
  types/
  utils/
public/
```

Recommended future additions:

- `src/constants/`
- `src/config/`
- `src/assets/`

## Refactor Highlights

- Centralized API access in `src/lib/api.ts`
- Centralized API error parsing and API-availability detection in `src/lib/api-error.ts`
- Centralized auth cookie helpers in `src/lib/auth.ts`
- Moved PSGC remote lookups into `src/services/locationService.ts`
- Replaced duplicated per-service Axios base URL and auth header setup with shared helpers
- Replaced repeated `if (!isClient || isLoadingUserDetails) return <Loader />;` page guards with the reusable `PageLoaderBoundary`
- Replaced the shared full-screen `Loader` fallbacks with Shadcn `Skeleton`-based loading states through `PageSkeleton` and page-specific skeletons
- Redirected authenticated users away from `/` with `router.replace(...)` so dashboard, teacher, and student flows do not navigate back to the login screen
- Fixed broken validation scripts for the current Next.js version

## Error Handling

- Use `getApiErrorMessage` from `src/lib/api-error.ts` for user-facing API and mutation errors.
- Use `isApiUnavailableError` only for true backend outages or unreachable API checks.
- The global API-down toast should only appear for network-level failures and `502/503/504` responses from the health endpoint.
- Do not show the API-down message for empty datasets, validation failures, `401/403/404/422`, or successful responses with no records.
- While the API is reachable, no API-down toast should be shown during normal loading states or successful app startup.

## Validation

Run:

```bash
npm run typecheck
npm run build
```

Notes:

- `typecheck` is expected to pass after this refactor.
- `build` may require clearing the local `.next` folder first if a stale Node process is holding it open on Windows.
- An ESLint migration is still recommended for full lint coverage.

## Known Follow-Up Work

- Introduce a real ESLint setup for Next.js 16 flat config
- Replace broad `any` types in form-heavy flows
- Continue deduplicating repeated `AddTeacher`, `AddStudent`, and `AddAdmin` step components
- Add `.env.example`
- Add automated tests for hooks and route-level flows
