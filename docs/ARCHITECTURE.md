# Mobile architecture

## Current shape

One React Native + Expo + TypeScript client for Android and iOS. It consumes the single decoup-be backend today; backend microservices later must not leak service topology into screens. Web/landing is separately owned by decoup-web.

The source is intentionally small: index.ts registers src/app/App.tsx; the root displays a visual-language scaffold. Expo Router was described in the original research, but a routing tree is deferred until actual navigation requirements exist. No native ios/android directories, state library, API SDK, network calls or business screens are generated.

## Ownership

- src/app composes feature public entrypoints.
- src/modules contains identity, marketplace, order, booking, payment, shipping, chat, notification, media and search. These are placeholders, not service boundaries or implemented flows.
- Each module exposes index.ts and owns internal/. Peer-module imports and shell imports are forbidden.
- src/shared contains empty contracts/api-client entrypoints and one appearance-aware theme behind ui/index.ts. src/platform reserves native adapters; neither imports domains or the shell.
- No Next.js, DOM UI, backend entities, cross-repo source imports or backend business authority belongs here.
- Share real reviewed transport contracts via versioned packages when useful, not sibling filesystem imports.

## Migration and compatibility

Released mobile binaries cannot be updated atomically with a backend deploy. Before a breaking contract change, identify supported app versions, additive rollout strategy, rollback limits, cache/offline behavior and retry safety. These are review considerations, not permission to invent offline persistence or infrastructure now.

The living reference in .agents/skills/mono-to-microservices/references/project-state.md tracks actual evidence. Features remain driven by approved central mobile/shared specs and linked BE/web tickets.

## Validation

npm run check validates TypeScript and dependency direction. Expo dependency checks and Metro exports validate SDK alignment/bundling, not native builds, runtime permissions or device UX. Add feature tests only alongside actual approved behavior; no product test suite is invented for an empty app.
