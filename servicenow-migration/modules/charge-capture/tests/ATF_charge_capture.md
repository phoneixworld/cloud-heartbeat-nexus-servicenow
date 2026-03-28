# ATF: Charge Capture Module

## Test 1: Encounter list and search

- Seed encounters with patient names/MRNs
- Call GET action=encounters with search filter
- Assert only matching encounters are returned

## Test 2: Create encounter

- Call POST action=create_encounter with required fields
- Assert encounter row is inserted with status=active

## Test 3: Bill encounter success

- Seed active encounter and active payer fallback
- Call POST action=bill_encounter with encounter_sys_id
- Assert claim row is created and encounter status becomes billed

## Test 4: Bill encounter idempotency

- Call bill_encounter for encounter already billed
- Assert response ok=false with explanatory message

## Test 5: Summary counters

- Seed mixed encounter statuses and total charges
- Call GET action=summary
- Assert total_encounters, active_encounters, billed_encounters, total_charges values
