# ACL Matrix: All Implemented Modules

Use this matrix for Step 6 instance hardening after importing module artifacts.

Legend:
- C = create
- R = read
- U = update
- D = delete
- E = execute (Scripted REST/action)

## Table-level ACL matrix (expanded)

| Table | admin | supervisor | agent | ai_ops | audit | integration |
|---|---|---|---|---|---|---|
| x_rcm_nexus_claim | CRUD | CRU | CRU (assigned/team scope) | R | R | CRU (integration scope) |
| x_rcm_nexus_claim_line_item | CRUD | CRU | CRU (assigned/team scope) | R | R | CRU (integration scope) |
| x_rcm_nexus_denial_workflow | CRUD | CRU | CRU (assigned/team scope) | R | R | CRU (integration scope) |
| x_rcm_nexus_scrub_rule | CRUD | CRU | R | CRU | R | R |
| x_rcm_nexus_scrub_result | CRUD | CRU | CRU | CRU | R | CRU (integration scope) |
| x_rcm_nexus_payer_rta_config | CRUD | CRU | R | R | R | R |
| x_rcm_nexus_rta_txn | CRUD | CRU | R | R | R | CRU (integration scope) |
| x_rcm_nexus_claim_audit_log | CRUD | R | R | R | R | C |
| x_rcm_nexus_ai_usage_log | CRUD | R | R | CRU | R | C |
| x_rcm_nexus_ai_feedback | CRUD | R | R | CRU | R | C |
| x_rcm_nexus_ml_prediction | CRUD | CRU | R | CRU | R | CRU |
| x_rcm_nexus_revenue_forecast | CRUD | R | R | CRU | R | C |
| x_rcm_nexus_workflow_recommendation | CRUD | R | R | CRU | R | C |
| x_rcm_nexus_anomaly_result | CRUD | R | R | CRU | R | C |
| x_rcm_nexus_ai_roi_snapshot | CRUD | R | R | CRU | R | C |
| x_rcm_nexus_notification_feed | CRUD | CRU | CRU | CRU | R | C |
| x_rcm_nexus_portal_message | CRUD | CRU | CRU (assigned/team scope) | R | R | C |
| x_rcm_nexus_patient_payment | CRUD | CRU | CRU | R | R | CRU |
| x_rcm_nexus_payment_plan | CRUD | CRU | CRU | R | R | CRU |
| x_rcm_nexus_credit_balance | CRUD | CRU | CRU | R | R | CRU |
| x_rcm_nexus_batch | CRUD | CRU | CRU | R | R | CRU |
| x_rcm_nexus_batch_claim_item | CRUD | CRU | CRU | R | R | CRU |
| x_rcm_nexus_work_queue | CRUD | CRU | R | R | R | R |
| x_rcm_nexus_work_item | CRUD | CRU | CRU (assigned/team scope) | R | R | CRU |
| x_rcm_nexus_integration_config | CRUD | CRU | R | R | R | CRU |
| x_rcm_nexus_stp_run | CRUD | CRU | R | CRU | R | C |
| x_rcm_nexus_automation_rule | CRUD | CRU | R | CRU | R | C |
| x_rcm_nexus_automation_execution | CRUD | CRU | R | CRU | R | C |
| x_rcm_nexus_session_event | CRUD | R | R | CRU | R | C |
| x_rcm_nexus_data_residency_cfg | CRUD | CRU | R | R | R | R |

## Scripted REST execute ACL matrix (expanded)

| API resource | admin | supervisor | agent | ai_ops | audit | integration |
|---|---|---|---|---|---|---|
| x_rcm_claims_api | E | E | E | R-only actions | E (read actions only) | E |
| x_rcm_denials_api | E | E | E | R-only actions | E (read actions only) | E |
| x_rcm_scrubbing_api | E | E | E | E | E (read actions only) | E |
| x_rcm_rta_api | E | E | E | R-only actions | E (read actions only) | E |
| x_rcm_payment_posting_api | E | E | E | R-only actions | E (read actions only) | E |
| x_rcm_analytics_api | E | E | E | E | E (read actions only) | E |
| x_rcm_batches_api | E | E | E | R-only actions | E (read actions only) | E |
| x_rcm_workloads_api | E | E | E | R-only actions | E (read actions only) | E |
| x_rcm_reports_api | E | E | E | E | E (read actions only) | E |
| x_rcm_payer_contracts_api | E | E | R | R | E (read actions only) | E |
| x_rcm_charge_capture_api | E | E | E | R-only actions | E (read actions only) | E |
| x_rcm_patient_financial_api | E | E | E | R-only actions | E (read actions only) | E |
| x_rcm_revenue_intelligence_api | E | E | E | E | E (read actions only) | E |
| x_rcm_compliance_api | E | E | R | R | E (read actions only) | E |
| x_rcm_exception_triage_api | E | E | E | R-only actions | E (read actions only) | E |
| x_rcm_touchless_processing_api | E | E | E | E | E (read actions only) | E |
| x_rcm_self_healing_api | E | E | R | E | E (read actions only) | E |
| x_rcm_behavioral_biometrics_api | E | E | R | E | E (read actions only) | E |
| x_rcm_zero_trust_api | E | E | R | E | E (read actions only) | E |
| x_rcm_data_residency_api | E | E | R | R | E (read actions only) | E |
| x_rcm_integrations_api | E | E | R | R | E (read actions only) | E |
| x_rcm_anomaly_detection_api | E | E | E | E | E (read actions only) | E |
| x_rcm_revenue_forecast_api | E | E | E | E | E (read actions only) | E |
| x_rcm_workflow_optimization_api | E | E | E | E | E (read actions only) | E |
| x_rcm_ai_operations_api | E | R | R | E | E (read actions only) | E |
| x_rcm_ai_roi_api | E | R | R | E | E (read actions only) | E |
| x_rcm_notifications_api | E | E | E | E | E (read actions only) | E |
| x_rcm_patient_portal_api | E | E | E | R | E (read actions only) | E |

## Critical constraints

- Enforce assignment-based write ACLs for claims, denials, work items, and portal messages.
- Restrict integration role to API-only access; block interactive workspace login.
- Disable delete for non-admin roles across PHI-sensitive tables.
- Apply field ACLs from FIELD_SECURITY_POLICY.md before enabling broad agent access.
