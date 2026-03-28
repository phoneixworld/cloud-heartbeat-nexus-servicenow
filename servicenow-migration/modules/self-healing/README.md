# Module: Self-Healing

This module ports self-healing automation behavior from the legacy application into ServiceNow.

## Scope

- List and toggle automation rules
- Seed baseline automation rule set
- List recent automation executions
- Compute healing KPIs (active rules, success/failure totals, healing rate)

## Required tables

- x_rcm_nexus_automation_rule
- x_rcm_nexus_automation_execution

## Required script include

- x_rcm_SelfHealingService

## Required Scripted REST resource

- scripted-rest/x_rcm_self_healing_api.js

## API usage

- GET action=rules
- GET action=executions
- GET action=summary
- POST action=seed_rules
- POST action=toggle_rule with rule_sys_id and is_active
