# Architecture Overview

## Monorepo Layout

The workspace is managed by **Nx** and uses npm workspaces. Projects are split into two categories:

```
apps/       Application projects (deployable)
packages/   Library projects (shared code)
```

### Applications

| Project   | Framework                | Port  | Rendering / Runtime      |
| --------- | ------------------------ | ----- | ------------------------ |
| `web-ssr` | Next.js 16 (App Router)  | 3000  | Server-side (SSR)       |
| `web-spa` | React 19 + Vite          | 4200  | Client-side (CSR)        |
| `mobile`  | React Native + Vite/Metro| 4201* | Browser (Vite) or native |

\* Vite dev server uses port 4201 by default; Metro uses 8081 for the native bundler.

### Libraries

| Project       | Purpose                                                                  |
| ------------- | ------------------------------------------------------------------------ |
| `profile-sdk` | Framework-agnostic API client, TypeScript types, and image URL utilities |

## Dependency Graph

```
web-ssr  ──► profile-sdk
web-spa  ──► profile-sdk
mobile   ──► profile-sdk
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

### Mobile Application (`mobile`)

- **React Native** with the same feature set as the web apps (home + profile screens).
- **Web (browser):** Run `npx nx dev mobile` — Vite serves the app with `react-native-web`; open http://localhost:4201.
- **Native (iOS/Android):** Run `npx nx start mobile` (Metro), then `npx nx run-ios mobile` or `npx nx run-android mobile`.
- Reuses `@erasys/profile-sdk`; no CORS in native, so it calls the external API directly.
- Styling via React Native `StyleSheet` and a shared `theme.ts` (colors, spacing, font sizes).

### Styling

**Web (SSR + SPA):** Tailwind CSS with a mobile-first responsive approach. Breakpoints (`sm:`, `md:`, `lg:`) are used consistently; no custom CSS.

**Mobile:** React Native `StyleSheet` and a central `theme.ts` (colors, spacing, font sizes). No Tailwind (not used in the native bundle).

## Nx Configuration

Nx is configured with **inferred targets** via plugins -- no manual `project.json` files are needed:

- `@nx/js/typescript` -- TypeScript build and typecheck
- `@nx/next/plugin` -- Next.js dev, build, start
- `@nx/vite/plugin` -- Vite dev, build, preview
- `@nx/jest/plugin` -- Jest test runner
- `@nx/eslint/plugin` -- ESLint linting

Task caching is enabled by default for all targets.
