# Architecture Overview

## Monorepo Layout

The workspace is managed by **Nx** and uses npm workspaces. Projects are split into two categories:

```
apps/       Application projects (deployable)
packages/   Library projects (shared code)
```

### Applications

| Project | Framework | Port | Rendering |
|---|---|---|---|
| `web-ssr` | Next.js 16 (App Router) | 3000 | Server-side (SSR) |
| `web-spa` | React 19 + Vite | 4200 | Client-side (CSR) |

### Libraries

| Project | Purpose |
|---|---|
| `profile-sdk` | Framework-agnostic API client, TypeScript types, and image URL utilities |

## Dependency Graph

```
web-ssr  ──► profile-sdk
web-spa  ──► profile-sdk
```

Both applications depend on `profile-sdk` but have **zero coupling** to each other. The SDK is designed to work in any JavaScript runtime (Node.js, browser, edge).

## Design Decisions

### Shared Library (`profile-sdk`)

- **Framework-agnostic**: Uses the standard `fetch` API with no React or Next.js dependencies, making it consumable by any JS/TS project.
- **Single responsibility**: Separated into `types.ts` (data contracts), `profile.service.ts` (API client), and `image-url.builder.ts` (URL construction).
- **Barrel exports**: A single `index.ts` re-exports the public API for clean imports (`@erasys/profile-sdk`).
- **Configurable `baseUrl`**: The caller decides the origin, enabling the same function to work server-side (direct URL) and client-side (proxied URL).

### SSR Application (`web-ssr`)

- Uses **Server Components** by default -- profile data is fetched on the server with zero client-side JavaScript for the main content.
- Dynamic `generateMetadata()` for per-profile SEO (Open Graph, Twitter cards).
- Includes an **API route** (`/api/profiles/[username]`) that acts as a CORS proxy for client-side consumers.
- Uses `next/image` for automatic image optimization, lazy loading, and responsive `sizes`.

### SPA Application (`web-spa`)

- **Vite** for fast HMR and optimized production builds.
- **React Router** for client-side routing (`/` and `/profile/:username`).
- Fetches data client-side via `useEffect` with proper cleanup (cancelled flag).
- Uses Vite's dev proxy to bypass CORS in development.

### Styling

Both apps use **Tailwind CSS** with a mobile-first responsive approach. Breakpoints (`sm:`, `md:`, `lg:`) are used consistently for layout adaptation. No custom CSS is written -- all styling is done via utility classes.

## Nx Configuration

Nx is configured with **inferred targets** via plugins -- no manual `project.json` files are needed:

- `@nx/js/typescript` -- TypeScript build and typecheck
- `@nx/next/plugin` -- Next.js dev, build, start
- `@nx/vite/plugin` -- Vite dev, build, preview
- `@nx/jest/plugin` -- Jest test runner
- `@nx/eslint/plugin` -- ESLint linting

Task caching is enabled by default for all targets.
