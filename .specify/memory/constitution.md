<!--
Sync Impact Report
Version change: [unknown] → 3.0.0
Modified principles: removed all except Simplicity, Static Delivery
Added sections: None
Removed sections: Testing, Integration, Observability, Versioning, Additional Constraints, Development Workflow
Templates requiring updates:
✅ plan-template.md (no test/deploy gates)
✅ spec-template.md (testing now optional)
✅ tasks-template.md (test tasks optional, not required)
⚠ commands/*.md (none found)
Follow-up TODOs: TODO(RATIFICATION_DATE): original adoption date unknown
-->

# Static Web App Constitution

## Core Principles

### I. Simplicity
All code and assets MUST be as simple as possible. No unnecessary abstractions,
tools, or frameworks. Only use plain HTML, CSS, and JavaScript. Rationale:
Simplicity ensures maintainability and ease of understanding for all contributors.

### II. Static Delivery
The application MUST be delivered as static files over HTTP. No backend, no build
steps, no deployment automation. Rationale: Static delivery maximizes reliability
and minimizes operational complexity.

## Governance
Amendments to this constitution require direct edit and clear documentation of
changes. Versioning follows semantic rules: MAJOR for principle removals or
redefinitions, MINOR for new principles, PATCH for clarifications. Compliance
review is by manual inspection.

**Version**: 3.0.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption date unknown | **Last Amended**: 2025-10-07