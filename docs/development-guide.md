# Development Guide

This document describes how the Erasys monorepo was set up and developed step by step, including the main Nx commands used.

## 1. Create the Nx Workspace

```bash
npx create-nx-workspace@latest erasys --preset=ts --packageManager=npm --nxCloud=skip
cd erasys
```

## 2. Add Nx Plugins

Next.js, React, and JS plugins were added to enable generating and running apps and libraries:

```bash
npx nx add @nx/next
npx nx add @nx/react
npx nx add @nx/js
```

Optional: inspect the workspace and dependency graph:

```bash
npx nx report
```

## 3. Shared Library: Profile SDK

A TypeScript library was generated in `packages/` with Jest for unit tests:

```bash
npx nx g @nx/js:lib packages/profile-sdk --bundler=tsc --unitTestRunner=jest
```

After implementing the SDK (types, API client, image URL builder), standard Nx targets were used:

```bash
npx nx build profile-sdk
npx nx typecheck profile-sdk
npx nx test profile-sdk
```

## 4. Next.js SSR Application

The SSR app was generated and can be run in development with:

```bash
npx nx g @nx/next:application apps/web-ssr
npx nx dev web-ssr
```

Runs at http://localhost:3000.

## 5. React SPA Application

The client-side React app (Vite) was generated and run with:

```bash
npx nx g @nx/react:app apps/web-spa
npx nx dev web-spa
```

Runs at http://localhost:4200.

## 6. React Native Mobile Application

The React Native plugin was added, then the mobile app was generated:

```bash
npx nx add @nx/react-native
npx nx g @nx/react-native:application apps/mobile
```

Development in the browser (react-native-web via Vite):

```bash
npx nx dev mobile
```

Runs at http://localhost:4201. For native iOS/Android:

```bash
npx nx start mobile
# In another terminal:
npx nx run-ios mobile
# or
npx nx run-android mobile
```

## 7. Wiring Apps to the SDK

Each app was configured to depend on `@erasys/profile-sdk`:

- In each app’s `tsconfig`, the path/alias for `@erasys/profile-sdk` points to the library.
- The library is listed in the app’s `project.json` or inferred as a dependency via Nx so that `nx build` and `nx dev` build the SDK when needed.

No extra commands are required; Nx infers dependencies from imports.

## 8. Linting and Formatting

ESLint and Prettier are used across the workspace. To lint a project:

```bash
npx nx lint web-ssr
npx nx lint web-spa
npx nx lint mobile
npx nx lint profile-sdk
```

To run lint for all projects (if configured):

```bash
npx nx run-many --target=lint --all
```

## 9. Build and Test Summary

| Target    | Example command                | Purpose                    |
| --------- | ------------------------------ | -------------------------- |
| Build     | `npx nx build web-ssr`         | Production build (per app) |
| Typecheck | `npx nx typecheck profile-sdk` | Type-check library         |
| Test      | `npx nx test profile-sdk`      | Unit tests (Jest)          |
| Dev       | `npx nx dev web-ssr`           | Start dev server           |
| Graph     | `npx nx graph`                 | View dependency graph      |

## 10. Environment and Config

- **Environment variables:** Copy `.env.example` to `.env.local` in each app as needed (see [README](../README.md#environment-variables)).
- **Tailwind:** Used in `web-ssr` and `web-spa`; config lives in each app or at the root as appropriate.
- **CORS:** See [CORS Strategy](cors-strategy.md) for how each app handles the external API.

This sequence reflects the actual development flow: workspace creation → plugins → shared library → SSR app → SPA → mobile app → lint and tooling.
