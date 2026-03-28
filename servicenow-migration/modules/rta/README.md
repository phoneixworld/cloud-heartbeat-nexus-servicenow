# Module 4: Real-Time Adjudication (RTA)

This module ports useRTAConfig, useRTATransactions, and useSubmitRTA.

## Scope

- Fetch payer RTA configuration
- Fetch RTA transactions by claim
- Submit RTA, store transaction, update claim, write audit record

## Required tables

- x_rcm_nexus_payer_rta_config
- x_rcm_nexus_rta_txn
- x_rcm_nexus_claim
- x_rcm_nexus_claim_audit_log

## Required script include

- x_rcm_RtaService

## Required Scripted REST resource

- scripted-rest/x_rcm_rta_api.js

## API usage

- GET action=config to fetch payer setup
- GET action=transactions with optional claim_sys_id
- POST action=submit with claim_sys_id
