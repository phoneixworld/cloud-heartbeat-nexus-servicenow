# ServiceNow Implementation Checklist

## App setup

- [ ] Create scoped app x_rcm_nexus
- [ ] Create roles: x_rcm_nexus.admin, x_rcm_nexus.agent, x_rcm_nexus.ai_ops
- [ ] Configure source control and deployment process

## Data model

- [ ] Create tables from data-model/supabase-to-servicenow-table-map.md
- [ ] Add reference fields and indexes
- [ ] Define data policies and dictionary constraints

## Integrations

- [ ] Create system properties for Supabase URL and service key
- [ ] Configure REST message or connection alias
- [ ] Add Script Includes from script-includes folder
- [ ] Test edge-function connectivity
- [ ] Implement Flow Designer actions from flow-designer specs

## Workspace UX

- [ ] Create workspace experience shell
- [ ] Build claims and denials pages first
- [ ] Implement list/actions for scrubbing and RTA
- [ ] Add analytics widgets for AI ops and ROI

## Security and compliance

- [ ] ACL matrix for all custom tables
- [ ] Apply ACL matrix from security/ACL_MATRIX_CORE_MODULES.md
- [ ] Apply expanded ACL matrix from security/ACL_MATRIX_ALL_MODULES.md
- [ ] Configure roles/groups from security/ROLE_MODEL.md
- [ ] Apply sensitive field controls from security/FIELD_SECURITY_POLICY.md
- [ ] PHI field masking and encryption
- [ ] Audit trails for claim changes and AI actions

## Testing and release

- [ ] ATF smoke tests for create/update/transition workflows
- [ ] ATF security suite from security/ATF_SECURITY_TESTS.md
- [ ] Integration tests for AI actions and retries
- [ ] Validate update-set template metadata before promotion
- [ ] Production go-live checklist and rollback plan

## Step 6 execution

- [ ] Execute STEP6_INSTANCE_EXECUTION_PLAYBOOK.md Wave 1 (foundation import)
- [ ] Execute Wave 2 (module rollout)
- [ ] Execute Wave 3 (security hardening)
- [ ] Execute Wave 4 (workspace enablement)
- [ ] Execute Wave 5 (ATF and release readiness)
