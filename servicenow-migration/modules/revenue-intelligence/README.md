# Module: Revenue Intelligence

This module ports revenue intelligence and benchmarking behavior from the legacy application into ServiceNow.

## Scope

- Revenue KPI computation: charges, collected, net collection rate, FPRR, average days in A/R
- Denial revenue impact by category
- Payer yield comparison dataset
- Monthly charge vs collected trend dataset
- What-if simulator projection endpoint

## Required tables

- x_rcm_nexus_claim
- x_rcm_nexus_payer
- x_rcm_nexus_denial_workflow

## Required script include

- x_rcm_RevenueIntelService

## Required Scripted REST resource

- scripted-rest/x_rcm_revenue_intelligence_api.js

## API usage

- GET action=metrics
- GET action=denial_categories
- GET action=payer_yield
- GET action=monthly_trend
- GET action=simulate with monthly_charges, denial_rate, collection_rate
