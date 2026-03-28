# Module: Payment Posting

This module ports payment posting behavior from the legacy application into ServiceNow.

## Scope

- List posted payments with patient/claim references
- List unpaid claims eligible for payment posting
- Post payment and roll up paid amount to claim
- Compute dashboard metrics: total posted, today total, payment count, unpaid claim count

## Required tables

- x_rcm_nexus_patient_payment
- x_rcm_nexus_claim
- x_rcm_nexus_patient

## Required script include

- x_rcm_PaymentPostingService

## Required Scripted REST resource

- scripted-rest/x_rcm_payment_posting_api.js

## API usage

- GET action=payments with optional search
- GET action=unpaid_claims
- GET action=summary
- POST action=post_payment with claim_sys_id, patient_sys_id, amount, payment_method, notes
