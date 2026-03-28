# ATF: RTA Module

## Test 1: Reject when no RTA config

- Use claim with payer that has no enabled config
- Call submit
- Assert response ok=false and explanatory message

## Test 2: Successful submission path

- Seed payer config enabled
- Call submit
- Assert transaction row is created
- Assert claim u_rta_status updated and u_rta_eligible=true

## Test 3: Audit entry created

- After submit, query x_rcm_nexus_claim_audit_log
- Assert one entry exists with action_category=rta_submission

## Test 4: API action routing

- Call GET action=config and assert response status 200
- Call GET action=transactions for seeded claim and assert list shape
- Call POST action=submit with claim_sys_id and verify claim + transaction updates
