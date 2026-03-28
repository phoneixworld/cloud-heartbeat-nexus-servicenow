# Core Claims Table Dictionary

## x_rcm_nexus_claim

| Field | Type | Required | Notes |
|---|---|---|---|
| u_claim_number | String(50) | Yes | Unique claim identifier |
| u_status | Choice | Yes | draft, submitted, denied, paid, partial_paid, appealed, void |
| u_patient | Reference x_rcm_nexus_patient | Yes | Claim patient |
| u_payer | Reference x_rcm_nexus_payer | Yes | Claim payer |
| u_provider | Reference sys_user or custom provider table | No | Rendering/billing provider |
| u_service_date | Date | Yes | DOS |
| u_total_charge_amount | Decimal(20,2) | Yes | Charged amount |
| u_total_paid_amount | Decimal(20,2) | No | Paid amount |
| u_days_in_ar | Integer | No | Days in AR |
| u_patient_responsibility | Decimal(20,2) | No | Copay + coinsurance + deductible |
| u_rta_status | Choice | No | pending, approved, pended, failed |
| u_rta_eligible | Boolean | No | Eligibility for RTA |

Indexes:

- unique index on u_claim_number
- index on u_status
- index on u_payer
- index on sys_created_on

## x_rcm_nexus_claim_line_item

| Field | Type | Required | Notes |
|---|---|---|---|
| u_claim | Reference x_rcm_nexus_claim | Yes | Parent claim |
| u_cpt_code | String(20) | Yes | Procedure code |
| u_icd10_code | String(20) | No | Diagnosis code |
| u_units | Integer | Yes | Units |
| u_charge_amount | Decimal(20,2) | Yes | Charge amount |
| u_allowed_amount | Decimal(20,2) | No | Allowed amount |
| u_modifier | String(10) | No | CPT modifier |
