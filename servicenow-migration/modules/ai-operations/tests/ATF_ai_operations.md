# ATF: AI Operations Module

## Test 1: Overview endpoint

- Seed ai_usage_log rows across multiple capabilities
- Call GET action=overview
- Assert totalCalls, overallSuccessRate, avgLatency, totalCost, and capability metrics

## Test 2: Feedback endpoint

- Seed ai_feedback rows with positive/negative ratings and prediction correctness
- Call GET action=feedback
- Assert totalFeedback, positiveRate, accuracyRate, and byCapability counts

## Test 3: Dashboard endpoint

- Call GET action=dashboard
- Assert response includes both overview and feedback payloads

## Test 4: Error feed behavior

- Seed error log rows with error message values
- Call GET action=overview
- Assert recentErrors returns max 10 entries ordered by newest

## Test 5: Invalid action handling

- Call invalid GET action
- Assert 400 response
