---
name: mono-to-microservices
description: Maintain DecoUp mobile client compatibility as module boundaries and backend contracts evolve, and assess a requested service-extraction impact without turning ordinary native feature work into a microservices migration.
---

# Mobile migration readiness

Read AGENTS.md, docs/ARCHITECTURE.md, the approved central spec/revision, relevant ADRs and [project-state.md](references/project-state.md). Verify affected facts against actual code rather than trusting old notes. This is the mobile edition; the backend remains a modular monolith unless separately authorized otherwise.

## Maintain during implementation

1. Inspect the requested mobile change and its actual task-start baseline, including untracked work. An unborn Git repo has no HEAD comparison.
2. Keep app composition outside domain internals. Cross-domain collaboration uses reviewed public contracts, not peer internals, shared backend entities or direct sibling-source imports.
3. When an API changes, identify affected released app versions, minimum supported capabilities and additive rollout needs. Store-installed binaries and cached clients cannot be updated atomically with the server. Do not pretend an OTA update can repair every native/runtime incompatibility.
4. Review actual retry/idempotency requirements, error states, timeouts and app lifecycle interruptions. Mention offline/cache, secure storage, authentication and push/deep-link concerns only where the change touches them; this is not a mandate to add those systems.
5. Run the available structural/behavioral checks for changed seams. npm run check validates types and imports; native builds, device flows and backend contract compatibility need their own evidence.
6. At closeout, update only changed facts in references/project-state.md, linking source/spec/ADR evidence and unresolved risks. If the change has no migration impact, report that without document churn. Update durable skill guidance only when an agreed decision changes it.

## Requested extraction assessment

For a named backend service cutover, assess the mobile-visible contract, consumer-version window, authentication/error behavior, release sequence and rollback compatibility. Coordinate with decoup-be and decoup-web through linked tickets. Backend topology belongs behind the client seam, not native screens.

Do not perform backend extraction, invent endpoints, add a BFF, create infrastructure or rename app modules as services. Propose the smallest compatible client change and explicit unknowns. Link the assessment in the approved spec or local discovery artifact; changed requirements require a new draft revision and approval.

Suggest decoup-mb-to-spec and decoup-mb-to-ticket as explicit next steps when needed, not automatic workflow calls. This is task-time maintenance, not a daemon or scheduled monitor. Related installed disciplines: codebase-design, tdd, code-review, research and domain-modeling.
