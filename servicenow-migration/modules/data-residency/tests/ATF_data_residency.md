# ATF: Data Residency Module

## Test 1: Seed regions

- Ensure residency table empty
- Call POST action=seed_regions
- Assert default region set inserted

## Test 2: Region list and summary

- Call GET action=regions and GET action=summary
- Assert counts and primary_region_code

## Test 3: Data flow rules endpoint

- Call GET action=data_flow_rules
- Assert expected rule/status pairs

## Test 4: Idempotent seed behavior

- Call POST action=seed_regions again
- Assert seeded=0 and no duplicate rows created

## Test 5: Invalid action handling

- Call invalid GET/POST actions
- Assert 400 response
