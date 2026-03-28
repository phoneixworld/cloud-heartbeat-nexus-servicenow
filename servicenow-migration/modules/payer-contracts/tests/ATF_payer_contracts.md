# ATF: Payer Contracts Module

## Test 1: Contracts list with search

- Seed contracts across multiple payers
- Call GET action=contracts with search text
- Assert only matching contract/payer rows are returned

## Test 2: Create contract success

- Call POST action=create_contract with required fields
- Assert contract row is created and active by default

## Test 3: Missing required fields

- Call POST action=create_contract without payer_sys_id
- Assert 422 response and ok=false

## Test 4: Fee schedule list

- Seed fee schedule rows for a selected contract
- Call GET action=fee_schedules with contract_sys_id
- Assert rows are ordered by procedure_code

## Test 5: Summary counters

- Seed active/inactive contracts and multiple payers
- Call GET action=summary with selected_contract_sys_id
- Assert total_contracts, active_contracts, total_payers, fee_schedule_count values
