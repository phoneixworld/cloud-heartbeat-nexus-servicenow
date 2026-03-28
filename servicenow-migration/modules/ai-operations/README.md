# Module: AI Operations

This module ports AI operations monitoring behavior into ServiceNow.

## Scope

- Aggregate AI usage logs across all capabilities
- Return capability health metrics (calls, success rate, latency, cost, errors)
- Return recent AI errors for operational triage
- Return feedback quality metrics by capability

## Required tables

- x_rcm_nexus_ai_usage_log
- x_rcm_nexus_ai_feedback

## Required script include

- x_rcm_AiOpsService

## Required Scripted REST resource

- scripted-rest/x_rcm_ai_operations_api.js

## API usage

- GET action=overview
- GET action=feedback
- GET action=dashboard
