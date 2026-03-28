# Step 6 Instance Execution Playbook

This playbook is for executing migration artifacts inside a real ServiceNow instance.

## Objective

Deploy all prepared module artifacts into x_rcm_nexus, validate security and integrations, and reach production-ready state.

Git-first execution model:

- deployment/GIT_CLONE_TO_SERVICENOW_WORKFLOW.md

## Wave 1: Foundation import

1. Create scoped app x_rcm_nexus in App Engine Studio.
2. Create base tables from data-model mapping.
3. Import core Script Includes and Scripted REST APIs.
4. Configure system properties:
   - x_rcm_nexus.supabase_url
   - x_rcm_nexus.supabase_service_key
5. Smoke test x_rcm_claims_api, x_rcm_denials_api, x_rcm_scrubbing_api, x_rcm_rta_api.

Deployment sequencing reference:

- deployment/IMPORT_ORDER_MANIFEST.md

Exit criteria:
- Core APIs reachable and returning expected schema.

## Wave 2: Module rollout

1. Import remaining module Script Includes and APIs in batches:
   - Financial/operations: payment-posting, batches, workloads, reports, payer-contracts, charge-capture, patient-financial
   - Intelligence/automation: revenue-intelligence, compliance, exception-triage, touchless-processing, self-healing
   - Security/platform: behavioral-biometrics, zero-trust, data-residency, integrations
   - AI/engagement: anomaly-detection, revenue-forecast, workflow-optimization, ai-operations, ai-roi, notifications, patient-portal
2. Seed baseline config data where modules support seed actions.
3. Validate each module API action (list, summary, create/action endpoints).

Exit criteria:
- All module APIs deployed and passing smoke checks.

## Wave 3: Security hardening

1. Create role model from security/ROLE_MODEL.md.
2. Apply table and API ACLs from security/ACL_MATRIX_ALL_MODULES.md.
3. Apply field-level controls from security/FIELD_SECURITY_POLICY.md.
4. Verify integration role is API-only.

Exit criteria:
- Role-based access tests pass for admin, supervisor, agent, ai_ops, audit, integration.

## Wave 4: UX and workspace enablement

1. Build workspace pages from ui-builder/route-to-workspace-map.md.
2. Implement each page using ui-builder/PAGE_BY_PAGE_UI_BUILDER_SPEC.md.
3. Track delivery progress in ui-builder/UI_BUILDER_EXECUTION_TRACKER.md.
4. Connect page data resources to scripted APIs.
5. Add dashboard widgets for AI ops and AI ROI.
6. Validate navigation and role-based menu visibility.

Exit criteria:
- Business-critical user flows function in ServiceNow workspace.

## Wave 5: ATF and release readiness

1. Execute module ATF suites in modules/*/tests.
2. Execute security ATF from security/ATF_SECURITY_TESTS.md.
3. Execute role/action authorization matrix from testing/ATF_ROLE_API_MATRIX.md.
4. Resolve any P1/P2 defects and rerun failed tests.
5. Prepare and validate update sets for promotion.

Exit criteria:
- No critical test failures; release candidate approved.

## Gate to Step 7

You can start controlled legacy decommission only when:
- Step 6 waves are complete.
- Cutover checklist in decommission/CUTOVER_CHECKLIST.md is fully satisfied.
