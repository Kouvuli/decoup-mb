# Account capabilities T01 implementation verification · 2026-09-28

The Account flow calls the Identity HTTP contract configured by `EXPO_PUBLIC_API_URL`. Development can explicitly select a deterministic adapter with `EXPO_PUBLIC_IDENTITY_MODE=mock` and `EXPO_PUBLIC_IDENTITY_SCENARIO=new-account|returning-account`. The selection also requires `__DEV__`, so production ignores mock mode and fails closed when its API URL is absent.

Both adapters use the same injected client seam. They support the same non-enumerating phone path for new and returning accounts, explicit 18+ confirmation without a birth-date field, optional verified email, and verified-email recovery through a replacement phone. Success state is entered only after a successful Identity response; malformed, failed, or offline responses do not authenticate the user.

The authorized session is deliberately memory-only because protected persistence, restoration, expiry and sign-out belong to T04. Production readiness also remains blocked on a real challenge-delivery provider, approved regional policy, distributed integration evidence, and physical-device checks. Public discovery still uses development-only marketplace fixtures, so AC-01 needs an authoritative public-data connection before production completion.

| Check | Result |
| --- | --- |
| Focused Identity client checks | Passed: eight checks covering production fail-closed selection, development new/returning account and recovery scenarios, HTTP request paths/bodies, Bearer authorization, and malformed authenticated response rejection |
| Existing T01 state check | Passed: neutral phone response; adult accept/decline; optional verified email or deferral; invalid, expired, replayed, cooldown, rate-limited, offline, interrupted and failed outcomes |
| `npm run check` | Passed: TypeScript and import boundaries, 61 modules and 118 dependencies |
| `npm test` | Passed: 12 checks from the committed test command; the broader dirty worktree has separate T02 checks |
| `npx expo install --check` | Previously passed on 2026-09-23; not rerun for this dependency-free change |
| Android/iOS Metro export | Passed: Expo Router production bundles generated for both platforms |
| Android device keyboard, SMS autofill, text scaling, TalkBack, lifecycle and interruption | Pending: `adb` is unavailable |
| iOS device keyboard, SMS autofill, text scaling, VoiceOver, lifecycle and interruption | Pending: `xcrun` is unavailable in this Linux environment |

The optional `expo-ui` component guidance is not installed. The implementation reuses the existing accessible shared controls plus React Native `TextInput` and `Switch`; no package was added.
