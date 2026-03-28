# ATF: Denials Module

## Test 1: Filter queue by appeal status

- Seed rows with mixed statuses
- Query list with status filter
- Assert only matching rows returned

## Test 2: Update workflow

- Update appeal_status to appeal_submitted
- Assert row updated and persisted

## Test 3: Stats aggregation

- Seed known categories, groups, and amounts
- Assert totalAmount and byCat/byGroup values match expected

## Test 4: API update workflow endpoint

- Call PATCH/PUT endpoint with a known sys_id
- Assert response status is 200 and row reflects appeal status updates
