# Module: Integrations

This module ports Integration Hub configuration behavior from the legacy application into ServiceNow.

## Scope

- List integration configuration records
- Seed default EHR, clearinghouse, payer, payment, and lab integrations
- Return integration summary counters and type breakdown

## Required tables

- x_rcm_nexus_integration_config

## Required script include

- x_rcm_IntegrationConfigService

## Required Scripted REST resource

- scripted-rest/x_rcm_integrations_api.js

## API usage

- GET action=configs
- GET action=summary
- POST action=seed_integrations
