# Import Order Manifest

Use this order to deploy artifacts in a new ServiceNow environment with minimal dependency errors.

## Wave 0: Environment and scope

1. Create scoped app x_rcm_nexus.
2. Create roles and baseline groups from security/ROLE_MODEL.md.
3. Set app properties:
   - x_rcm_nexus.supabase_url
   - x_rcm_nexus.supabase_service_key

## Wave 1: Data model and dictionary

1. Create core tables and references from data-model/supabase-to-servicenow-table-map.md.
2. Create indexes for claim number, MRN, payer, status, created_on.
3. Add dictionary constraints and required fields.

Gate:
- Table creation and references validate without dictionary errors.

## Wave 2: Shared infrastructure

1. Import script-includes/x_rcm_SupabaseBridge.js.
2. Import script-includes/x_rcm_RcmService.js.
3. Create/update shared connection aliases and credentials.

Gate:
- Bridge connectivity test to one non-production edge action passes.

## Wave 3: Core modules (dependency base)

1. modules/core-claims
2. modules/denials
3. modules/scrubbing
4. modules/rta

Gate:
- Core API smoke checks pass for all core actions.

## Wave 4: Operational modules

1. modules/payment-posting
2. modules/batches
3. modules/workloads
4. modules/reports
5. modules/payer-contracts
6. modules/charge-capture
7. modules/patient-financial

Gate:
- Financial and queue flows pass CRUD/action tests.

## Wave 5: Intelligence and automation modules

1. modules/revenue-intelligence
2. modules/compliance
3. modules/exception-triage
4. modules/touchless-processing
5. modules/self-healing

Gate:
- Metrics and automation actions return expected payload shapes.

## Wave 6: Security/platform modules

1. modules/behavioral-biometrics
2. modules/zero-trust
3. modules/data-residency
4. modules/integrations

Gate:
- Security dashboards and residency/integration seed actions pass.

## Wave 7: AI and engagement modules

1. modules/anomaly-detection
2. modules/revenue-forecast
3. modules/workflow-optimization
4. modules/ai-operations
5. modules/ai-roi
6. modules/notifications
7. modules/patient-portal

Gate:
- AI invocation path and portal engagement actions pass.

## Wave 8: Security controls and ACLs

1. Apply security/FIELD_SECURITY_POLICY.md.
2. Apply security/ACL_MATRIX_CORE_MODULES.md.
3. Apply security/ACL_MATRIX_ALL_MODULES.md.
4. Validate integration role is API-only.

Gate:
- Role-based access validation passes for admin/supervisor/agent/ai_ops/audit/integration.

## Wave 9: UX and runbook assets

1. Implement workspace page mapping from ui-builder/route-to-workspace-map.md.
2. Configure Flow Designer specs from flow-designer/.
3. Import update-set templates as needed from update-set-templates/.

Gate:
- Business-critical UI flows are executable in workspace.

## Wave 10: Testing and release

1. Run module ATF docs in modules/*/tests.
2. Run security ATF tests from security/ATF_SECURITY_TESTS.md.
3. Run role-action verification from testing/ATF_ROLE_API_MATRIX.md.
4. Freeze release candidate and promote.

Gate:
- No unresolved P1/P2 defects and all go-live checks satisfied.

## Rollback anchors

- Snapshot app state before Waves 3, 5, 7, and 8.
- Preserve prior update sets for one full release cycle.
