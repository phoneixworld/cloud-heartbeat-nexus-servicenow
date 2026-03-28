# Module: Data Residency

This module ports global data residency and region policy behavior into ServiceNow.

## Scope

- List configured residency regions
- Seed baseline region/regulation configurations
- Return residency summary metrics
- Return cross-border data flow rule set

## Required tables

- x_rcm_nexus_data_residency_cfg

## Required script include

- x_rcm_DataResidencyService

## Required Scripted REST resource

- scripted-rest/x_rcm_data_residency_api.js

## API usage

- GET action=regions
- GET action=summary
- GET action=data_flow_rules
- POST action=seed_regions
