# Module: Compliance

This module ports compliance monitoring behavior from the legacy application into ServiceNow.

## Scope

- List recent compliance checks
- Run compliance scan across claims and system controls
- Compute compliance dashboard counters and score
- Track check taxonomy for HIPAA, GDPR, coding, and billing

## Required tables

- x_rcm_nexus_compliance_check
- x_rcm_nexus_claim

## Required script include

- x_rcm_ComplianceService

## Required Scripted REST resource

- scripted-rest/x_rcm_compliance_api.js

## API usage

- GET action=checks
- GET action=summary
- POST action=run_scan
