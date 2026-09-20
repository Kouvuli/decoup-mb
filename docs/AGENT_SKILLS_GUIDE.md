# DecoUp Mobile — Agent Skills Guide

**30 installed skills: 21 unchanged Matt Pocock + five project-owned + three Expo + Impeccable.** The app is React Native + Expo + TypeScript; see [architecture](ARCHITECTURE.md) and [research](research/mobile-stack.md).

For UI, start with [Shared brand, native mobile UI](../../decoup-specs/docs/shared-brand-native-ui.md): prompts, approval flow and validation. Read [local integration rules](agents/mobile-ui-skills.md) and [Expo pins](agents/external-skills-source.json). No brand choices or UI runtime packages were added.

## Settings and ownership

- Canonical instructions: [AGENTS.md](../AGENTS.md).
- Central spec path and future Trello IDs: [planning.json](agents/planning.json).
- Discovery/draft operations: [issue-tracker.md](agents/issue-tracker.md).
- Triage vocabulary: [triage-labels.md](agents/triage-labels.md).
- Glossary/ADRs: [domain.md](agents/domain.md).
- Setup/host rules: [skill-workflow.md](agents/skill-workflow.md).
- Upstream pins: [skills-source.json](agents/skills-source.json); protected custom skills: [local-skills.json](agents/local-skills.json).

All paths below point to this repository. Read upstream originals and their adjacent resources without modifying them; make a differently named project-owned adaptation for customization. Edit project-owned skill behavior at its SKILL.md, not in the generated spec reader.

User-invoked orchestration is explicit. Model-invoked disciplines can assist matching authorized work and can also be invoked directly. Local ownership does not determine invocation mode. No background updater, Trello sender, EAS deployment or automatic commit is installed.

## Recommended flow

$wayfinder or $grill-with-docs → optional $decoup-mb-skillui evidence → $impeccable shape → agreed scope → $decoup-mb-to-spec → approve exact revision → $decoup-mb-to-ticket → approve breakdown → explicit $implement with Impeccable design direction, Expo native guidance, tdd and code-review.

Discovery stays local; specifications remain central. Native/device evidence is distinct from a browser audit, TypeScript check or Metro export. The mobile app remains bootstrap-only until real feature work is requested. Hallmark is not installed.

## Installed Matt skills

