# Profile SDK (`@erasys/profile-sdk`)

A framework-agnostic TypeScript library for fetching user profile data and building image URLs.

## Public API

### `fetchProfile(options): Promise<Profile>`

Fetches a user profile from the API.

```ts
import { fetchProfile } from '@erasys/profile-sdk';

const profile = await fetchProfile({
  baseUrl: 'https://www.hunqz.com',
  username: 'msescortplus', // optional, defaults to 'msescortplus'
});
```

**Parameters:**

| Field      | Type     | Required | Description                                         |
| ---------- | -------- | -------- | --------------------------------------------------- |
| `baseUrl`  | `string` | Yes      | API origin. Use `''` for relative/proxied requests. |
| `username` | `string` | No       | Profile username. Defaults to `'msescortplus'`.     |

**Throws** an `Error` if the response status is not OK or the network request fails.

### `buildImageUrl(urlToken): string`

Constructs the full image URL from a picture's `url_token`.

```ts
import { buildImageUrl } from '@erasys/profile-sdk';

const url = buildImageUrl('3b587575644d3097fc34228b3c');
// => 'https://www.hunqz.com/img/usr/original/0x0/3b587575644d3097fc34228b3c.jpg'
```

**Throws** an `Error` if `urlToken` is empty.

## Types

All types are exported for consumers:

| Type              | Description                            |
| ----------------- | -------------------------------------- |
| `Profile`         | Complete profile object (top-level)    |
| `ProfilePicture`  | Picture metadata including `url_token` |
| `ProfileLocation` | Location with city and country         |
| `PersonalInfo`    | Physical attributes, languages, age    |
| `ServiceInfo`     | Service rates and locations            |
| `Review`          | User review with optional reply        |
| `SocialLink`      | Social media link (type + value)       |

## File Structure

```
packages/profile-sdk/
├── src/
│   ├── index.ts                      # Barrel exports
│   └── lib/
│       ├── types.ts                  # TypeScript interfaces
│       ├── profile.service.ts        # API client
│       ├── profile.service.spec.ts   # Service tests (6 tests)
│       ├── image-url.builder.ts      # URL construction utility
│       └── image-url.builder.spec.ts # Builder tests (3 tests)
├── jest.config.cts
├── package.json
└── tsconfig.*.json
```

## Testing

Tests use **Jest** with **SWC** for fast transpilation. Coverage threshold is set at **80%** for branches, functions, lines, and statements.

```bash
# Run tests
npx nx test profile-sdk

# Run with coverage report
npx nx test profile-sdk --coverage
```

### Test Coverage

- **`profile.service.spec.ts`** (6 tests): Success path, default username, custom username, URL encoding, HTTP errors, network errors.
- **`image-url.builder.spec.ts`** (3 tests): Correct URL construction, `.jpg` extension, empty input validation.
