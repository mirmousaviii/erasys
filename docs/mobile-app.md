# Mobile App (`@erasys/mobile`)

The mobile app is a React Native application that reuses the same profile data and UI flow as the web apps, powered by `@erasys/profile-sdk`.

## How to Run

### In the browser (recommended for quick testing)

Uses **Vite** and **react-native-web** so you can open the app in a normal browser without a simulator.

```bash
npx nx dev mobile
```

Then open **http://localhost:4201** in your browser. If port 4201 is in use, Vite will pick the next available port (e.g. 4202) and print it in the terminal.

**Do not** use `npx nx start mobile` for browser testing — that starts the Metro bundler, which is for native only. Metro’s UI at http://localhost:8081 is not your app.

### On iOS simulator

1. Start the Metro bundler (in one terminal):

   ```bash
   npx nx start mobile
   ```

2. In another terminal, run the iOS app:

   ```bash
   npx nx run-ios mobile
   ```

Requires Xcode and iOS simulator setup.

### On Android emulator

1. Start the Metro bundler (in one terminal):

   ```bash
   npx nx start mobile
   ```

2. In another terminal, run the Android app:

   ```bash
   npx nx run-android mobile
   ```

Requires Android Studio and an emulator or connected device.

## Commands summary

| Command                     | Purpose                                      |
| --------------------------- | -------------------------------------------- |
| `npx nx dev mobile`         | Run in **browser** (Vite, port 4201)         |
| `npx nx start mobile`       | Start **Metro** for native (port 8081)       |
| `npx nx run-ios mobile`     | Run on **iOS** (Metro must be running)       |
| `npx nx run-android mobile`| Run on **Android** (Metro must be running)  |
| `npx nx build mobile`       | Production **web** build (Vite output)       |

## Architecture

- **Entry (web):** `src/main-web.tsx` → `App.tsx` (Vite resolves `react-native` to `react-native-web`).
- **Entry (native):** `src/main.tsx` → `App.tsx` (Metro bundles for iOS/Android).
- **Screens:** `HomeScreen` and `ProfileScreen` in `src/app/screens/`.
- **Data:** `fetchProfile` and `buildImageUrl` from `@erasys/profile-sdk`. On **native** the app calls `https://www.hunqz.com` directly (no CORS). In the **browser**, it uses a relative URL and the Vite dev proxy (`/api` → hunqz.com) to avoid CORS.
- **Navigation:** In-memory state (`home` | `profile`); no React Navigation dependency.
- **Styling:** `src/app/theme.ts` plus `StyleSheet` in each screen.

## Tech stack

- React Native
- Vite (web dev/build), Metro (native bundling)
- react-native-web, react-native-svg (and react-native-svg-web for Vite)
- TypeScript, `@erasys/profile-sdk`
