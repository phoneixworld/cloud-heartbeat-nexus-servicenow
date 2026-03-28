# ATF: Behavioral Biometrics Module

## Test 1: Session events feed

- Seed session event rows
- Call GET action=session_events
- Assert rows sorted by created date descending

## Test 2: Metrics endpoint

- Seed session and audit rows with PHI flags
- Call GET action=metrics
- Assert total_sessions, anomalies, unique_users, phi_accesses, avg_risk_score

## Test 3: Risk trend endpoint

- Seed audit activity across multiple hourly buckets
- Call GET action=risk_trend
- Assert total/risky series and max 12 buckets

## Test 4: IP analysis endpoint

- Seed audit rows with repeated IP addresses
- Call GET action=ip_analysis
- Assert top IP counts in descending order

## Test 5: Recent audit endpoint

- Call GET action=recent_audit
- Assert recent rows include action and phi_accessed fields
