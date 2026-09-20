# Mobile stack research and adoption — 2026-09-07

## Evidence recovered

The original ChatGPT conversation **Nghiên cứu công nghệ DecoUp**, ID 6a96a28a-8560-83ec-ba66-7b9a4344dc83, was read again for this request. Its first research answer recommends **React Native + Expo + TypeScript** for mobile, separately from Next.js web and Java/Spring Boot backend. It also discusses Expo Router as a navigation/deep-linking option.

The earlier local scaffold said no mobile framework was chosen because that recommendation had not yet been applied to a native repo. The current user explicitly requested checking the research and initializing mobile from it. This scaffold now adopts the recommended trio; it does not imply approval of all provider/database/business proposals in that conversation.

## Verified initialization basis

The current Expo documentation supports a blank TypeScript template with no navigation configured. For minimal scaffolding, the inspected npm template is **expo-template-blank-typescript@57.0.22**:

- Expo ~57.0.20
- React Native 0.86.3
- React 19.2.3
- expo-status-bar ~57.0.1
- TypeScript ~6.0.3 and @types/react ~19.2.2

The template was inspected in OS temp; only the minimal bootstrap/configuration was adopted with DecoUp naming and private domain placeholders. The dependency lock records actual resolved versions. No generator was allowed to overwrite existing AGENTS.md, install a global plugin, create CLAUDE.md, provision EAS or auto-commit.

## Deliberately deferred

Expo Router/navigation, auth, state/query libraries, persistence, notifications, chat, media uploads, maps, payments, shipping, branding assets and app-store/native identifiers wait for concrete approved requirements. There is no parallel mobile web app. A blank bootstrap is enough to establish the native build foundation without inventing product screens.

## Sources

- Original conversation ID above, read-only historical recommendation; no copied business spec.
- [Expo project creation](https://docs.expo.dev/get-started/create-a-project/)
- [Expo templates and setup options](https://docs.expo.dev/more/create-expo/)
- [Pinned blank TypeScript package](https://www.npmjs.com/package/expo-template-blank-typescript/v/57.0.22)

These are point-in-time checks, not claims that versions stay current indefinitely.
