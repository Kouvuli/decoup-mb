# DecoUp mobile

One React Native + Expo + TypeScript app for iOS and Android. Read docs/ARCHITECTURE.md, CONTEXT.md and relevant ADRs before structural changes. The initial implementation is bootstrap and empty domain boundaries only.

## Scope and safeguards

- Product authority stays in decoup-be; web/landing code stays in decoup-web. No direct imports from sibling source.
- AGENTS.md is canonical. Never create a competing CLAUDE.md during setup.
- Skills support an authorized task, not permission to implement features, commit, create branches, push, publish, provision accounts, configure EAS or mutate Trello.
- Upstream automatic commit/branch actions are subordinate to these rules. Load the actual installed SKILL.md and supporting references with available tools; do not invent a Skill tool or subagents.
- No business features, native permissions, authentication, payment/chat providers, API endpoints or schemas are implemented.
- A prototype in HTML is not evidence of React Native behavior. Real native/device checks need the actual app and relevant toolchain; do not claim them from TypeScript or Metro export alone.

## Boundaries

- index.ts only registers src/app/App.tsx. The app shell composes public src/modules/<domain>/index.ts entrypoints.
- Feature modules never import peer modules or the app shell. Internal implementation stays private.
- Shared and platform code cannot depend on domains or the app shell. Backend service topology belongs behind a client boundary, not screens.
- Run npm run check for types and import boundaries. Navigation, shared contract packages and native integrations are added only when actual agreed features need them.
- The Expo blank TypeScript template is the bootstrap basis; Expo Router was mentioned in research but is not needed for this single placeholder. Do not silently add a navigation system.

## Agent skills

### Native UI and shared brand

Read docs/agents/mobile-ui-skills.md and ../decoup-specs/docs/shared-brand-native-ui.md before UI work. SkillUI gathers reference evidence; Impeccable adapts UX/design intent; Expo guidance owns native implementation details and device validation. Reuse approved brand decisions, not upstream sample tokens or extracted CSS. Planning does not authorize coding.

Preserve private domain boundaries. Future theme/primitives belong behind src/shared/ui/index.ts, not competing src/theme/src/components folders from examples. Verify guidance against the installed SDK and both Android/iOS; broad Expo Go claims and iOS defaults are not universal guarantees.

The three Expo skills, Impeccable and the project-owned SkillUI adapter are installed. expo-ui (required by upstream component-selection guidance), expo-router and other routing targets are absent; report the gap and propose a scoped review before that work. Do not invent instructions, silently install runtime packages, change navigation or reinitialize the app. No telemetry, feedback upload, plugin/MCP setup, EAS linking or cloud/native build is authorized by skill installation. SkillUI must use temporary `--format design-md --no-skill` output; Impeccable hooks, live bridges, pins and engine acquisition need separate authorization.

### Issue tracker

Use decoup-mb-to-spec and decoup-mb-to-ticket. Read docs/agents/planning.json and issue-tracker.md. Canonical specs live in the configured sibling decoup-specs/specs/mobile directory. These workflows may write that scoped source after reading its AGENTS.md and authoring/workflow/Trello docs. Other scope changes need explicit authority. No duplicate canonical .scratch spec.

Delivery hierarchy is Epic → Feature → User Story → Acceptance Criterion → repo-owned ticket. Trello cards are tickets, not copies of Epics or Stories; preserve verified `DE-` keys separately from stable local draft IDs.

### Triage labels

Use the same local vocabulary as web/BE; read docs/agents/triage-labels.md. Discovery and draft tickets remain local until actual Trello configuration and specific publication approval. Never claim unpublished drafts are cards.

### Domain docs

One CONTEXT.md glossary plus docs/adr. Read docs/agents/domain.md; shared requirements remain in decoup-specs.

### Living migration guidance

Read .agents/skills/mono-to-microservices/SKILL.md for implementation, refactoring and contract work. At closeout, refresh references/project-state.md only when observed facts change. Consider released mobile binaries and rollback compatibility; this does not authorize backend extraction or a background watcher.

### Skill updates

Use update-matt-pocock-skills for requested audits and explicitly approved selective updates. Preserve local-skills.json, custom skills, project state, Impeccable, the SkillUI adapter and setup configuration. Hallmark is not installed.

### Setup and invocation

Read docs/agents/skill-workflow.md before changing skill behavior. The 21 unchanged Matt skills, five project-owned skills, three Expo skills and Impeccable total 30. Provider originals are protected in docs/agents/external-skills-source.json and updated separately from Matt. Manual orchestration stays explicit; supporting skills and migration/updater guidance may activate for matching tasks. Existing configuration is already applied and need not be reset.
