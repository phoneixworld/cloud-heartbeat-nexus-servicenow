# ATF: AI ROI Module

## Test 1: Metrics endpoint

- Seed claims, denials, and prediction rows
- Call GET action=metrics
- Assert roiCapabilities, totals, and annualProjection fields

## Test 2: Snapshot action

- Call POST action=snapshot
- Assert x_rcm_nexus_ai_roi_snapshot row is created with totals and raw payload

## Test 3: Latest snapshot endpoint

- Ensure at least one snapshot exists
- Call GET action=latest_snapshot
- Assert latest snapshot totals and created_at are returned

## Test 4: Missing snapshot case

- Ensure snapshot table empty
- Call GET action=latest_snapshot
- Assert 404 with message

## Test 5: Invalid action handling

- Call invalid GET/POST actions
- Assert 400 response
