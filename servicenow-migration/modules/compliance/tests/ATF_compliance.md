# ATF: Compliance Module

## Test 1: Run scan inserts checks

- Seed claims including missing diagnosis and zero charge edge cases
- Call POST action=run_scan
- Assert check_count > 0 and compliance check rows are inserted

## Test 2: Checks listing

- Call GET action=checks with limit
- Assert rows are returned ordered by checked_at descending

## Test 3: Summary counters

- Seed checks with passed, failed, warning statuses
- Call GET action=summary
- Assert compliance_score, total_checks, passed, failed, warnings

## Test 4: Severity and type coverage

- Run scan and assert presence of hipaa/gdpr/coding_standard/billing_compliance check types
- Assert severity values include low/medium/high/critical

## Test 5: Remediation population

- Assert failed and warning checks include remediation text
