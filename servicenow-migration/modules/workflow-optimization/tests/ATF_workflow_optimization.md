# ATF: Workflow Optimization Module

## Test 1: Optimize action

- Call POST action=optimize
- Assert bridge invocation to ai-workflow-optimization and success response

## Test 2: Last worklist retrieval

- Seed workflow recommendation row
- Call GET action=last_worklist
- Assert task counts, revenue_at_risk, workload_level

## Test 3: Missing worklist case

- Ensure no worklist rows
- Call GET action=last_worklist
- Assert 404 with message

## Test 4: Invalid action handling

- Call invalid GET/POST actions
- Assert 400 response
