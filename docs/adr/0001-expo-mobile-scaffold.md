# Expo mobile scaffold

Adopt React Native + Expo + TypeScript for the single native client, based on the recovered mobile research and the user's 2026-09-07 initialization request.

Use a blank TypeScript bootstrap rather than a feature-filled navigation template. Keep one app, private domain boundaries and a client seam for backend contracts. This avoids fabricated screens and keeps mobile separate from decoup-web and decoup-be. Expo Router remains an option when real navigation is designed; no framework switch is implied by deferring it.

The cost is that navigation, native integrations and behavioral/device tests still need deliberate work when features arrive. TypeScript checks and Metro exports alone are not evidence of native runtime correctness.

Evidence: [mobile stack research](../research/mobile-stack.md); [architecture](../ARCHITECTURE.md).
