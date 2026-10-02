# Context: testts

## Overview
This repository is a newly initialized Invowork project. The product name is **testts**, but no domain logic, stack, or business rules have been defined yet. Application code is expected to arrive via pull requests.

## Key Points
- **Status**: Bootstrap phase — no code, manifest, or domain specification is currently present.
- **Development model**: Code contributions come through PRs; this repo is the upstream integration point.
- **Business domain**: Not yet documented. When PRs arrive, domain invariants, core entities, and business rules should be captured here (or in associated documentation).

## What to Expect
Once development begins, this context.md should cover:
- What the product does and who uses it
- Non-obvious domain rules (e.g., constraints on state transitions, data validation rules, edge cases in workflows)
- Terminology specific to the product that differs from generic software engineering (e.g., "session," "ephemeral state," "reconciliation," etc.)
- Gotchas: known complex interactions, performance gotchas, or integration points that are error-prone

## Immediate Next Steps
1. Initial PR should include a manifest (package.json, pyproject.toml, etc.) and core domain files
2. Review incoming PRs for domain logic that should be documented here
3. Update this file as the product shape solidifies

**Note**: Stack details, build instructions, file layout, and coding conventions belong in CLAUDE.md, not here.
