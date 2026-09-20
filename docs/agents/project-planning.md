# mobile specifications and Trello tickets

Use `$decoup-mb-to-spec` for central specs and `$decoup-mb-to-ticket` for execution tickets. These are user-invoked, project-owned adaptations; upstream Matt skills stay untouched. Both live under `.agents/skills/<name>/SKILL.md` and are registered in local-skills.json with their derivation.

## Settings

Edit [planning.json](planning.json). The default spec checkout is the sibling `../decoup-specs`. Path resolution is relative to the code repository root, not a hardcoded workstation path. Trello is disabled, with null IDs and no invented connector/tool name.

The central spec repository documents authoring, revision/approval rules and card synchronization. It uses Markdown as the only editable source and a generated read-only HTML viewer. Local code-repo `.scratch/` may hold discovery and unpublished ticket drafts, not duplicate canonical specs.

## Current behavior

Spec creation writes a draft centrally. Spec approval is a separate explicit decision. Ticket creation stages reviewed drafts under `.scratch/trello/`; no live Trello mutation is possible until connection/configuration and publication approval.

The hierarchy is Epic → Feature → User Story → Acceptance Criterion → repo-owned ticket. Epics remain lightweight central outcome documents; Features contain HLD/LLD and stable `US-XX`/`AC-XX` mappings. Trello cards represent tickets only. A Story may map to separate BE, web and mobile tickets.

## Later Trello setup

Connect MCP, read the available capabilities and real board/list IDs, verify the list belongs to the intended board, fill configuration and enable it. Supply a real accessible source/view URL or explicitly approve a snapshot attachment; localhost links do not work for collaborators. Credentials remain in MCP.

Then invoke the ticket skill to reconcile/publish the exact approved set. It preserves stable local ticket IDs, stores any verified human-facing `DE-09901` key separately, guards against duplicate retries, records verified card URLs, and leaves failures explicit. It never guesses the next `DE-` key. No background synchronization is installed.
