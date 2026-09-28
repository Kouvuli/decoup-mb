# Mobile architecture

## Current shape

One React Native + Expo + TypeScript client for Android and iOS. It consumes the single decoup-be backend today; backend microservices later must not leak service topology into screens. Web/landing is separately owned by decoup-web.

In the committed baseline, `expo-router/entry` loads the root Stack in `src/app/_layout.tsx` with public landing, account-entry, and sign-in routes. `src/app-shell/navigation.ts` validates the supported post-authentication destinations and falls back to `/account`; feature modules do not own routing policy. T01 account access uses standard `fetch` against the configured `EXPO_PUBLIC_API_URL` Identity endpoints for phone entry, adult-confirmed creation, optional verified email, and verified-email recovery. Development may explicitly select a `__DEV__`-gated adapter behind the same client seam. The authoritative session remains memory-only pending T04 protected-storage work. Other domain modules remain placeholders. No native ios/android directories, state library, API SDK, durable persistence, or other authoritative business mutation exist.

## Ownership

- `src/app` routes and `src/app-shell` navigation policy compose feature public entrypoints.
- src/modules contains identity, marketplace, order, booking, payment, shipping, chat, notification, media and search. Identity owns the backend-connected account-access client, transient session, and demo capability state; the remaining modules are placeholders, not service boundaries.
- Each module exposes index.ts and owns internal/. Peer-module imports and shell imports are forbidden.
- src/shared contains empty contracts/api-client entrypoints and appearance-aware UI tokens and small shared controls behind ui/index.ts. src/platform reserves native adapters; neither imports domains or the shell.
- No Next.js, DOM UI, backend entities, cross-repo source imports or backend business authority belongs here.
- Share real reviewed transport contracts via versioned packages when useful, not sibling filesystem imports.

## Migration and compatibility

Released mobile binaries cannot be updated atomically with a backend deploy. Before a breaking contract change, identify supported app versions, additive rollout strategy, rollback limits, cache/offline behavior and retry safety. These are review considerations, not permission to invent offline persistence or infrastructure now.

The living reference in .agents/skills/mono-to-microservices/references/project-state.md tracks actual evidence. Features remain driven by approved central mobile/shared specs and linked BE/web tickets.

## Validation

For the committed baseline, `npm test` runs 12 checks covering T01 authority, the development and HTTP Identity clients, account routes, and validated post-authentication destinations. `npm run check` validates TypeScript and dependency direction; Android and iOS Metro exports validate bundling, not native builds, runtime permissions, provider delivery, or device UX. Native-device evidence remains open. Additional worktree checks are not committed-baseline evidence.
