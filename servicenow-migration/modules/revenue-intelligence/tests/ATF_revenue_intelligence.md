# ATF: Revenue Intelligence Module

## Test 1: Metrics endpoint

- Seed claims and denials with known values
- Call GET action=metrics
- Assert totals, rates, and counts are correct

## Test 2: Denial categories endpoint

- Seed denials with multiple categories and amounts
- Call GET action=denial_categories
- Assert grouped amount totals by category

## Test 3: Payer yield endpoint

- Seed claims across multiple payers
- Call GET action=payer_yield
- Assert charged/collected/yield values for each payer

## Test 4: Monthly trend endpoint

- Seed claims across more than 6 months
- Call GET action=monthly_trend
- Assert only most recent 6 months are returned in order

## Test 5: Simulation endpoint

- Call GET action=simulate with monthly_charges, denial_rate, collection_rate
- Assert projected_revenue and revenue_leakage values
- Call with negative values and assert 422
