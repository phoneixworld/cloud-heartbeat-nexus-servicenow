# Flow Designer Action Spec: RCM Submit RTA

Action name: RCM Submit RTA
Scope: x_rcm_nexus

## Inputs

- claim_sys_id (String, required)
- force_resubmit (Boolean, optional default false)

## Steps

1. Load claim and payer RTA config
2. Validate payer supports RTA
3. Invoke RTA API/partner endpoint
4. Persist transaction in x_rcm_nexus_rta_txn
5. Update claim fields: u_rta_status, u_total_paid_amount, u_patient_responsibility, u_status
6. Write audit entry in x_rcm_nexus_claim_audit_log
7. Emit event for downstream notifications

## Outputs

- ok (Boolean)
- approved (Boolean)
- transaction_sys_id (String)
- response_time_ms (Integer)

## Error handling

- If payer unsupported, return ok=false with business message
- For technical failures, log and create retry task
- Keep claim status unchanged on technical failure

## Retry policy

- 2 retries for technical errors
- No retry for business-validation failures
