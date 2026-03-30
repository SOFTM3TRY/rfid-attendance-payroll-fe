# Issues Report

## Architecture Violations

### 1. Repeated client/loading guard pattern in route pages
- Severity: Medium
- Files: route pages that previously used `if (!isClient || isLoadingUserDetails) return <Loader />;`
- Problem: The same client hydration and user-loading guard was duplicated across many pages, making loading behavior harder to keep consistent.
- Fix: Replaced the repeated pattern with the reusable `PageLoaderBoundary` component.

### 1.1 Shared Loader component was overused for page and modal loading
- Severity: Medium
- Files: dynamic route pages and registration flows that imported `@/components/Loader`
- Problem: The project relied on one heavy loader for unrelated loading states, which caused inconsistent UX and made loading screens harder to tailor to each view.
- Fix: Replaced those usages with Shadcn `Skeleton`-based loading states through `PageSkeleton` and localized skeleton layouts.

### 2. Direct remote lookups still exist in some UI step components
- Severity: Medium
- Files: `src/components/admin/manage-admin/AddAdmin/Step4Review.tsx`, `src/components/admin/manage-student/AddStudent/Step4Review.tsx`, `src/app/manage-teacher/page/AddTeacher/Step4Review.tsx`, `src/app/reports/page/AddTeacher/Step4Review.tsx`
- Problem: Address review screens still perform location lookup work locally instead of fully delegating to a dedicated hook.
- Fix: Migrate remaining step-review address logic to `useAddressLabels` and standardize the four flows around one shared review helper.

### 3. Feature flows are duplicated across admin, manage-teacher, and reports
- Severity: High
- Files: `src/app/manage-teacher/page/AddTeacher/*`, `src/app/reports/page/AddTeacher/*`, `src/components/admin/manage-student/AddStudent/*`, `src/components/admin/manage-admin/AddAdmin/*`
- Problem: The same multi-step form patterns are maintained in parallel, increasing regression risk and change cost.
- Fix: Extract shared step components, validation helpers, and address hooks into reusable modules.

## Dependency Issues

### 4. Validation tooling was outdated for the current Next.js version
- Severity: High
- Files: `package.json`
- Problem: `next lint` no longer works in this project setup and failed immediately.
- Fix: Replaced the broken script with a working `typecheck`-based validation command and documented the need for a proper ESLint migration.

### 5. Dependency audit still needs a live install/update pass
- Severity: Medium
- Files: `package.json`, `package-lock.json`
- Problem: The repository contains likely-unused packages and lacks explicit lint tooling, but confirming safe removals and updates requires a dependency install/update pass.
- Fix: After approval for networked package installation, run a package audit, add ESLint, and remove unused packages in a follow-up.

## Performance Issues

### 6. API-down error handling was too eager
- Severity: High
- Files: `src/app/provide.tsx`
- Problem: The global toast "The API is currently down. Please try again later." was shown for any health-check error, including errors that did not mean the API was actually unavailable.
- Fix: Only show the toast for real network/unreachable cases and `502/503/504` responses, using shared helpers from `src/lib/api-error.ts`.

### 7. Repeated address/network work across step flows
- Severity: Medium
- Files: add/review step components under student/admin/teacher/report flows
- Problem: The same location data is fetched multiple times in similar UI paths.
- Fix: Continue consolidating on shared address hooks with memoized lookup helpers.

## Security Risks

### 8. Auth token handling was inconsistent
- Severity: High
- Files: `src/context/AuthContext.tsx`, `src/components/ProtectedRoute.tsx`, `src/components/navbar.tsx`, profile pages
- Problem: Different parts of the app mixed cookies and local storage semantics, which risks stale auth state and inconsistent logout behavior.
- Fix: Centralized token access in `src/lib/auth.ts` and updated core auth flow to use cookie helpers consistently.

### 8.1 Authenticated users could navigate back to the login page
- Severity: Medium
- Files: `src/app/page.tsx`, `src/context/AuthContext.tsx`, `src/components/ProtectedRoute.tsx`, navigation components
- Problem: Login and role redirects did not consistently replace browser history, so authenticated users could return to `/` with the back button and briefly see the login screen.
- Fix: Standardized auth redirects around `router.replace(...)` and redirected authenticated users off the login route immediately based on role.

## Code Duplication

### 9. Axios base URL and auth headers were repeated across nearly every service
- Severity: High
- Files: all service files under `src/services`
- Problem: Each service duplicated backend URL construction and Bearer header setup.
- Fix: Centralized request creation in `src/lib/api.ts` and migrated services to shared helpers.

## Folder Issues

### 10. The repo is missing some structure for growth
- Severity: Low
- Files: repo-wide
- Problem: There is no dedicated `constants`, `config`, or `assets` module structure yet.
- Fix: Add those directories as new shared concerns are extracted.

## Technical Debt

### 11. Broad `any` usage remains widespread in forms and table flows
- Severity: Medium
- Files: multiple files across `src/app`, `src/components`, and `src/hooks`
- Problem: Form payloads and query results still rely heavily on `any`, which weakens type safety.
- Fix: Introduce shared DTO/result types per feature and migrate high-traffic screens first.

### 12. No automated tests are present for the refactored service/hook boundaries
- Severity: Medium
- Files: repo-wide
- Problem: Validation currently depends on manual checks and TypeScript/build commands.
- Fix: Add tests for service wrappers, hook behaviors, and critical route flows.
