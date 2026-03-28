# Module 1: Core Claims

This module ports behavior from useClaims and useClaimStats into ServiceNow.

## Scope

- Claim list retrieval with filters: status, payer, search text
- Claim creation with optional line items
- Claim KPI calculations

## Inputs from current app

- claim_status
- payer_id
- search text against claim number, patient name, payer name

## Outputs expected by workspace

- claims list with patient/payer/provider references
- stats object: total, denied, cleanRate, avgDaysAR, collectionRate, denialRate, pendingAmount, pendingCount

## Required ServiceNow components

- Table: x_rcm_nexus_claim
- Table: x_rcm_nexus_claim_line_item
- Script Include: x_rcm_ClaimsService
- Scripted REST API: x_rcm_nexus/claims
- Business Rule for derived status fields and metrics cache (optional)
