# Field Security Policy (Core PHI and Sensitive Fields)

## Claims (x_rcm_nexus_claim)

Sensitive fields:
- u_patient
- u_total_charge_amount
- u_total_paid_amount
- u_patient_responsibility

Policy:
- audit role: read-only
- agent role: read/update based on assignment scope
- ai_ops role: read-only unless explicitly granted for approved workflows

## Denials (x_rcm_nexus_denial_workflow)

Sensitive fields:
- u_appeal_letter
- u_denial_amount
- u_work_notes

Policy:
- appeal content writable by assigned agent/supervisor/admin
- audit role read-only

## Scrubbing (x_rcm_nexus_scrub_result)

Sensitive fields:
- u_resolution_notes
- any payload field containing diagnosis/procedure details

Policy:
- resolution fields writable by assigned operational roles
- audit and ai_ops read-only by default

## RTA (x_rcm_nexus_rta_txn)

Sensitive fields:
- u_patient_responsibility
- u_plan_pays
- any response payload details

Policy:
- write only via service/API execution paths
- direct UI update should be restricted to admin

## Logging and masking

- never log full PHI payloads in gs.info/gs.error
- mask or hash patient identifiers in integration logs
- retain only minimum required fields in ai_usage_log
