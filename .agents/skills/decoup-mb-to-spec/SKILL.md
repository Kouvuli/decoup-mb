---
name: decoup-mb-to-spec
description: Interview through unresolved mobile decisions, then synthesize or revise the DecoUp specification in the canonical shared spec repository while retaining stable identity, approval history and cross-repo links. This is a project-owned adaptation of Matt Pocock's to-spec workflow, not product implementation.
---

# DecoUp mobile to spec

This is an independently editable adaptation, not an invocation of upstream `to-spec`. Preserve its original files. Derivation is recorded in `docs/agents/local-skills.json`.

## Resolve sources before writing

1. Read this repo's AGENTS.md, `docs/agents/planning.json`, current discussion/spec request, and relevant glossary/ADRs/code. Resolve `specRepository` relative to this repository root, then read that checkout's AGENTS.md, `docs/authoring.md` and `docs/workflow.md`.
2. Verify the destination really is the intended spec checkout. If missing, ambiguous, or unavailable, ask for the correct location and stop writes. Never fall back to a full `.scratch/.../spec.md` copy.
3. Search existing Epics and canonical Features by stable ID, title, domain and scope. Update the intended source rather than creating another file for each revision; when multiple candidates fit, ask which one.
4. Work from agreed discussion and observed facts. Ask only for missing decisions that prevent an accurate spec or approval of testing seams; do not conduct an unrelated discovery interview or silently invent business policy.

## Scope

Write mobile specs in the configured scope directory. Cover mobile user journeys and applicable lifecycle/offline/client-version concerns without selecting an unapproved framework.
For a genuinely shared requirement, propose a shared spec and linked owner specs only when the user's request includes that cross-scope work. Another owner's accepted spec is not yours to rewrite automatically.

## Create or revise

- Resolve one existing parent Epic, or create/update an Epic only when the user requested that outcome grouping. Never hide multiple independently deliverable Features inside one large spec.
- Use the central `templates/spec.md` and authoring rules. Give every User Story a stable `US-XX` ID and map each `AC-XX` to a Story. Include bounded scope, agreed interfaces/decisions, testing seams, dependencies, exclusions, open questions and revision history.
- Capture the existing content/hash and recheck immediately before editing; stop and reconcile a concurrent change. Check ID/path collisions again before creation.
- Keep the stable ID/path; increment revision for changed canonical content. New or changed requirements are drafts, not ready-for-agent. Reset approval metadata on a revised approved spec and preserve the previous approval in history.
- Promote a Feature to approved only after the user approves its exact current revision and test seams; record actual approval evidence. Epic approval confirms the outcome/breakdown separately and never approves child Feature requirements.
- Link source contracts/ADRs and related specs without copying entire documents. Broken/future dependencies stay explicit open questions rather than fabricated existing IDs.
- If changing an approved spec, identify affected ticket IDs/revisions from this repo's local Trello sync records and report that they need reconciliation. Do not mutate Trello, other repos, or old approvals as a side effect of writing a spec.
- An implementation mismatch is a finding: propose a correction or changed requirement, not retrospective approval for whatever the code does.

## Resolve open questions

When unresolved decisions remain, use the installed `grilling` question style and `domain-modeling` discipline directly. Do not auto-invoke the explicit-only `$grill-with-docs` orchestration skill.

1. Build a decision tree from the current Feature's Open Questions and ask only the current frontier: questions whose prerequisites are already settled. Do not expand into unrelated product discovery.
2. Ask numbered rounds. For every question, explain why it matters, present viable choices and trade-offs, and give one clearly marked recommended answer with its rationale. Recommendations are not decisions; wait for the user to confirm or override them.
3. Find facts from available repository evidence, research, or tools instead of asking the user. If a recommendation needs unresolved research, keep that question off the frontier until the research is complete.
4. Keep an answer ledger in the conversation while interviewing. Do not repeatedly revise canonical specs after each round.
5. Finish when every blocking question is answered or the user explicitly defers it. Preserve deferred question IDs and state what they block.
6. After the interview is complete, re-read and collision/hash-check every affected canonical document, then apply one consolidated revision per changed document. Update decisions/contracts, HLD, LLD, data modelling when needed, Stories, Acceptance Criteria, testing seams, dependencies, Open Questions, approval metadata and revision history consistently. Remove resolved questions; never fabricate an answer from a recommendation.
7. Update `CONTEXT.md` only for settled domain vocabulary and offer an ADR only when the installed `domain-modeling` criteria require one. Cross-repo or shared-spec writes still require the scope authorization described above.
8. Answering all questions does not approve the revision. Report the exact revised documents and testing seams, then request explicit approval of each current revision.

## Validate and hand off

Run `npm run catalog` in the spec checkout after writing; report missing runtime/dependencies rather than claiming the viewer refreshed. When validation fails, correct the draft or report it unvalidated; the old reader catalog is not proof the new content is valid.

Return the canonical path, Epic ID, Feature ID, revision, status, Story IDs, changed requirements and outstanding decisions. The HTML reader is generated from the Markdown; do not create or edit a second HTML source.

Suggest `$decoup-mb-to-ticket` once a revision is approved, but do not automatically invoke it. No Trello publication, product implementation, commits, pushes or deployments belong to this skill.
