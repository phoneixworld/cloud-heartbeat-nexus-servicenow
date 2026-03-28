# ATF: Exception Triage Module

## Test 1: Triage queue ordering

- Seed claims with varying score factors
- Call GET action=triage
- Assert rows are sorted by priority_score descending

## Test 2: Priority scoring factors

- Seed high-dollar denied claim with high A/R and high AI risk
- Assert priority_score reflects combined factors and is capped at 100

## Test 3: Timely filing urgency

- Seed claim with timely filing deadline < 7 days
- Assert reason includes filing urgency and recommended action is urgent

## Test 4: Summary counters

- Seed triage claims spanning critical/high/medium ranges
- Call GET action=summary
- Assert totals and revenue_at_risk values

## Test 5: Action routing

- Call GET with invalid action
- Assert 400 response
