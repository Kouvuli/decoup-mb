# Living mobile compatibility reference

Verified 2026-09-28 against the current committed baseline. T01 is backend-connected, but no backend extraction exists.

| Area | Observed evidence | Remaining uncertainty |
| --- | --- | --- |
| App bootstrap | Expo Router enters through `expo-router/entry`; the root Stack exposes public landing, account entry, and sign-in. `src/app-shell/navigation.ts` owns destination validation and `/account` fallback | Routes have no native device validation; iOS and standalone Android remain unverified |
| Shared UI | `src/shared/ui/index.ts` exports appearance-aware colors, typography, spacing, radius, shadows, and small shared controls | iOS/Android rendering, text scaling, screen readers, focus and reduced motion await device checks |
| Domain boundaries | Identity exposes backend-connected phone entry, adult-confirmed account creation, optional verified email, recovery, transient session, and demo capability state. Other modules remain placeholders | Session state is memory-only pending T04; no released-client evidence or supported-client window is recorded |
| Client contracts | Identity encodes and validates the local HTTP paths, response shapes, retry timing, and safe error messages. An explicitly configured, `__DEV__`-gated adapter uses the same client seam. `src/shared/contracts` and `src/shared/api-client` remain empty exports | No versioned shared transport package, durable auth contract, or backend deployment compatibility evidence exists |
| Native integration | src/platform is a documented reservation | No permissions, notifications, storage or native adapters configured |
| Structure checks | On the current committed baseline, 12 tests, `npm run check`, and Android/iOS Metro exports pass | These checks do not prove native runtime, provider delivery, offline recovery, or distributed behavior |
| Spec authority | T01 follows approved `../decoup-specs/specs/mobile/DU-MB-account-capabilities.md` revision 1 | Delivery/provider configuration, regional policy, public-product data, and device evidence remain open |

Evidence: [architecture](../../../../docs/ARCHITECTURE.md), [stack research](../../../../docs/research/mobile-stack.md), [scaffold ADR](../../../../docs/adr/0001-expo-mobile-scaffold.md), and [T01 specification](../../../../../decoup-specs/specs/mobile/DU-MB-account-capabilities.md). Counterparts are `../decoup-be` and `../decoup-web`; inspect their current contracts before claiming compatibility.

Keep one native client and a monolithic backend today. No measured extraction motivation, supported-client window or service rollout plan has been accepted. Future sessions update only changed evidence and leave uncertainty explicit.

## Maintenance log

- 2026-09-28: Added an explicitly configured, `__DEV__`-gated Identity adapter behind the existing client seam for new account, returning account, optional email, and replacement-phone recovery development flows. Production ignores mock mode and still fails closed without an API URL. No HTTP path, response shape, package, backend seam, persistence, or released-client contract changed. Twelve tests, TypeScript/import checks, and Android/iOS Metro exports pass; native devices, provider delivery, regional policy, authoritative public data, and distributed compatibility evidence remain open.
- 2026-09-27: Moved validated post-authentication navigation from Identity into `src/app-shell`, keeping domain internals independent of Router and preserving the existing Order/Chat allowlist plus `/account` fallback. No HTTP path, response shape, persisted state, backend seam, or released-client contract changed. On committed baseline `82f4768`, eight tests, TypeScript/import checks, and Android/iOS Metro exports pass; native devices, provider delivery, regional policy, and supported-client/rollback evidence remain open.
- 2026-09-20: Added the shared UI theme and visual-language scaffold after approval of mobile Feature revision 5; TypeScript/import checks and iOS/Android Metro exports passed, with device checks unavailable.
- 2026-09-20: Verified approved mobile Feature spec revisions and the draft shared service contract. No mobile product code or migration seam changed.
- 2026-09-07: Initialized mobile-specific guidance from the researched Expo stack and actual empty scaffold. No shared backend state, native integration or feature behavior was introduced.
