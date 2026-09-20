# Mobile scaffold verification — 2026-09-07

## Impeccable + SkillUI flow — 2026-09-16

Added the unchanged Impeccable snapshot and project-owned decoup-mb-skillui adapter (30 total skills). Hallmark is not installed. SkillUI evidence now feeds Impeccable design work, while Expo guidance remains responsible for native implementation details and device validation. No CLI, engine, hook, browser bridge, runtime package or product UI was activated.

## Native UI skills extension

Added expo-overview, expo-native-ui and expo-design-system (28 total skills). All 15 installed Expo skill/support files and the license compare byte-for-byte with source commit d0075ffa09928f1edb3e7ac4f5af07586d4b344d. Provider and invocation labels, raw reader copies, usage-guide links and mobile type/import checks validate. The generic skill validator rejects the upstream `version` frontmatter key on all three; this compatibility warning is retained rather than modifying provider originals. The reader accepts their actual name/description metadata and invocation files.

Only instructions and docs changed; no native runtime/package, product UI, brand value, navigation, telemetry, hook, EAS or MCP was added. expo-ui and other uninstalled routing targets are explicitly gated. Existing dependency audit and device limitations below remain unresolved, not cleared by skill installation.

- `npm run check`: TypeScript and dependency-cruiser pass (18 source modules). Five negative boundary-rule match cases cover peer imports, internal imports, reverse shared imports, shell imports and sibling-source imports; these are structural checks, not behavioral tests.
- `npx expo install --check`: compatible dependencies; `npx expo-doctor`: 21/21 checks pass.
- `npx expo export --platform all --output-dir /tmp/decoup-mb-export`: iOS and Android Hermes bundles exported successfully. No web target is configured. Export output stays outside this repo.
- All four project-owned skills pass the bundled skill validator. The 21 Matt skill directories compare byte-for-byte with the same pinned installation in decoup-web, including supporting files.
- Existing Git metadata is retained; no commits, remotes, app-store identities, EAS setup or native permissions are added. Specs and Trello configuration retain their existing identities and disabled publishing state.

## Dependency audit caveat

The point-in-time production dependency audit reports 10 moderate entries propagated through Expo's tooling dependency on xcode/uuid, including [GHSA-w5hq-g745-h8pq](https://github.com/advisories/GHSA-w5hq-g745-h8pq). npm's proposed overall fix downgrades Expo to SDK 46; it was not applied because it would break the selected SDK 57 compatibility set. No unverified uuid major override was added. Review compatible upstream fixes before a production/native release; successful Expo checks do not clear this advisory.

## Not verified

No Android emulator, physical device, native Gradle build, iOS simulator or Xcode build was run. Metro bundle success is not evidence for native integrations, device behavior or store readiness. Product behavior remains unimplemented, so there are no fabricated feature tests.
