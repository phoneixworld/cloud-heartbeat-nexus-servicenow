# Module: AI ROI

This module ports AI ROI dashboard behavior into ServiceNow.

## Scope

- Aggregate claims, denials, and prediction metrics for ROI computations
- Return per-capability value metrics (protected revenue, generated revenue, cost saved, time saved)
- Return rollup ROI summary for dashboard and annualized projections
- Optionally snapshot current ROI values for trending

## Required tables

- x_rcm_nexus_claim
- x_rcm_nexus_denial_workflow
- x_rcm_nexus_ml_prediction
- x_rcm_nexus_ai_roi_snapshot

## Required script include

- x_rcm_AiRoiService

## Required Scripted REST resource

- scripted-rest/x_rcm_ai_roi_api.js

## API usage

- GET action=metrics
- POST action=snapshot
- GET action=latest_snapshot
