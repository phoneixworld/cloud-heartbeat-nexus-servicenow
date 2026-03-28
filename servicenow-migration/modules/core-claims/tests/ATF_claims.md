# ATF: Claims Module

## Test 1: Create claim with line items

- Open API endpoint for claims create
- Submit payload with 2 line items
- Assert claim is inserted in x_rcm_nexus_claim
- Assert 2 child rows in x_rcm_nexus_claim_line_item

## Test 2: Filter by status

- Seed 3 claims with statuses submitted, denied, paid
- Call list endpoint with status=denied
- Assert only denied row is returned

## Test 3: Stats endpoint

- Seed known values for charged and paid amounts
- Call action=stats endpoint
- Validate denialRate and collectionRate calculations

## Test 4: Status rollup rule

- Update paid amount to full charge
- Assert status transitions to paid
- Update paid amount to partial
- Assert status transitions to partial_paid
