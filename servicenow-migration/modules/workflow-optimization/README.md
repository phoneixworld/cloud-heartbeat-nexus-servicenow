# Module: Workflow Optimization

This module ports AI workflow optimization behavior into ServiceNow.

## Scope

- Trigger AI worklist optimization
- Return prioritized tasks, daily summary, workflow insights, staffing recommendation
- Persist latest optimization payload for dashboard retrieval

## Required tables

- x_rcm_nexus_workflow_recommendation
- x_rcm_nexus_ai_usage_log

## Required script include

- x_rcm_WorkflowOptimizationService

## Required Scripted REST resource

- scripted-rest/x_rcm_workflow_optimization_api.js

## API usage

- POST action=optimize
- GET action=last_worklist
