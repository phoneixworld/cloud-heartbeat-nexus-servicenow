# Module 2: Denials

This module ports useDenialWorkflows and useDenialStats behavior.

## Scope

- Denial workflow list with status/category filters
- Update appeal status and notes
- Aggregate denial statistics by category and group code

## Required table

- x_rcm_nexus_denial_workflow

## Required script include

- x_rcm_DenialService

## Required Scripted REST resource

- scripted-rest/x_rcm_denials_api.js

## API usage

- GET with action=list and optional status/category filters
- GET with action=stats for aggregate metrics
- PATCH or PUT on /{sys_id} to update appeal fields
