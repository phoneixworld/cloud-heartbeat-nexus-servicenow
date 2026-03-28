# Legacy Removal Matrix

Use this matrix only after cutover gates are complete.

| Legacy area | Remove now? | Condition to remove | Retain copy? |
|---|---|---|---|
| src/pages/* | Yes (post-cutover) | Equivalent ServiceNow pages live and stable | Yes, archive tag/release |
| src/hooks/* Supabase hooks | Yes (post-cutover) | ServiceNow APIs + Flow actions replacing behavior | Yes |
| src/integrations/supabase/* | Yes (post-cutover) | No production traffic to Supabase | Yes |
| supabase/functions/* | Usually yes | IntegrationHub actions replacing each function | Yes, for audit/history |
| supabase/migrations/* | Usually yes | Data migration complete and reconciled | Yes, mandatory archive |
| package.json frontend deps | Yes (post-cutover) | Legacy frontend no longer deployed | Optional archive |
| README legacy run commands | Yes | New ServiceNow runbook published | Keep migration notes |

## Recommended archive strategy

- Create git tag: pre-servicenow-decommission
- Export a full zip artifact of legacy source
- Store schema and data extracts in controlled retention storage

## Security cleanup

- Revoke Supabase service keys
- Delete unused CI secrets for legacy deployment
- Remove legacy callback URLs and webhooks
