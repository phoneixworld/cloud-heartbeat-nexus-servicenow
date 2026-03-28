# Decommission Policy: Remove Non-ServiceNow Runtime

Yes, non-ServiceNow application code can be removed, but only after migration completion gates are passed.

## Mandatory gates before removal

1. Functional parity gate
- All business-critical routes are implemented in ServiceNow workspace.
- Claims, Denials, Scrubbing, RTA, and payment-related flows are live and tested.

2. Data parity gate
- Historical and active records required for operations are available in ServiceNow.
- Reconciliation checks pass for counts, totals, and status distributions.

3. Security/compliance gate
- ACL matrix approved.
- PHI handling validated (masking, encryption, audit).

4. Reliability gate
- ATF and integration smoke tests are green.
- Monitoring and alerting are active.

5. Rollback gate
- A rollback path exists for at least one release cycle.
- Backup/export of legacy code and schema is retained.

## Decommission phases

Phase A: Freeze legacy writes
- Make React/Supabase legacy app read-only.
- Route new operational work to ServiceNow only.

Phase B: Shadow period
- Keep legacy UI available for reference only.
- Compare outputs weekly against ServiceNow reports.

Phase C: Cutover complete
- Update DNS/entry links to ServiceNow exclusively.
- Disable legacy user access except admins.

Phase D: Remove legacy runtime
- Archive source code and migration artifacts.
- Remove legacy deployments and secrets.
- Retain compliance-required backups for retention duration.

## Hard stop conditions

Do not delete legacy runtime if:
- Any critical workflow still depends on Supabase functions.
- Any compliance audit requirement depends on legacy logs not yet exported.
- Any unresolved P1/P2 defects exist in ServiceNow replacement flows.
