# Remaining Module Specs (Steps after Core 1-4)

Use this file to implement the remaining pages one by one after Claims, Denials, Scrubbing, and RTA.

| Route | ServiceNow page id | Primary table(s) | Needed Script Include |
|---|---|---|---|
| /batches | rcm_batches | x_rcm_nexus_batch, x_rcm_nexus_claim | x_rcm_BatchService (implemented in modules/batches) |
| /analytics | rcm_analytics | x_rcm_nexus_claim, x_rcm_nexus_denial_workflow | x_rcm_AnalyticsService (implemented in modules/analytics) |
| /workloads | rcm_workloads | x_rcm_nexus_work_queue, task | x_rcm_WorkloadService (implemented in modules/workloads) |
| /reports | rcm_reports | report sources (claim/denial/payment) | x_rcm_ReportService (implemented in modules/reports) |
| /payment-posting | rcm_payment_posting | x_rcm_nexus_patient_payment, x_rcm_nexus_claim | x_rcm_PaymentPostingService (implemented in modules/payment-posting) |
| /payer-contracts | rcm_payer_contracts | x_rcm_nexus_payer_contract, x_rcm_nexus_fee_schedule | x_rcm_PayerContractService (implemented in modules/payer-contracts) |
| /charge-capture | rcm_charge_capture | x_rcm_nexus_charge_capture | x_rcm_ChargeCaptureService (implemented in modules/charge-capture) |
| /patient-financial | rcm_patient_financial | x_rcm_nexus_payment_plan, x_rcm_nexus_credit_balance | x_rcm_PatientFinancialService (implemented in modules/patient-financial) |
| /revenue-intelligence | rcm_revenue_intelligence | claim + denial + payer aggregates | x_rcm_RevenueIntelService (implemented in modules/revenue-intelligence) |
| /compliance | rcm_compliance | x_rcm_nexus_compliance_check | x_rcm_ComplianceService (implemented in modules/compliance) |
| /exception-triage | rcm_exception_triage | x_rcm_nexus_exception_item | x_rcm_ExceptionTriageService (implemented in modules/exception-triage) |
| /touchless-processing | rcm_touchless_processing | x_rcm_nexus_stp_run | x_rcm_StpService (implemented in modules/touchless-processing) |
| /self-healing | rcm_self_healing | x_rcm_nexus_automation_rule, x_rcm_nexus_automation_execution | x_rcm_SelfHealingService (implemented in modules/self-healing) |
| /behavioral-biometrics | rcm_behavioral_biometrics | x_rcm_nexus_session_event | x_rcm_BehavioralService (implemented in modules/behavioral-biometrics) |
| /zero-trust | rcm_zero_trust | x_rcm_nexus_claim_audit_log, sys_user_has_role | x_rcm_ZeroTrustService (implemented in modules/zero-trust) |
| /data-residency | rcm_data_residency | x_rcm_nexus_data_residency_cfg | x_rcm_DataResidencyService (implemented in modules/data-residency) |
| /integrations | rcm_integrations | x_rcm_nexus_integration_config | x_rcm_IntegrationConfigService (implemented in modules/integrations) |
| /anomaly-detection | rcm_anomaly_detection | x_rcm_nexus_anomaly_result | x_rcm_AnomalyService (implemented in modules/anomaly-detection) |
| /revenue-forecast | rcm_revenue_forecast | x_rcm_nexus_revenue_forecast | x_rcm_RevenueForecastService (implemented in modules/revenue-forecast) |
| /workflow-optimization | rcm_workflow_optimization | x_rcm_nexus_workflow_recommendation | x_rcm_WorkflowOptimizationService (implemented in modules/workflow-optimization) |
| /ai-operations | rcm_ai_operations | x_rcm_nexus_ai_usage_log, x_rcm_nexus_ai_feedback | x_rcm_AiOpsService (implemented in modules/ai-operations) |
| /ai-roi | rcm_ai_roi | x_rcm_nexus_ai_usage_log + KPI snapshots | x_rcm_AiRoiService (implemented in modules/ai-roi) |
| /notifications | rcm_notifications | sysevent, sys_notification, custom feed table | x_rcm_NotificationService (implemented in modules/notifications) |
| /patient-portal | rcm_patient_portal | x_rcm_nexus_portal_message, x_rcm_nexus_patient | x_rcm_PatientPortalService (implemented in modules/patient-portal) |

## Generic implementation pattern for each remaining module

1. Create table(s) with u_ prefixed fields and indexes.
2. Create Script Include with list/get/create/update plus stats where applicable.
3. Add Scripted REST resources for workspace calls.
4. Add ACLs for role and assignment-based access.
5. Add ATF tests: CRUD, filters, transitions, security.

## Completion checkpoint

When all above modules are implemented and smoke-tested in ServiceNow, the migration is functionally complete.
