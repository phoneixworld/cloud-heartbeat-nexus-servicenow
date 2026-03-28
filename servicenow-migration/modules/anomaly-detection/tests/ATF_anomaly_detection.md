# ATF: Anomaly Detection Module

## Test 1: Run scan action

- Call POST action=run_scan with scan_type=full
- Assert bridge invocation to ai-anomaly-detection and response status

## Test 2: Last report retrieval

- Seed anomaly result row
- Call GET action=last_report
- Assert latest report fields and 200 status

## Test 3: Missing report case

- Ensure no anomaly result rows
- Call GET action=last_report
- Assert 404 with message

## Test 4: Invalid action handling

- Call invalid GET/POST actions
- Assert 400 response
