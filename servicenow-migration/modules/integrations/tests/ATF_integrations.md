# ATF: Integrations Module

## Test 1: Seed integrations

- Ensure integration config table empty
- Call POST action=seed_integrations
- Assert default integration rows are inserted

## Test 2: Config list endpoint

- Call GET action=configs
- Assert rows ordered by integration_type with expected fields

## Test 3: Summary endpoint

- Call GET action=summary
- Assert total_integrations, active_integrations, total_records_synced, by_type

## Test 4: Idempotent seed behavior

- Call POST action=seed_integrations again
- Assert seeded=0 and no duplicate rows

## Test 5: Invalid action handling

- Call invalid actions for GET/POST
- Assert 400 response
