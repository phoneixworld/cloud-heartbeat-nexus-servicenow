# ATF: Batches Module

## Test 1: List endpoint

- Seed batch records with mixed status values
- Call GET action=list
- Assert rows are returned ordered by created date descending

## Test 2: Summary endpoint

- Seed known claim_count and total_charges values
- Call GET action=summary
- Assert total_batches, total_claims, total_charges, accepted, pending values

## Test 3: Create batch success

- Seed eligible claims with statuses not in paid/void/denied
- Call POST action=create_batch with claim_sys_ids
- Assert batch row created with correct claim_count and total_charges
- Assert batch item rows are created with line numbers

## Test 4: Create batch with no claims

- Call POST action=create_batch with empty claim_sys_ids
- Assert 422 response and ok=false

## Test 5: Exclude ineligible claims

- Seed claims including paid and denied statuses
- Create batch with all claim IDs
- Assert only eligible claims are included in batch items
