# ATF: Patient Financial Module

## Test 1: Payment plan list

- Seed payment plans with active and completed statuses
- Call GET action=plans
- Assert rows and status values are returned

## Test 2: Create payment plan

- Call POST action=create_plan with required fields
- Assert remaining_balance equals total_balance
- Assert next_payment_date is set ~30 days out

## Test 3: Credits and payments feeds

- Seed credit balances and patient payments
- Call GET action=credits and GET action=payments
- Assert rows are sorted by identified/payment date descending

## Test 4: Summary counters

- Seed active plans, identified credits, and payments
- Call GET action=summary
- Assert active_plans, total_outstanding, total_collected, total_credit_balances

## Test 5: Payment intelligence invocation

- Call POST action=payment_intelligence with patient_sys_id
- Assert bridge invocation response shape { ok, status, body }
