# Module: Workloads

This module ports workload queue and work item management behavior from the legacy application into ServiceNow.

## Scope

- List workload queues ordered by priority
- List workload items with optional status filter
- Assign workload item to a user and set assigned timestamp
- Complete workload item and capture completion notes
- Provide summary counters for total/open/in-progress/completed/escalated

## Required tables

- x_rcm_nexus_work_queue
- x_rcm_nexus_work_item
- x_rcm_nexus_claim

## Required script include

- x_rcm_WorkloadService

## Required Scripted REST resource

- scripted-rest/x_rcm_workloads_api.js

## API usage

- GET action=queues
- GET action=items with optional status
- GET action=summary with optional status
- POST action=assign with item_sys_id and assigned_to
- POST action=complete with item_sys_id and optional completion_notes
