# Flow Designer Action Spec: RCM Scrub Claim

Action name: RCM Scrub Claim
Scope: x_rcm_nexus

## Inputs

- claim_sys_id (String, required)
- initiated_by (String, optional)

## Steps

1. Lookup claim record from x_rcm_nexus_claim
2. Build payload object with claim identifiers and key claim fields
3. Invoke IntegrationHub or REST step to scrub endpoint
4. Parse response violations array
5. Upsert x_rcm_nexus_scrub_result rows for each violation
6. Update claim scrub status and last scrub timestamp
7. Write audit entry to x_rcm_nexus_claim_audit_log

## Outputs

- ok (Boolean)
- violation_count (Integer)
- error_count (Integer)
- warning_count (Integer)

## Error handling

- On external call failure, create error audit log
- Set output ok=false and return error_message
- Raise event x_rcm_nexus.scrub.failed for notifications

## Retry policy

- 3 retries
- Exponential backoff: 30s, 2m, 10m
