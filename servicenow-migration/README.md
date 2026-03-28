# ServiceNow Migration Starter Pack

This folder contains a practical migration baseline to move the current React + Supabase RCM application into a ServiceNow scoped app.

## What this gives you

- A migration blueprint with phased execution
- Data model mapping from Supabase tables to ServiceNow custom tables
- UI route-to-workspace/page mapping for Now Experience
- Script Include stubs for server-side integration and business logic
- One-by-one module packages for Claims, Denials, Scrubbing, and RTA
- A completion tracker and ordered execution runbook

## What this does not do automatically

- It does not auto-generate ServiceNow update set XML from this repository
- It does not instantly convert React components into UI Builder pages
- It does not migrate production data

## Recommended target architecture on ServiceNow

- Scoped app: x_rcm_nexus
- UI layer: Configurable Workspaces (Now Experience / UI Builder)
- Data layer: custom tables in x_rcm_nexus_* namespace
- Business layer: Script Includes + Business Rules + Flow Designer
- AI layer: IntegrationHub spokes to external AI services (or Now Assist where applicable)
- Security: ACLs, Data Policies, Audit fields, Encryption Contexts, ATF tests

## Suggested implementation sequence

1. Build core data tables (claims, patients, payers, denials).
2. Implement Script Includes for CRUD and orchestration.
3. Recreate highest-value pages first (Claims, Denials, Scrubbing, RTA).
4. Migrate AI function calls to IntegrationHub actions.
5. Add compliance/security controls and automated tests.

## Folder contents

- MIGRATION_BLUEPRINT.md
- STEP_BY_STEP_EXECUTION.md
- MIGRATION_STATUS.md
- data-model/supabase-to-servicenow-table-map.md
- ui-builder/route-to-workspace-map.md
- ui-builder/SRC_COMPONENT_MIGRATION_MATRIX.md
- ui-builder/PAGE_BY_PAGE_UI_BUILDER_SPEC.md
- ui-builder/UI_BUILDER_EXECUTION_TRACKER.md
- script-includes/x_rcm_SupabaseBridge.js
- script-includes/x_rcm_RcmService.js
- modules/core-claims/*
- modules/denials/*
- modules/scrubbing/*
- modules/rta/*
- modules/batches/*
- modules/payment-posting/*
- modules/analytics/*
- modules/workloads/*
- modules/reports/*
- modules/payer-contracts/*
- modules/charge-capture/*
- modules/patient-financial/*
- modules/revenue-intelligence/*
- modules/compliance/*
- modules/exception-triage/*
- modules/touchless-processing/*
- modules/self-healing/*
- modules/behavioral-biometrics/*
- modules/zero-trust/*
- modules/data-residency/*
- modules/integrations/*
- modules/anomaly-detection/*
- modules/revenue-forecast/*
- modules/workflow-optimization/*
- modules/ai-operations/*
- modules/ai-roi/*
- modules/notifications/*
- modules/patient-portal/*
- integration/edge-function-to-integrationhub-map.md
- update-set-templates/README.md
- update-set-templates/script-includes/sys_script_include_core.xml
- update-set-templates/scripted-rest/sys_ws_definition_core.xml
- update-set-templates/acls/sys_security_acl_core.xml
- flow-designer/FD_ACTION_SCRUB_CLAIM.md
- flow-designer/FD_ACTION_DENIAL_PREDICTION.md
- flow-designer/FD_ACTION_SUBMIT_RTA.md
- flow-designer/FD_FLOW_ORCHESTRATION_MAP.md
- security/ROLE_MODEL.md
- security/ACL_MATRIX_CORE_MODULES.md
- security/FIELD_SECURITY_POLICY.md
- security/ATF_SECURITY_TESTS.md
- decommission/DECOMMISSION_POLICY.md
- decommission/CUTOVER_CHECKLIST.md
- decommission/CUTOVER_DAY_BY_DAY_PLAN.md
- decommission/LEGACY_REMOVAL_MATRIX.md
- deployment/IMPORT_ORDER_MANIFEST.md
- deployment/GIT_CLONE_TO_SERVICENOW_WORKFLOW.md
- deployment/SN_BOOTSTRAP_MERGE_STEPS.md
- testing/ATF_ROLE_API_MATRIX.md

## Immediate next step in ServiceNow

Create the scoped app x_rcm_nexus in App Engine Studio, then copy the Script Include stubs from this folder and begin wiring the first CRUD API for claims.

Follow STEP_BY_STEP_EXECUTION.md in order and update MIGRATION_STATUS.md as each step is deployed in your instance.
