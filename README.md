# Erasys Gallery

An Nx monorepo containing a **Next.js SSR application**, a **React SPA**, and a **shared profile SDK** -- all written in TypeScript with Tailwind CSS.

## Quick Start

```bash
# Install dependencies
npm install

# Start the SSR app (http://localhost:3000)
npx nx dev web-ssr

# Start the SPA (http://localhost:4200)
npx nx dev web-spa

# Run shared library tests
npx nx test profile-sdk

# Run tests with coverage
npx nx test profile-sdk --coverage
```

## Key Commands

| Command                   | Description                        |
| ------------------------- | ---------------------------------- |
| `npx nx dev web-ssr`      | Start Next.js dev server           |
| `npx nx dev web-spa`      | Start Vite dev server              |
| `npx nx build web-ssr`    | Production build (SSR)             |
| `npx nx build web-spa`    | Production build (SPA)             |
| `npx nx test profile-sdk` | Run shared library tests           |
| `npx nx lint <project>`   | Lint a project                     |
| `npx nx graph`            | Visualize project dependency graph |

## Environment Variables

Copy `.env.example` to `.env.local` in each app directory:

| Variable            | App     | Description                                                        |
| ------------------- | ------- | ------------------------------------------------------------------ |
| `API_BASE_URL`      | web-ssr | External API origin (default: `https://www.hunqz.com`)             |
| `VITE_API_BASE_URL` | web-spa | API base URL; empty in dev (Vite proxy), set to SSR origin in prod |

## Documentation

- [Architecture Overview](docs/architecture.md)
- [CORS Strategy](docs/cors-strategy.md)
- [Profile SDK](docs/profile-sdk.md)

## Tech Stack

- **Monorepo**: Nx 22
- **SSR**: Next.js 16 (App Router, Server Components)
- **SPA**: React 19, Vite, React Router
- **Shared**: TypeScript, Jest, SWC
- **Styling**: Tailwind CSS 3
- **Linting**: ESLint 9, Prettier
