# ATF: Analytics Module

## Test 1: Overview payload

- Seed claims with mixed statuses and amounts
- Call GET action=overview
- Assert totalClaims, pendingAmount, avgDaysAR, collectionRate are present
- Assert statusData contains seeded statuses

## Test 2: Denials payload

- Seed denial workflows with categories/group codes
- Call GET action=denials
- Assert totalAmount and open values
- Assert categoryData and groupCodeData are populated

## Test 3: Benchmark payload

- Call GET action=benchmark
- Assert 4 metric rows are returned
- Assert each row has metric, yours, benchmark, unit, lowerBetter

## Test 4: Simulator payload

- Call GET action=simulator
- Assert denialReductionRecovery, arReductionCashFlow, cleanClaimSavings are numeric

## Test 5: Invalid action handling

- Call GET with action=unknown
- Assert 400 response with message
