# DecoUp Mobile

React Native + Expo + TypeScript app scaffold for the mobile-first DecoUp product. The original research recommended this stack; the 2026-09-07 request authorizes initializing it now. No marketplace, booking, chat, shipping or payment features exist.

## Layout

```text
.agents/skills/     30 skills: 21 unchanged Matt + 5 project-owned + 3 Expo + Impeccable
.scratch/          discovery and unpublished Trello drafts
index.ts           Expo application registration
src/app/           one scaffold-only root screen
src/modules/       ten private domain placeholders with public entrypoints
src/shared/        empty contracts, api-client and native UI entrypoints
src/platform/      future native adapters, no implementation
docs/              architecture, research, ADRs and agent configuration
```

## Run and check

Use Node 24 LTS and npm 10+:

```sh
npm ci
npm run check
npm start
```

Open the app using a compatible Expo Go/development build or configured Android/iOS simulator. Android tooling must be installed separately; an iOS simulator/native build requires macOS and Xcode. This Linux checkout does not prove device behavior. There is no mobile web target; the web application lives in ../decoup-web.

The runtime versions follow inspected expo-template-blank-typescript@57.0.22 (Expo SDK 57, React Native 0.86.3, React 19.2.3); package-lock.json records the resolved patch versions. See [research and adoption](docs/research/mobile-stack.md) and [architecture](docs/ARCHITECTURE.md). No Expo account, EAS project, app-store identifier, native permission or remote was invented.

## Skills and specs

For UI, follow [Shared brand, native mobile UI](../decoup-specs/docs/shared-brand-native-ui.md). Use `$decoup-mb-skillui` for optional reference evidence, Impeccable for UX/design adaptation, then expo-overview, expo-native-ui and expo-design-system for native implementation and validation. The guide includes deferred dependency gates; no UI runtime was installed.

Read [the full Agent Skills Guide](docs/AGENT_SKILLS_GUIDE.md). Use $decoup-mb-to-spec → approve the exact revision → $decoup-mb-to-ticket. Specs remain in ../decoup-specs/specs/mobile, configured by docs/agents/planning.json. Trello stays disabled and disconnected.

Setup is applied using the existing DecoUp conventions. Discovery is local; approved specifications are central. $mono-to-microservices maintains client compatibility guidance during implementation; $update-matt-pocock-skills audits upstream changes only when requested. Neither is a background job.

Hallmark is not used. No product features, commits, remotes or deployments are created by installing the shared Impeccable + SkillUI flow.

See [setup verification and dependency caveats](docs/SETUP_VALIDATION.md) for completed checks and native/device limitations.

## Contributing

See [Git hooks, commit conventions, CI and GitHub Flow](CONTRIBUTING.md).
