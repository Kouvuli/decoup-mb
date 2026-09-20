---
name: decoup-mb-to-ticket
description: Break an approved DecoUp mobile spec into small repo-owned tickets and publish specifically approved cards through a verified Trello MCP, or save clearly unpublished drafts when disconnected. Preserve stable IDs and reconcile retries instead of duplicating cards.
---

# DecoUp mobile to ticket

An independently editable adaptation of Matt Pocock's `to-tickets`; do not invoke or modify the upstream orchestration skill. Derivation is recorded in `docs/agents/local-skills.json`.

## Gather authoritative context

Read this repo's AGENTS.md and `docs/agents/planning.json`. Resolve the configured sibling spec checkout and read its AGENTS.md, `docs/workflow.md`, `docs/authoring.md` and `docs/trello.md`. Those documents define metadata, source authority and synchronization policy.

Read the full canonical spec, relevant linked scopes, and actual code context. A title or rendered excerpt is not enough. Verify scope and revision. A draft/unapproved/stale spec can support discussion drafts only; label them blocked and do not publish implementation-ready cards.

## Plan bounded slices

- Make each ticket a small, independently verifiable outcome across the necessary layers **owned by this repo**, not a schema/API/UI mandate to write other repos.
- Identify mobile lifecycle, permissions, offline/client-version concerns only when relevant to the approved spec; leave framework choice open if undecided.
- Map every ticket to its parent Epic, Feature revision, User Story IDs and in-scope Acceptance Criterion IDs. Cover every criterion, identify blockers and detect dependency cycles. One Story may map to multiple repo tickets; do not create a parent card for every Story. Link cross-repo prerequisites rather than duplicating their work.
- Present title, delivered outcome, acceptance criteria and blockers. Obtain approval of the breakdown; do not silently inflate scope or close the parent spec.
- Allocate stable local ticket IDs such as `DU-MB-<spec-slug>-T01`; reconcile existing drafts/cards by ID before allocating. Preserve a verified Trello key such as `DE-09901` separately as `externalKey`; never guess the next `DE-` value. Revisions, title edits or receiving an external key do not create a new local identity.

## Stage a reviewable draft

Use `trello.draftDirectory/<local-ticket-id>/draft.md` plus `sync.json` in this code repo. Draft content includes local ticket ID, external key when verified, scope/surface, Epic ID, canonical Feature ID/revision, Story IDs, source path, intended shareable URL if available, outcome, Acceptance Criterion IDs/checklist, blockers and expected evidence.

The sync record contains localTicketId, externalKey, epicId, specId, specRevision, storyIds, acceptanceIds, state (`draft|blocked|uncertain|published`), boardId/listId, cardId/cardUrl (null until verified), lastSyncedAt and the hash of the last managed card content. State is synchronization state, not task completion. Save only real returned values.

Without Trello MCP, verified IDs, approved current spec or a collaborator-readable source reference, stop at drafts and explain what is missing. No credentials in files. Draft staging does not schedule a later send.

## Discover and approve the Trello operation

Require `trello.enabled: true` before any external write. Disabled configuration always means drafts only; changing this flag is not publication approval.

If publishing is requested, discover the actual connected MCP tools/capabilities instead of inventing names. Read back the configured board/list, confirm membership and access, and display the real destination with the exact cards/updates to be sent. New boards/lists/labels, assignments and due dates are out of scope unless explicitly approved.

Require specific publication approval. If it was already given for this exact destination, content and spec revision, do not ask again. A request to create the skill, or merely connect MCP, is not approval to publish cards.

A local path/localhost URL is not a shareable spec link. Follow the central Trello guide: configure a real accessible source/view URL, or obtain specific approval for a redacted spec snapshot attachment through an available connector capability.

## Reconcile, publish, verify

1. Recheck spec approval/revision, local draft hash and destination before writing. Changed inputs require renewed reconciliation/approval.
2. Look up saved card IDs and search the selected board for the exact stable local ticket marker and any verified external key before any create. One match: verify then propose/update that card. Multiple matches or incomplete search capability: stop rather than risk duplicates.
3. Preserve human comments, checklist progress and description content outside the managed section. Compare the managed section with last-synced content; if humans edited it, surface a conflict. Do not overwrite whole cards to refresh a spec revision.
4. Publish blockers first where practical and record blocker IDs/links. If native dependency support is absent, use explicit links/text; do not claim Trello enforces the execution order.
5. After each write, read back and record real card ID, URL, destination, timestamp and the pinned spec revision/content hash. Preserve individual successes if a later card fails.
6. On ambiguous write/timeout, record `uncertain`, then read/search before retrying. Never blindly issue another create. Resume only unresolved tickets. Archive/delete/move operations require separate approval.
7. Report each card's verified result, blocked draft or uncertain state. A success response without verified destination/content is not a completed sync.

Spec requirements remain canonical in decoup-specs. Trello contains execution summaries, links and status; it does not become a second spec store. No implementation, commits, pushes or unrelated remote mutations belong to this skill.
