# ATF: Scrubbing Module

## Test 1: Rules list with includeInactive=false

- Seed active and inactive rules
- Call listRules(false)
- Assert only active rules returned

## Test 2: Resolve scrub result

- Seed unresolved scrub result
- Call resolveResult with notes
- Assert resolved=true and resolution fields are set

## Test 3: Bulk scrub invocation

- Send 3 claim IDs to runBulkScrub
- Assert response contains 3 result objects and no unhandled exceptions

## Test 4: API action routing

- Invoke GET action=rules/results/stats and verify status=200
- Invoke POST action=run, action=run_bulk, action=resolve with valid payloads
- Assert each action returns expected shape and status code
