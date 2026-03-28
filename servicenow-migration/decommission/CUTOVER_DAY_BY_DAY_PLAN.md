# Cutover Day-by-Day Plan

Use this plan for production switchover from legacy runtime to ServiceNow workspace.

## T-14 to T-10: Final readiness

1. Complete Wave 10 testing in STEP6_INSTANCE_EXECUTION_PLAYBOOK.md.
2. Reconcile KPI parity for claims, denials, collections, and aging.
3. Confirm role and ACL behavior for all operational personas.
4. Freeze scope to P1 fixes only.

Exit criteria:
- Release candidate approved and cutover date locked.

## T-9 to T-7: Operational rehearsal

1. Execute dry-run cutover in staging with production-like data volume.
2. Validate rollback playbook timing and owner responsibilities.
3. Validate monitoring/alerts and incident routing.
4. Publish support plan and escalation matrix.

Exit criteria:
- Dry run completes within target cutover window.

## T-6 to T-3: Communication and controls

1. Notify users of read-only window and go-live timing.
2. Enable change freeze on legacy feature deployments.
3. Pre-stage migration scripts, update sets, and validation scripts.
4. Confirm legal/compliance sign-off for decommission sequencing.

Exit criteria:
- Stakeholder go/no-go checkpoint is green.

## T-2 to T-1: Pre-cutover checks

1. Take full backup snapshots (code, data extracts, config).
2. Validate API credentials and integration endpoints.
3. Confirm on-call staffing for command center and hypercare.
4. Perform final KPI baseline capture from legacy system.

Exit criteria:
- All pre-cutover checks are complete with no blockers.

## Day 0: Cutover execution

1. Put legacy runtime into read-only mode.
2. Switch entry points to ServiceNow workspace.
3. Run immediate smoke tests:
   - Core claims/denials/scrubbing/RTA
   - Payment posting and reports
   - AI operations and notifications
4. Validate security controls and audit logging.
5. Open command-center bridge for live issue triage.

Success criteria:
- No Sev-1 defects and critical workflows operational.

## Day 1 to Day 3: Stabilization

1. Run hourly KPI comparisons against legacy baselines.
2. Track and triage defects by severity.
3. Apply controlled hotfixes for approved high-priority issues.
4. Confirm user access and queue throughput stability.

Exit criteria:
- KPI variance is within agreed tolerance and incident trend is stable.

## Day 4 to Day 7: Hypercare phase 2

1. Move from hourly to twice-daily reconciliation.
2. Review unresolved defects and close low-risk backlog.
3. Validate AI model invocation health and cost telemetry.
4. Confirm compliance logs and audit reports are complete.

Exit criteria:
- Operations and security stakeholders approve legacy decommission start.

## Day 8 to Day 14: Controlled legacy retirement

1. Disable legacy user access except emergency admins.
2. Archive legacy repository, schema, data extracts, and runbooks.
3. Revoke obsolete secrets, keys, and callbacks.
4. Remove legacy hosting resources after final verification.

Exit criteria:
- Decommission/CUTOVER_CHECKLIST.md is fully satisfied.

## Abort/rollback triggers

- Critical claims or payment workflows unavailable for more than 30 minutes.
- Security or PHI exposure event.
- Sustained KPI variance beyond approved thresholds.

If triggered:
1. Activate rollback plan immediately.
2. Restore prior entry point and data/process state.
3. Initiate incident review and corrective action before reattempt.
