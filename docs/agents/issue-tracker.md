# Planning tracker: central specs, local discovery, Trello intended

Read [planning.json](planning.json) and [project-planning.md](project-planning.md). No Git remote or Trello connection exists. MCP connection alone does not publish queued work.

## Canonical specs

Use `$decoup-mb-to-spec`. Specifications live under the configured sibling `decoup-specs/specs/mobile/`, not in .scratch. Follow that repo's AGENTS.md and docs/authoring.md for stable IDs, revisions, draft/approved status and exact-revision approval. Never duplicate canonical specs here. Legacy local spec references are not the new default; no product specs existed when this configuration changed.

## Implementation tickets

Use `$decoup-mb-to-ticket`. Stage `.scratch/trello/<local-ticket-id>/draft.md` and `sync.json`, mapped to the Epic, Feature revision, Stories and Acceptance Criteria. Store a verified human-facing `DE-` key separately; never guess it. A local write is a draft, not Trello publication. Follow the central docs/trello.md for destination verification, explicit approval, shareable source requirements, managed content and duplicate-safe retries. No tokens in files.

The sync state (draft/blocked/uncertain/published) is separate from execution status (ready-for-agent/in-progress/done). Only a current approved spec and approved breakdown make a ticket eligible for implementation. Record acceptance evidence before done. Trello list mappings and external completion updates need explicit configuration/authorization; never infer them from list names.

If an upstream workflow is explicitly requested, honor this source/configuration policy. Prefer recommending the custom adapter; do not automatically invoke another user-only skill. For deliberately local-only tickets, use .scratch/<feature>/issues/<NN>-<slug>.md and link the canonical spec ID/revision. That local workflow never implies Trello publication. Triage vocabulary remains in triage-labels.md; preserve comments and AI disclaimers.

## Wayfinding operations

- Map: `.scratch/<effort>/map.md` with Destination, Notes, Decisions so far, Not yet specified and Out of scope.
- Decision ticket: `.scratch/<effort>/issues/NN-<slug>.md`; `Type: research|prototype|grilling|task`, `Status: open|claimed|resolved`, `Blocked by:` and a question.
- Frontier: open, unclaimed tickets whose blockers are all resolved; lowest number first. Claim by setting `Status: claimed` and `Assignee:` before work.
- Resolve: add `## Answer`, set `Status: resolved`, and append a named link plus one-line gist in the map. Do not duplicate the full answer.
- Keep discovery efforts separate from implementation feature folders; the two have different status vocabularies.
- Filesystem claims are not atomic across agents/checkouts. Use one writer per effort, or coordinate explicitly; move to a real tracker before concurrent queue processing.


## Change settings later

Edit planning.json with the real checkout and, after MCP is connected, verified Trello board/list IDs. Keep Trello disabled until a tested publish request. GitHub is not selected merely because a remote is added. Rerunning setup must preserve AGENTS.md as canonical and these central-source/custom routing choices.
