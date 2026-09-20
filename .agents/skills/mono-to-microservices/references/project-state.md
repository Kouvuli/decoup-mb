# Living mobile compatibility reference

Verified 2026-09-07 against the newly initialized scaffold. No business feature or backend extraction exists.

| Area | Observed evidence | Remaining uncertainty |
| --- | --- | --- |
| App bootstrap | index.ts registers src/app/App.tsx; Expo + React Native + TypeScript | No native/device validation evidence yet |
| Domain boundaries | Ten empty src/modules public entrypoints with private internal directories | No real interaction graph or user journeys |
| Client contracts | src/shared/contracts and api-client are empty exports | No API, auth, error or version-compatibility contract exists |
| Native integration | src/platform is a documented reservation | No permissions, notifications, storage or native adapters configured |
| Structure checks | npm run check executes TypeScript and dependency-cruiser | These checks do not prove native runtime or distributed behavior |
| Spec authority | ../decoup-specs/specs/mobile; planning.json retains Trello disabled | No accepted feature specs or live Trello cards |

Refer to docs/ARCHITECTURE.md, docs/research/mobile-stack.md and docs/adr/0001-expo-mobile-scaffold.md relative to this repository root. Counterparts are ../decoup-be and ../decoup-web; inspect their current contracts before claiming compatibility.

Keep one native client and a monolithic backend today. No measured extraction motivation, supported-client window or service rollout plan has been accepted. Future sessions update only changed evidence and leave uncertainty explicit.

## Maintenance log

- 2026-09-07: Initialized mobile-specific guidance from the researched Expo stack and actual empty scaffold. No shared backend state, native integration or feature behavior was introduced.
