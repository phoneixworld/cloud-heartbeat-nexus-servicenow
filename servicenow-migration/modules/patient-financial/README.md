# Module: Patient Financial

This module ports patient financial engagement behavior from the legacy application into ServiceNow.

## Scope

- List payment plans, credit balances, and recent patient payments
- Create payment plans with computed next payment date and remaining balance
- Provide financial dashboard counters for active plans, outstanding, collected, and credit balances
- Provide AI payment intelligence invocation mapping for patient-level analysis

## Required tables

- x_rcm_nexus_payment_plan
- x_rcm_nexus_credit_balance
- x_rcm_nexus_patient_payment
- x_rcm_nexus_patient
- x_rcm_nexus_claim

## Required script include

- x_rcm_PatientFinancialService

## Required Scripted REST resource

- scripted-rest/x_rcm_patient_financial_api.js

## API usage

- GET action=plans
- GET action=credits
- GET action=payments
- GET action=summary
- POST action=create_plan
- POST action=payment_intelligence (integration mapping call)
