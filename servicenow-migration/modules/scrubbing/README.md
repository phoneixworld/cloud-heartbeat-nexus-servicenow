# Module 3: Scrubbing

This module ports useScrubRules, useScrubResults, resolve action, and single/bulk scrub execution.

## Scope

- Rule CRUD (active/inactive filtering)
- Scrub result retrieval by claim
- Resolve scrub result
- Run scrub for one claim and bulk claims

## Required tables

- x_rcm_nexus_scrub_rule
- x_rcm_nexus_scrub_result

## Required script include

- x_rcm_ScrubService

## Required Scripted REST resource

- scripted-rest/x_rcm_scrubbing_api.js

## API usage

- GET action=rules with include_inactive=true|false
- GET action=results with optional claim_sys_id
- GET action=stats
- POST action=run with claim_sys_id
- POST action=run_bulk with claim_sys_ids array
- POST action=resolve with result_sys_id and resolution_notes
