# ATF: Payment Posting Module

## Test 1: Post payment success

- Seed unpaid claim with charge amount and zero paid amount
- Call POST action=post_payment with valid amount and method
- Assert payment row is created
- Assert claim total paid amount increased

## Test 2: Claim status rollup after payment

- Seed claim with charge amount 100 and paid amount 60
- Post payment amount 40
- Assert claim status is paid

## Test 3: Invalid payment amount

- Call post payment with amount <= 0
- Assert response ok=false and 422 status

## Test 4: Unpaid claims list

- Seed mixed claim statuses
- Call GET action=unpaid_claims
- Assert only submitted/acknowledged/pending/partial_paid statuses returned

## Test 5: Summary metrics

- Seed payments including current-day records
- Call GET action=summary
- Assert total_posted, today_total, payment_count, unpaid_claim_count values
