# ATF: Revenue Forecast Module

## Test 1: Generate forecast action

- Call POST action=generate
- Assert bridge invocation to ai-revenue-forecast and success response

## Test 2: Last forecast retrieval

- Seed revenue forecast row
- Call GET action=last_forecast
- Assert expected_30_day_revenue, expected_90_day_revenue, overall_health

## Test 3: Missing forecast case

- Ensure no forecast rows
- Call GET action=last_forecast
- Assert 404 with message

## Test 4: Invalid action handling

- Call invalid GET/POST actions
- Assert 400 response
