# Module: Charge Capture

This module ports encounter-based charge capture and claim generation behavior from the legacy application into ServiceNow.

## Scope

- List recent encounters with patient/provider context
- Create new encounters
- Generate claim from encounter and update encounter status to billed
- Provide encounter summary metrics for total, active, billed, and total charges

## Required tables

- x_rcm_nexus_encounter
- x_rcm_nexus_claim
- x_rcm_nexus_patient
- x_rcm_nexus_provider
- x_rcm_nexus_payer

## Required script include

- x_rcm_ChargeCaptureService

## Required Scripted REST resource

- scripted-rest/x_rcm_charge_capture_api.js

## API usage

- GET action=encounters with optional search
- GET action=summary with optional search
- POST action=create_encounter
- POST action=bill_encounter with encounter_sys_id
