# ATF: Patient Portal Module

## Test 1: Patient list endpoint

- Seed active and inactive patient records
- Call GET action=patients
- Assert only active patients are returned ordered by last name

## Test 2: Patient dashboard endpoint

- Seed claims, payments, plans, and messages for a patient
- Call GET action=dashboard with patient_sys_id
- Assert dashboard includes patient, claims, payments, plans, messages, and totals

## Test 3: Send message action

- Call POST action=send_message with patient_sys_id, subject, and message
- Assert portal message row created with outbound direction and sent status

## Test 4: Mark message read action

- Seed inbound unread message
- Call POST action=mark_message_read
- Assert status=read and read_at populated

## Test 5: Validation and invalid action handling

- Call dashboard without patient_sys_id and expect 422
- Call invalid GET/POST actions and expect 400
