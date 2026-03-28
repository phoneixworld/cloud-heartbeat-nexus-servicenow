# ATF: Self-Healing Module

## Test 1: Seed rules

- Ensure rules table is empty
- Call POST action=seed_rules
- Assert default rules are inserted

## Test 2: List rules and summary

- Call GET action=rules and GET action=summary
- Assert total_rules, active_rules, total_success, total_failure, healing_rate

## Test 3: Toggle rule state

- Call POST action=toggle_rule with valid rule_sys_id
- Assert is_active updates accordingly

## Test 4: Executions feed

- Seed execution rows
- Call GET action=executions
- Assert rows returned ordered by created date descending

## Test 5: Invalid action handling

- Call invalid GET and POST actions
- Assert 400 response
