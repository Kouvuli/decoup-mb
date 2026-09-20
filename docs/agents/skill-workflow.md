# Mobile skill setup — 2026-09-07

UI extension: three unchanged Expo skills were installed first. On 2026-09-16, Impeccable and the project-owned decoup-mb-skillui adapter were added for the shared design flow (30 skills total). Follow [mobile-ui-skills.md](mobile-ui-skills.md) for authority, native validation, deferred dependencies and separate provider updates. This extension does not reset planning or Trello configuration.

The existing local mobile planning configuration and AGENTS.md were inspected, along with Git remotes (none), the shared spec checkout and sibling repo conventions. The user requested necessary skills like the two other repos. Setup reuses those established settings: central mobile specs, local discovery and unpublished Trello drafts, existing default triage vocabulary, one glossary and ADR directory. No separate preference interview or remote configuration is claimed.

Outputs: canonical AGENTS.md; issue-tracker.md, triage-labels.md and domain.md in this directory; CONTEXT.md; architecture/ADR and the per-skill guide. Existing planning.json, spec/ticket identity and Trello-disabled state are preserved.

The 21 Matt skill folders are installed unchanged at the same pinned commit as web/BE, recorded in skills-source.json. Five project-owned skills are separate in local-skills.json. The migration/updater pair and SkillUI adapter are mobile-specific adaptations. Impeccable is an unchanged provider snapshot; Hallmark is not installed. No productivity-only or beta add-ons are added.

User-only skills retain their explicit-only policy. Model-invoked disciplines can support an authorized task; no skill grants permission to commit, create branches, deploy, publish or build unrequested features. Load files with actual host tools if no generic Skill tool exists. Report unavailable subagents rather than claiming parallel review.

Prototype can answer a bounded client-state/design question in an authorized temporary workspace. A web mock is not native evidence. Implement/tdd/review apply to approved real mobile behavior later; no behavioral tests are fabricated now.

The upstream commit-range code-review flow requires a real baseline. These repos have no authorized commits yet; inspect new files against the request and disclose that limitation. Wizard helpers need human review; no secrets in tracked files. Setup's preference for CLAUDE.md is overridden by canonical AGENTS.md.

The two manual planning adapters already read the central authoring rules, so feature specs include HLD/LLD and optional data modelling without changing upstream skills. After manual architecture changes, request $mono-to-microservices refresh. Request $update-matt-pocock-skills for an audit, then approve specific updates. Neither is scheduled.

## Delivery hierarchy update — 2026-09-08

The project-owned spec/ticket adapters now use Epic → Feature → User Story → Acceptance Criterion → repo-owned ticket. This prevents oversized Feature specs and maps each Trello card to canonical IDs without duplicating requirements. Stable local ticket IDs remain the pre-publication reconciliation key; verified human-facing `DE-` keys are stored separately and never guessed. Matt's upstream and Expo skills remain unchanged.
