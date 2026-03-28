# Cutover Checklist (Go/No-Go)

## Go-live readiness

- [ ] All Step 1-5 modules implemented in ServiceNow instance
- [ ] Remaining module specs implemented or explicitly deferred with sign-off
- [ ] ATF core suite passed
- [ ] IntegrationHub action health checks passed
- [ ] Access controls validated with role-based test users

## Production cutover

- [ ] Legacy app switched to read-only mode
- [ ] ServiceNow workspace set as primary entry point
- [ ] User communications sent with support channel details
- [ ] Hypercare team staffed for first 2 weeks

## Post-cutover verification

- [ ] Daily KPI reconciliation for first 14 days
- [ ] Error/incident trend is stable
- [ ] No critical dependency on legacy runtime detected

## Legacy removal

- [ ] Export and archive legacy repository snapshot
- [ ] Export and archive Supabase schema + critical data extracts
- [ ] Revoke legacy API keys and secrets
- [ ] Disable/decommission legacy hosting
- [ ] Update runbooks and architecture docs to ServiceNow-only state
