# Module: Payer Contracts

This module ports payer contract and fee schedule management behavior from the legacy application into ServiceNow.

## Scope

- List payer contracts with optional search by contract or payer name
- Create payer contracts with contract type, effective date, and timely filing days
- List fee schedules by selected contract
- Provide summary counters for contracts, active contracts, payer count, and fee schedule count

## Required tables

- x_rcm_nexus_payer_contract
- x_rcm_nexus_fee_schedule
- x_rcm_nexus_payer

## Required script include

- x_rcm_PayerContractService

## Required Scripted REST resource

- scripted-rest/x_rcm_payer_contracts_api.js

## API usage

- GET action=contracts with optional search
- GET action=fee_schedules with contract_sys_id
- GET action=summary with optional selected_contract_sys_id
- POST action=create_contract
