# Mobile UI integration — 2026-09-07

Start with [Shared brand, native mobile UI](../../../decoup-specs/docs/shared-brand-native-ui.md) for prompts, approval flow and native validation. This is workflow guidance, not an approved brand specification.

Installed: Impeccable, the project-owned decoup-mb-skillui adapter, expo-overview, expo-native-ui and expo-design-system. [external-skills-source.json](external-skills-source.json) records provider sources and licenses. [The skill guide](../AGENT_SKILLS_GUIDE.md) lists exact paths and outputs. These allow matching-task selection and direct invocation, not scheduled operation.

## Design flow

1. When a user supplies a reference, use `$decoup-mb-skillui` to extract bounded evidence into a temporary directory.
2. Use `$impeccable shape <surface>` to adapt that evidence and approved brand intent to mobile UX; DOM/CSS is evidence, never native implementation.
3. Record agreed requirements through `$decoup-mb-to-spec`, obtain exact-revision approval, then plan tickets with `$decoup-mb-to-ticket`.
4. For authorized implementation, start with expo-overview and use expo-native-ui/design-system as routed. Impeccable remains the design lead; Expo remains the native technical authority.
5. Review with Impeccable audit/critique plus real platform accessibility/device checks. A browser audit cannot substitute for native evidence.

## Local interpretation

- Keep provider originals unchanged. Customize this project-owned guidance or register a differently named local adaptation. The Matt updater must not modify Impeccable or Expo; audit provider updates separately before approving changes.
- Consume approved shared brand revisions. Extracted web designs and upstream examples are not approval. Do not fabricate a shared spec or brand palette to complete setup.
- Future native theme/primitives stay behind src/shared/ui/index.ts; private views stay in domain internals. No parallel src/theme/src/components trees or new components are created now.
- expo-ui is an explicit component-selection dependency in upstream native guidance but is not installed. Before such implementation, report the gap and propose a scoped skill/dependency review. Likewise do not pretend expo-router, expo-animation or other routing targets are installed.
- Instructions are not runtime packages. No Router, @expo/ui, styling library, telemetry, feedback upload, hook, MCP, EAS account or device automation is configured.
- SkillUI is a deferred CLI, not an app dependency. Keep `--format design-md --no-skill`; do not globally install generated skills. Impeccable runtime acquisition, hooks, live bridges and shortcut pins require separate authorization.
- Check installed-SDK documentation and both platforms rather than relying on broad Expo Go claims or iOS-specific examples. Native permissions and native builds require actual task scope.
- Type checks, Metro exports and browser screenshots do not prove native/device behavior. Report unavailable validation without inventing results.
