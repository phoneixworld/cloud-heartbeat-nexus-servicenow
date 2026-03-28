# Module: Batches

This module ports batch submission behavior from the legacy application into ServiceNow.

## Scope

- List batch submissions with status, type, and charge totals
- Create new batch submissions from selected claim IDs
- Create batch claim item rows linked to each batch
- Provide summary counters: total batches, claims, charges, accepted, pending

## Required tables

- x_rcm_nexus_batch
- x_rcm_nexus_batch_claim_item
- x_rcm_nexus_claim

## Required script include

- x_rcm_BatchService

## Required Scripted REST resource

- scripted-rest/x_rcm_batches_api.js

## API usage

- GET action=list
- GET action=summary
- POST action=create_batch with batch_type, optional clearinghouse, and claim_sys_ids
