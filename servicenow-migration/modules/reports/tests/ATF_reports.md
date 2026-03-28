# ATF: Reports Module

## Test 1: Executive summary payload

- Seed claims and denials with known values
- Call GET action=executive_summary
- Assert claims total/cleanRate/collectionRate/denialRate values
- Assert denials total/totalAmount/open/overturnRate values

## Test 2: Aging summary buckets

- Seed open claims with days_in_ar in 0-30, 31-60, 61-90, 90+
- Call GET action=aging_summary
- Assert each bucket has expected count and outstanding_amount

## Test 3: Claims export dataset

- Call GET action=exports type=claims
- Assert row fields include claim_number, charges, paid, patient_resp, days_ar

## Test 4: Denials export dataset

- Call GET action=exports type=denials
- Assert row fields include denial_code, denial_reason, denial_category, group_code, denial_amount

## Test 5: Compliance snapshot

- Call GET action=compliance_snapshot
- Assert checks_passed=true and dates are present
