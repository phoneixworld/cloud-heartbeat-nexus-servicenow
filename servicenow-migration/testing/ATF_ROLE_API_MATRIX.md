# ATF Role-to-API Execution Matrix

Use this matrix to execute authorization coverage for all scripted API resources.

## Roles under test

- x_rcm_nexus.admin
- x_rcm_nexus.supervisor
- x_rcm_nexus.agent
- x_rcm_nexus.ai_ops
- x_rcm_nexus.audit
- x_rcm_nexus.integration

## Expected behavior legend

- ALLOW = action should succeed for role
- DENY = action should be rejected for role
- ALLOW-R = read-only actions only; write actions denied

## Matrix: API action groups by role

| API | Action Group | admin | supervisor | agent | ai_ops | audit | integration |
|---|---|---|---|---|---|---|---|
| x_rcm_claims_api | list/get/stats | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_claims_api | create/update | ALLOW | ALLOW | ALLOW (assignment scope) | DENY | DENY | ALLOW |
| x_rcm_denials_api | list/stats | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_denials_api | update | ALLOW | ALLOW | ALLOW (assignment scope) | DENY | DENY | ALLOW |
| x_rcm_scrubbing_api | rules/results/stats | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW |
| x_rcm_scrubbing_api | run/run_bulk/resolve | ALLOW | ALLOW | ALLOW | ALLOW | DENY | ALLOW |
| x_rcm_rta_api | config/transactions | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_rta_api | submit | ALLOW | ALLOW | ALLOW | DENY | DENY | ALLOW |
| x_rcm_payment_posting_api | read actions | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_payment_posting_api | post_payment | ALLOW | ALLOW | ALLOW | DENY | DENY | ALLOW |
| x_rcm_analytics_api | all actions | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW |
| x_rcm_batches_api | list/summary | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_batches_api | create_batch | ALLOW | ALLOW | ALLOW | DENY | DENY | ALLOW |
| x_rcm_workloads_api | queues/items/summary | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_workloads_api | assign/complete | ALLOW | ALLOW | ALLOW (assignment scope) | DENY | DENY | ALLOW |
| x_rcm_reports_api | all actions | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW |
| x_rcm_payer_contracts_api | read actions | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_payer_contracts_api | create_contract | ALLOW | ALLOW | DENY | DENY | DENY | ALLOW |
| x_rcm_charge_capture_api | read actions | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_charge_capture_api | create_encounter/bill_encounter | ALLOW | ALLOW | ALLOW | DENY | DENY | ALLOW |
| x_rcm_patient_financial_api | read actions | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_patient_financial_api | create_plan/payment_intelligence | ALLOW | ALLOW | ALLOW | DENY | DENY | ALLOW |
| x_rcm_revenue_intelligence_api | all actions | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW |
| x_rcm_compliance_api | checks/summary | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_compliance_api | run_scan | ALLOW | ALLOW | DENY | DENY | DENY | ALLOW |
| x_rcm_exception_triage_api | triage/summary | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_touchless_processing_api | all actions | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW |
| x_rcm_self_healing_api | rules/executions/summary | ALLOW | ALLOW | ALLOW-R | ALLOW | ALLOW-R | ALLOW |
| x_rcm_self_healing_api | seed_rules/toggle_rule | ALLOW | ALLOW | DENY | ALLOW | DENY | ALLOW |
| x_rcm_behavioral_biometrics_api | all actions | ALLOW | ALLOW | ALLOW-R | ALLOW | ALLOW-R | ALLOW |
| x_rcm_zero_trust_api | all actions | ALLOW | ALLOW | ALLOW-R | ALLOW | ALLOW-R | ALLOW |
| x_rcm_data_residency_api | regions/summary/data_flow_rules | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_data_residency_api | seed_regions | ALLOW | ALLOW | DENY | DENY | DENY | ALLOW |
| x_rcm_integrations_api | configs/summary | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_integrations_api | seed_integrations | ALLOW | ALLOW | DENY | DENY | DENY | ALLOW |
| x_rcm_anomaly_detection_api | run_scan/last_report | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW |
| x_rcm_revenue_forecast_api | generate/last_forecast | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW |
| x_rcm_workflow_optimization_api | optimize/last_worklist | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW |
| x_rcm_ai_operations_api | overview/feedback/dashboard | ALLOW | ALLOW-R | ALLOW-R | ALLOW | ALLOW-R | ALLOW |
| x_rcm_ai_roi_api | metrics/latest_snapshot | ALLOW | ALLOW-R | ALLOW-R | ALLOW | ALLOW-R | ALLOW |
| x_rcm_ai_roi_api | snapshot | ALLOW | DENY | DENY | ALLOW | DENY | ALLOW |
| x_rcm_notifications_api | list/summary | ALLOW | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW |
| x_rcm_notifications_api | mark_read/mark_all_read/seed_demo | ALLOW | ALLOW | ALLOW | ALLOW | DENY | ALLOW |
| x_rcm_patient_portal_api | patients/dashboard | ALLOW | ALLOW | ALLOW | ALLOW-R | ALLOW-R | ALLOW |
| x_rcm_patient_portal_api | send_message/mark_message_read | ALLOW | ALLOW | ALLOW (assignment scope) | DENY | DENY | ALLOW |

## Recommended ATF suite structure

1. Suite 1: Read-access verification per role (all APIs)
2. Suite 2: Write-access authorization per role
3. Suite 3: Assignment-scope enforcement (agent role)
4. Suite 4: API-only integration role behavior
5. Suite 5: Negative tests for denied actions (403/401 expected)

## Pass criteria

- 100% expected ALLOW actions succeed
- 100% expected DENY actions are blocked
- No PHI leakage in denied action responses or logs
