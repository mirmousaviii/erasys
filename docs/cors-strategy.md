# CORS Strategy

The external API at `https://www.hunqz.com` does not include CORS headers, so direct browser requests from a different origin will fail. This project addresses CORS differently for each application.

## SSR Application (`web-ssr`)

**No CORS issue.** The profile page is a Next.js **Server Component** -- data fetching happens on the Node.js server, not in the browser. Server-to-server requests are not subject to CORS.

Additionally, a Next.js **API route** is provided at **`/api/profiles/[username]`**. This route:

1. Receives the browser request.
2. Fetches data from the external API server-side.
3. Returns the response (including errors) with CORS headers: `Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: GET, OPTIONS`, and supports **OPTIONS** preflight for cross-origin requests.

This API route serves as a CORS proxy that clients can call in production. Note: the profile-sdk uses the path `/api/opengrid/profiles/...`; for SPA production you can either use a reverse proxy (see below) or point the app at an API that exposes that path.

## SPA Application (`web-spa`)

### Development

Vite's built-in **dev proxy** is configured in `vite.config.mts`:

```ts
proxy: {
  '/api': {
    target: 'https://www.hunqz.com',
    changeOrigin: true,
    secure: true,
  },
}
```

All requests to `/api/*` from the browser are intercepted by Vite and forwarded to the external API, bypassing CORS entirely.

### Production

In production, the Vite proxy is not available. The SPA uses the `VITE_API_BASE_URL` environment variable to point to a backend that can serve the data. Options:

1. **Reverse proxy (nginx, etc.)** -- Configure the production web server to proxy `/api` requests to the external API. The profile-sdk calls `/api/opengrid/profiles/...`, so the proxy target should be the external API (`https://www.hunqz.com`).
2. **SSR API route** -- Set `VITE_API_BASE_URL` to the SSR app and use the path `/api/profiles/...` (the SSR app exposes `/api/profiles/[username]` only). This would require the client not to use the profile-sdk default path, or to add a corresponding route on the SSR app.

## Profile SDK

The shared `fetchProfile()` function accepts a `baseUrl` parameter, keeping the SDK completely agnostic about CORS handling:

```ts
// SSR: direct server-to-server call
fetchProfile({ baseUrl: 'https://www.hunqz.com', username });

// SPA dev: proxied via Vite (relative URL)
fetchProfile({ baseUrl: '', username });

// SPA prod: proxied via SSR API route
fetchProfile({ baseUrl: 'http://ssr-host:3000', username });
```

This design ensures the SDK is reusable across environments without modification.
