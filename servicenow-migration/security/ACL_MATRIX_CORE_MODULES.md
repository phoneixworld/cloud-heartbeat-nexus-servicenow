# ACL Matrix: Claims, Denials, Scrubbing, RTA

Use this as the baseline ACL policy for core modules.

For full module coverage, use ACL_MATRIX_ALL_MODULES.md as the Step 6 hardening source of truth.

Legend:
- C = create
- R = read
- U = update
- D = delete
- E = execute (Scripted REST/action)

## Table-level ACL matrix

| Table | admin | supervisor | agent | ai_ops | audit | integration |
|---|---|---|---|---|---|---|
| x_rcm_nexus_claim | CRUD | CRU | CRU (assigned/team scope) | R | R | CRU (integration scope) |
| x_rcm_nexus_claim_line_item | CRUD | CRU | CRU (assigned/team scope) | R | R | CRU (integration scope) |
| x_rcm_nexus_denial_workflow | CRUD | CRU | CRU (assigned/team scope) | R | R | CRU (integration scope) |
| x_rcm_nexus_scrub_rule | CRUD | CRU | R | CRU | R | R |
| x_rcm_nexus_scrub_result | CRUD | CRU | CRU | CRU | R | CRU (integration scope) |
| x_rcm_nexus_payer_rta_config | CRUD | CRU | R | R | R | R |
| x_rcm_nexus_rta_txn | CRUD | CRU | R | R | R | CRU (integration scope) |
| x_rcm_nexus_claim_audit_log | CRUD | R | R | R | R | C |
| x_rcm_nexus_ai_usage_log | CRUD | R | R | CRU | R | C |

## Scripted REST execute ACLs

| API resource | admin | supervisor | agent | ai_ops | audit | integration |
|---|---|---|---|---|---|---|
| x_rcm_claims_api | E | E | E | R-only usage | E (read actions only) | E |
| x_rcm_denials_api | E | E | E | R-only usage | E (read actions only) | E |
| x_rcm_scrubbing_api | E | E | E | E | E (read actions only) | E |
| x_rcm_rta_api | E | E | E | R-only usage | E (read actions only) | E |

## Record-level constraints

Apply scripted conditions for agent role:

- Claims/Denials update allowed only when:
  - current.u_owner == gs.getUserID(), or
  - current.u_assignment_group includes user's groups

Apply additional integration constraints:

- integration role allowed only through API endpoints
- interactive UI sessions for integration role should be blocked

## Delete policy

- Disable deletes for non-admin roles on all production PHI-sensitive tables
- Prefer soft delete/status transition to preserve audit trails
