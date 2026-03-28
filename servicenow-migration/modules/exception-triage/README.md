# Module: Exception Triage

This module ports AI-style exception triage behavior from the legacy application into ServiceNow.

## Scope

- Build prioritized triage queue from in-flight and denied claims
- Compute priority score and reason factors per claim
- Return recommended operational action per triaged claim
- Provide summary counters for critical/high/medium and revenue-at-risk

## Required tables

- x_rcm_nexus_claim
- x_rcm_nexus_patient
- x_rcm_nexus_payer

## Required script include

- x_rcm_ExceptionTriageService

## Required Scripted REST resource

- scripted-rest/x_rcm_exception_triage_api.js

## API usage

- GET action=triage
- GET action=summary
