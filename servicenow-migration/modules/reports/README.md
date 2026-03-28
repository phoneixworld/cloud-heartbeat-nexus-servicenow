# Module: Reports

This module ports reports and export behavior from the legacy application into ServiceNow.

## Scope

- Executive summary metrics for claims and denials
- A/R aging bucket summary and claim-level aging dataset
- Claims export dataset and denied claims export dataset
- Compliance dashboard snapshot metadata

## Required tables

- x_rcm_nexus_claim
- x_rcm_nexus_denial_workflow

## Required script include

- x_rcm_ReportService

## Required Scripted REST resource

- scripted-rest/x_rcm_reports_api.js

## API usage

- GET action=executive_summary
- GET action=aging_summary
- GET action=exports with type=claims|denials|aging
- GET action=compliance_snapshot