### setup-matt-pocock-skills
- **Invocation:** User-invoked (explicit only).
- **What it does:** Configure tracker, triage vocabulary and domain-document pointers.
- **When:** Initial setup or changing tracker/document layout.
- **Dependencies / related:** None; related: triage and all engineering workflows.
- **Read/edit:** [`.agents/skills/setup-matt-pocock-skills/SKILL.md`](../.agents/skills/setup-matt-pocock-skills/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/setup-matt-pocock-skills/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** AGENTS.md; docs/agents/issue-tracker.md, triage-labels.md, domain.md.
- **Do not use for:** Not product planning or implementation.

### ask-matt
- **Invocation:** User-invoked (explicit only).
- **What it does:** Recommend the appropriate skill or workflow; a router, not an executor.
- **When:** When unsure which workflow fits the current question.
- **Dependencies / related:** Related: all installed workflows; optional upstream recommendations are not automatically installed; review relevance before adding them.
- **Read/edit:** [`.agents/skills/ask-matt/SKILL.md`](../.agents/skills/ask-matt/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/ask-matt/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** Normally none; reads workflow configuration.
- **Do not use for:** Not an automatic chain that launches other user-only skills.

### wayfinder
- **Invocation:** User-invoked (explicit only).
- **What it does:** Map a large, uncertain effort into linked decision tickets.
- **When:** Multi-session discovery before an implementation spec exists.
- **Dependencies / related:** research, prototype, grilling, domain-modeling; related: to-spec, to-tickets.
- **Read/edit:** [`.agents/skills/wayfinder/SKILL.md`](../.agents/skills/wayfinder/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/wayfinder/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** .scratch/<effort>/map.md and issues/*.md; research assets; CONTEXT.md and ADRs through dependencies.
- **Do not use for:** Not a well-scoped feature or permission to implement its map.

### grill-with-docs
- **Invocation:** User-invoked (explicit only).
- **What it does:** Interview about a design while maintaining domain language and decisions.
- **When:** Before specifying an ambiguous feature or integration.
- **Dependencies / related:** grilling, domain-modeling.
- **Read/edit:** [`.agents/skills/grill-with-docs/SKILL.md`](../.agents/skills/grill-with-docs/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/grill-with-docs/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** CONTEXT.md; docs/adr/*.md.
- **Do not use for:** Not implementation; do not invent answers on the user's behalf.

### grilling
- **Invocation:** Model-invoked (also directly invokable).
- **What it does:** Ask decision questions in dependency-aware rounds.
- **When:** As the interview discipline underneath planning workflows.
- **Dependencies / related:** None; related: grill-with-docs, wayfinder, triage, domain-modeling.
- **Read/edit:** [`.agents/skills/grilling/SKILL.md`](../.agents/skills/grilling/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/grilling/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** No persistent output on its own; wrappers save agreed decisions.
- **Do not use for:** Not a substitute for looking up facts or implementing work.

### domain-modeling
- **Invocation:** Model-invoked (also directly invokable).
- **What it does:** Clarify domain terms and record consequential decisions.
- **When:** When terms conflict or a design trade-off becomes settled.
- **Dependencies / related:** None; related: grilling, writing-for-agents.
- **Read/edit:** [`.agents/skills/domain-modeling/SKILL.md`](../.agents/skills/domain-modeling/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/domain-modeling/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** CONTEXT.md (glossary only); docs/adr/*.md.
- **Do not use for:** Not entity generation, database design or an implementation spec.

### research
- **Invocation:** Model-invoked (also directly invokable).
- **What it does:** Investigate primary sources and save cited findings.
- **When:** Before choosing technology or evaluating a provider/API.
- **Dependencies / related:** No skill dependency; upstream expects a background subagent.
- **Read/edit:** [`.agents/skills/research/SKILL.md`](../.agents/skills/research/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/research/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** docs/research/<topic>.md, linked from the relevant local issue.
- **Do not use for:** Not permission to provision services; never assume a subagent is available.

### prototype
- **Invocation:** Model-invoked (also directly invokable).
- **What it does:** Build throwaway visual or logic experiments to settle one design question.
- **When:** Only after a concrete question and prototype scope are agreed.
- **Dependencies / related:** No direct skill dependency; related: handoff, wayfinder, to-spec.
- **Read/edit:** [`.agents/skills/prototype/SKILL.md`](../.agents/skills/prototype/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/prototype/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** Temporary prototype workspace; verdict/pointer in the configured decoup-specs scoped document or a decision ticket; ADR only if warranted.
- **Do not use for:** Not production code, a real integration or an activity for this scaffold-only request.

### to-spec
- **Invocation:** User-invoked (explicit only).
- **What it does:** Synthesize the discussed solution into a buildable spec.
- **When:** When decisions are sufficiently clear; confirm test seams before publishing.
- **Dependencies / related:** Setup configuration; related: domain-modeling, tdd, to-tickets.
- **Read/edit:** [`.agents/skills/to-spec/SKILL.md`](../.agents/skills/to-spec/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/to-spec/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** the configured decoup-specs scoped document using central metadata/approval rules; prefer the project-owned adapter.
- **Do not use for:** Not discovery from scratch or permission to invent unresolved requirements.

### to-tickets
- **Invocation:** User-invoked (explicit only).
- **What it does:** Split an agreed spec into small, independently verifiable slices with blockers.
- **When:** For implementation spanning more than one session.
- **Dependencies / related:** Setup configuration; related: to-spec, implement.
- **Read/edit:** [`.agents/skills/to-tickets/SKILL.md`](../.agents/skills/to-tickets/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/to-tickets/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** .scratch/<feature>/issues/<NN>-<slug>.md, one ticket per file.
- **Do not use for:** Not a request to create backend code in mobile or mobile code in BE.

### implement
- **Invocation:** User-invoked (explicit only).
- **What it does:** Execute an approved spec/ticket using tests and a final review.
- **When:** Only when product implementation is explicitly requested later.
- **Dependencies / related:** tdd, code-review; codebase-design via tdd when seams need design.
- **Read/edit:** [`.agents/skills/implement/SKILL.md`](../.agents/skills/implement/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/implement/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** Approved source/tests; ticket status and evidence; docs only when warranted.
- **Do not use for:** Not for initial scaffolding-only scope. Upstream auto-commit is overridden by AGENTS.md.

### tdd
- **Invocation:** Model-invoked (also directly invokable).
- **What it does:** Build one behavioral test and the minimum implementation per cycle.
- **When:** During approved feature work or bug fixes at agreed public seams.
- **Dependencies / related:** codebase-design when the interface needs design; related: code-review.
- **Read/edit:** [`.agents/skills/tdd/SKILL.md`](../.agents/skills/tdd/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/tdd/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** Source/tests for the approved slice; reads CONTEXT.md and relevant ADRs.
- **Do not use for:** Not bulk speculative tests, private-method tests, or a mandate to build features now.

### codebase-design
- **Invocation:** Model-invoked (also directly invokable).
- **What it does:** Design small public interfaces that hide meaningful complexity.
- **When:** When deciding module shape, dependency direction or test seams.
- **Dependencies / related:** None; related: tdd, improve-codebase-architecture; optional parallel design exploration.
- **Read/edit:** [`.agents/skills/codebase-design/SKILL.md`](../.agents/skills/codebase-design/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/codebase-design/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** Normally advice; an agreed decision may enter docs/adr/ through domain-modeling.
- **Do not use for:** Not one interface per class, speculative abstraction, or merging bounded contexts for code reuse.

### code-review
- **Invocation:** Model-invoked (also directly invokable).
- **What it does:** Review standards compliance and spec fidelity independently.
- **When:** After a meaningful diff exists and a baseline/spec are known.
- **Dependencies / related:** No skill dependency; upstream expects two subagents; reads tracker config.
- **Read/edit:** [`.agents/skills/code-review/SKILL.md`](../.agents/skills/code-review/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/code-review/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** Normally review findings; optional durable report under docs/reviews/.
- **Do not use for:** Not automatic fixes or sign-off without evidence; upstream commit-range flow needs existing commits.

### diagnosing-bugs
- **Invocation:** Model-invoked (also directly invokable).
- **What it does:** Reproduce and minimize a failure before testing hypotheses and fixing it.
- **When:** A hard bug, intermittent failure or performance regression.
- **Dependencies / related:** No direct dependency; related: tdd, codebase-design, improve-codebase-architecture.
- **Read/edit:** [`.agents/skills/diagnosing-bugs/SKILL.md`](../.agents/skills/diagnosing-bugs/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/diagnosing-bugs/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** Regression tests/source for an authorized fix; temporary redacted diagnostic evidence.
- **Do not use for:** Not guessing from logs alone or modifying production without authorization.

### improve-codebase-architecture
- **Invocation:** User-invoked (explicit only).
- **What it does:** Survey real architectural friction and discuss selected improvements.
- **When:** After code/change history exists or a specific friction point is named.
- **Dependencies / related:** codebase-design, grilling, domain-modeling; exploration subagent.
- **Read/edit:** [`.agents/skills/improve-codebase-architecture/SKILL.md`](../.agents/skills/improve-codebase-architecture/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/improve-codebase-architecture/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** OS temp architecture-review-<timestamp>.html; CONTEXT.md and docs/adr/ when decisions land.
- **Do not use for:** Not speculative rewrites of this empty scaffold or automatic microservice extraction.

### resolving-merge-conflicts
- **Invocation:** Model-invoked (also directly invokable).
- **What it does:** Resolve an in-progress merge/rebase by each side's intended behavior.
- **When:** Only when Git actually reports a merge/rebase conflict.
- **Dependencies / related:** No direct dependency; related: code-review and originating tickets/specs.
- **Read/edit:** [`.agents/skills/resolving-merge-conflicts/SKILL.md`](../.agents/skills/resolving-merge-conflicts/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/resolving-merge-conflicts/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** Conflicted files; active Git operation, subject to AGENTS.md authorization rules.
- **Do not use for:** Not starting a merge, dropping changes, force pushing or blanket choosing one side.

### wizard
- **Invocation:** Model-invoked (also directly invokable).
- **What it does:** Author an interactive shell walkthrough for steps requiring a human.
- **When:** Later account setup or credentials/dashboard actions an agent cannot perform.
- **Dependencies / related:** No skill dependency; includes template.sh; related: research.
- **Read/edit:** [`.agents/skills/wizard/SKILL.md`](../.agents/skills/wizard/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/wizard/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** scripts/<purpose>-wizard.sh; README link. Running it later may write ignored .env files or configured secrets.
- **Do not use for:** Not executing the wizard unattended, inventing a provider, or publishing credentials.

### writing-for-agents
- **Invocation:** Model-invoked (also directly invokable).
- **What it does:** Write concise agent instructions with clear pointers and completion criteria.
- **When:** Editing AGENTS.md, skill instructions or agent-facing docs.
- **Dependencies / related:** None; related: domain-modeling and setup-matt-pocock-skills.
- **Read/edit:** [`.agents/skills/writing-for-agents/SKILL.md`](../.agents/skills/writing-for-agents/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/writing-for-agents/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** AGENTS.md; docs/agents/*.md; .agents/skills/<name>/SKILL.md and referenced files.
- **Do not use for:** Not a general marketing/copywriting workflow or justification for duplicating instructions.

### handoff
- **Invocation:** User-invoked (explicit only).
- **What it does:** Create a portable, redacted continuation document referencing primary artifacts.
- **When:** Switching MB/BE working directories, agents or colleagues.
- **Dependencies / related:** None; related: ask-matt, prototype and the skills needed next.
- **Read/edit:** [`.agents/skills/handoff/SKILL.md`](../.agents/skills/handoff/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/handoff/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** OS temporary directory, not the repository; includes repo paths and suggested skills.
- **Do not use for:** Not a second copy of specs/ADRs or guaranteed permanent storage.

### triage
- **Invocation:** User-invoked (explicit only).
- **What it does:** Evaluate raw requests and bugs, then classify and prepare actionable briefs.
- **When:** When actual incoming reports exist; optional until then.
- **Dependencies / related:** grilling, domain-modeling; setup tracker and label docs.
- **Read/edit:** [`.agents/skills/triage/SKILL.md`](../.agents/skills/triage/SKILL.md); absolute path: `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/triage/SKILL.md`. Supporting references/templates are alongside it; customize a project-owned copy rather than modifying these upstream originals.
- **May create/update:** Local issue Status/Category/Comments; .out-of-scope/*.md for rejected enhancements; domain docs if needed.
- **Do not use for:** Not re-triaging to-tickets output, inventing reports, or implementing requests.

## Project-owned skills

### decoup-mb-to-spec

- **Invocation:** User-invoked (explicit only).
- **What:** Synthesize and revise a bounded mobile Feature under a lightweight Epic, including stable User Story/Acceptance Criterion mappings, HLD/LLD and optional data modelling.
- **When:** After discovery, or when a specific agreed spec needs revision.
- **Dependencies / related:** Shared spec checkout and its authoring/template rules; related decoup-mb-to-ticket, research and domain-modeling. Catalog refresh needs the spec repo runtime.
- **Exact read/edit path:** `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/decoup-mb-to-spec/SKILL.md`; adjacent references and agents/openai.yaml where present belong to the skill. Project-owned files may be customized directly.
- **May create/update:** ../decoup-specs/epics/<ID>.md when outcome grouping is requested, ../decoup-specs/specs/mobile/<ID>.md and generated reader views; preserve separate Epic and Feature approval history.
- **Do not use for:** Duplicate local specs, invented approvals, product implementation or rewriting another owner's accepted scope.

### decoup-mb-to-ticket

- **Invocation:** User-invoked (explicit only).
- **What:** Split an approved mobile Feature into bounded tickets mapped to its Epic, revision, Stories and Acceptance Criteria, and later publish specifically approved Trello cards.
- **When:** After exact-revision approval; no cards are sent merely by connecting MCP.
- **Dependencies / related:** Canonical spec checkout; verified Trello capabilities/IDs only for publishing. Related decoup-mb-to-spec and implement.
- **Exact read/edit path:** `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/decoup-mb-to-ticket/SKILL.md`; adjacent references and agents/openai.yaml where present belong to the skill. Project-owned files may be customized directly.
- **May create/update:** Local .scratch/trello/<local-ticket-id>/draft.md and sync.json; verified cards only when configured/authorized. Verified `DE-` keys remain separate and are never guessed.
- **Do not use for:** Blind retries, invented destinations, publishing stale specs or treating localhost as a collaborator-readable reference.

### mono-to-microservices

- **Invocation:** Model-invoked for matching tasks; also directly invokable.
- **What:** Maintain mobile module/client compatibility evidence as backend boundaries evolve.
- **When:** Relevant implementation/refactoring/contract work or an explicit assessment/refresh request.
- **Dependencies / related:** Architecture, approved specs, actual code and living reference; related codebase-design, tdd, research and review.
- **Exact read/edit path:** `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/mono-to-microservices/SKILL.md`; adjacent references and agents/openai.yaml where present belong to the skill. Project-owned files may be customized directly.
- **May create/update:** Its references/project-state.md when evidence changes; agreed durable guidance changes only with a recorded reason.
- **Do not use for:** Backend extraction, speculative infrastructure, forcing app modules into services or assuming all installed binaries update together.

### update-matt-pocock-skills

- **Invocation:** Model-invoked for matching tasks; also directly invokable.
- **What:** Audit and selectively update the installed Matt collection while protecting local state.
- **When:** A requested audit or approved set of upstream updates, not ordinary feature work.
- **Dependencies / related:** Read access to the pinned upstream source; references/update-policy.md; related writing-for-agents and research.
- **Exact read/edit path:** `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/update-matt-pocock-skills/SKILL.md`; adjacent references and agents/openai.yaml where present belong to the skill. Project-owned files may be customized directly.
- **May create/update:** Audit reports in docs/agents/skill-updates; specifically approved upstream files/source records and guide updates.
- **Do not use for:** Blind upgrades, Hallmark adoption, beta adoption without review, or overwriting custom/provider skills, AGENTS.md and tracker configuration.

### decoup-mb-skillui

- **Invocation:** Model-invoked for matching reference-analysis tasks; also directly invokable.
- **What:** Extract bounded design-system evidence with SkillUI for native adaptation through Impeccable and Expo.
- **When:** The user supplies a website, public repository or owned local frontend as a design reference.
- **Dependencies / related:** Deferred skillui@1.3.4 CLI, Node 18+ and network when needed; related Impeccable, Expo and decoup-mb-to-spec.
- **Exact read/edit path:** `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/decoup-mb-skillui/SKILL.md`.
- **May create/update:** Temporary extraction output and reviewed docs/design/references evidence when retention is requested.
- **Do not use for:** Generated/global skill installation, pixel cloning, authenticated capture, React Native implementation or native validation.

## Impeccable design skill

Impeccable is an unchanged provider-owned original. It owns mobile UX/design planning and review; Expo guidance remains authoritative for native APIs, components and device validation.

- **Invocation:** Model-invoked for matching design tasks; also `$impeccable` directly.
- **Dependencies / related:** Bundled references and scripts. Engine acquisition, hooks, live bridges and shortcut pins are deferred and require separate authorization. Related SkillUI, Expo, spec/ticket and code-review.
- **Exact read path:** `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/impeccable/SKILL.md`.
- **May create/update:** Requested PRODUCT.md, DESIGN.md, surface briefs, design findings and authorized UI refinements.
- **Do not use for:** Replacing approved requirements, treating browser output as device evidence or silently activating runtime capabilities.

## Expo native UI skills

These are unchanged provider-owned originals, not Matt or project-owned skills. Read their exact paths and adjacent references; customize a differently named project-owned adaptation, not these originals. Invocation is matching-task automatic selection or direct request. No background jobs or runtime adoption are implied.

### expo-overview
- **What/when:** Start Expo work by identifying the SDK, goal and relevant leaf skill.
- **Invocation:** Model-invoked; also `$expo-overview` directly.
- **Dependencies/related:** Installed expo-native-ui and expo-design-system; other routing targets are not installed. Report missing targets before proceeding with that portion of work.
- **Exact read path:** `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/expo-overview/SKILL.md`.
- **May create/update:** Normally no artifacts itself; routes authorized work. Agreed requirements go through central specs/approval.
- **Do not use for:** Reinitialization, silent SDK upgrades, EAS provisioning or feedback uploads.

### expo-native-ui
- **What/when:** Native layout, styling and behavior during planning or approved implementation.
- **Invocation:** Model-invoked; also `$expo-native-ui` directly.
- **Dependencies/related:** expo-overview/design-system. Upstream requires expo-ui for component selection and expo-router for navigation; both are absent, so gate that work on a scoped review. Bundled references cover controls, icons, media, storage, animation and effects.
- **Exact read path:** `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/expo-native-ui/SKILL.md`.
- **May create/update:** Authorized domain-owned native views, shell composition and validation evidence; planning proposals feed central specs via decoup-mb-to-spec.
- **Do not use for:** HTML/native equivalence claims, automatic iOS-only design, installing example libraries or assuming Expo Go supports every feature.

### expo-design-system
- **What/when:** Map approved intent to one native token/component system; audit design drift, without edits unless requested.
- **Invocation:** Model-invoked; also `$expo-design-system` directly.
- **Dependencies/related:** expo-overview/native-ui and bundled references/audit.md. Optional expo-project-structure is absent and must not restructure this existing app.
- **Exact read path:** `/home/kali/Desktop/DecoUp/decoup-mb/.agents/skills/expo-design-system/SKILL.md`.
- **May create/update:** Authorized theme/primitives behind src/shared/ui/index.ts and supporting DESIGN.md/audit evidence linked to approved canonical revisions. No token implementation exists yet.
- **Do not use for:** Inventing an approved brand, copying demo values as requirements, duplicating a theme or sharing DOM components.

## Setup state and discovery

Setup has been applied from existing DecoUp conventions; no need to rerun it. Start a task in this repo to discover its skills on the next turn. The shared spec reader refreshes its inventory with npm run catalog; it does not install skills itself. No global skills were changed.
