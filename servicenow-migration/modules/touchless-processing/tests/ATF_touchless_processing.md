# ATF: Touchless Processing Module

## Test 1: Metrics aggregation

- Seed runs with touchless/manual/failed statuses
- Call GET action=metrics
- Assert total_runs, touchless_runs, manual_review_runs, failed_runs, stp_rate

## Test 2: Stage breakdown

- Seed runs across multiple pipeline stages
- Call GET action=stage_breakdown
- Assert each stage row has total/touchless/rate

## Test 3: Processing breakdown

- Call GET action=processing_breakdown
- Assert dataset includes Touchless, Manual Review, Failed values

## Test 4: Recent runs feed

- Seed latest runs
- Call GET action=recent_runs
- Assert newest rows returned first

## Test 5: Manual claims feed

- Seed claims with scrubbing or scrub failure states
- Call GET action=manual_claims
- Assert only manual-attention claims are returned
