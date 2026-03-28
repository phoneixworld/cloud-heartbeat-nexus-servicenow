# Module: Patient Portal

This module ports patient portal behavior into ServiceNow.

## Scope

- List active patients for portal selection
- Return patient dashboard payload with statements, payments, plans, and messages
- Compute patient-level totals (owed, paid, active plans)
- Send outbound portal messages to patients
- Mark inbound messages as read

## Required tables

- x_rcm_nexus_patient
- x_rcm_nexus_claim
- x_rcm_nexus_patient_payment
- x_rcm_nexus_payment_plan
- x_rcm_nexus_portal_message

## Required script include

- x_rcm_PatientPortalService

## Required Scripted REST resource

- scripted-rest/x_rcm_patient_portal_api.js

## API usage

- GET action=patients
- GET action=dashboard&patient_sys_id=<sys_id>
- POST action=send_message
- POST action=mark_message_read
