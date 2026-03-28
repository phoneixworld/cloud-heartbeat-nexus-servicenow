# Step-by-Step Execution Plan (Complete Migration Path)

This file is the ordered runbook to migrate one module at a time and finish the full platform move.

## Step 1: Core Claims (complete first)

Artifacts:

- modules/core-claims/README.md
- modules/core-claims/table-dictionary.md
- modules/core-claims/script-includes/x_rcm_ClaimsService.js
- modules/core-claims/scripted-rest/x_rcm_claims_api.js
- modules/core-claims/business-rules/BR_claim_status_rollup.js
- modules/core-claims/tests/ATF_claims.md

Completion criteria:

- Claim CRUD in ServiceNow works
- Claim list filters (status, payer, search) work
- Claim metrics (denial rate, collection rate, pending amount) compute server-side

## Step 2: Denials

Artifacts:

- modules/denials/README.md
- modules/denials/script-includes/x_rcm_DenialService.js
- modules/denials/scripted-rest/x_rcm_denials_api.js
- modules/denials/tests/ATF_denials.md

Completion criteria:

- Denial workflow queue operational
- Appeal status updates and category/group analytics available

## Step 3: Scrubbing

Artifacts:

- modules/scrubbing/README.md
- modules/scrubbing/script-includes/x_rcm_ScrubService.js
- modules/scrubbing/scripted-rest/x_rcm_scrubbing_api.js
- modules/scrubbing/tests/ATF_scrubbing.md

Completion criteria:

- Rule CRUD available
- Single and bulk scrub execution works
- Resolve action updates scrub_result records correctly

## Step 4: RTA

Artifacts:

- modules/rta/README.md
- modules/rta/script-includes/x_rcm_RtaService.js
- modules/rta/scripted-rest/x_rcm_rta_api.js
- modules/rta/tests/ATF_rta.md

Completion criteria:

- RTA submission writes transaction record
- Claim status and payment fields are updated after response
- Audit record is created for each submission

## Step 5: AI and Edge Integration

Artifacts:

- integration/edge-function-to-integrationhub-map.md

Completion criteria:

- Each existing Supabase edge function mapped to IntegrationHub action
- Retry/error policy and observability fields defined

## Step 5.1: Payment Posting module

Artifacts:

- modules/payment-posting/README.md
- modules/payment-posting/script-includes/x_rcm_PaymentPostingService.js
- modules/payment-posting/scripted-rest/x_rcm_payment_posting_api.js
- modules/payment-posting/tests/ATF_payment_posting.md

Completion criteria:

- Payment posting API supports list, unpaid claims, summary, and post payment
- Claim paid amount and status rollup is working

## Step 5.2: Analytics module

Artifacts:

- modules/analytics/README.md
- modules/analytics/script-includes/x_rcm_AnalyticsService.js
- modules/analytics/scripted-rest/x_rcm_analytics_api.js
- modules/analytics/tests/ATF_analytics.md

Completion criteria:

- Overview, denial analytics, benchmark, and simulator endpoints are working
- Dashboard KPIs align with claims and denials data

## Step 5.3: Batches module

Artifacts:

- modules/batches/README.md
- modules/batches/script-includes/x_rcm_BatchService.js
- modules/batches/scripted-rest/x_rcm_batches_api.js
- modules/batches/tests/ATF_batches.md

Completion criteria:

- Batch list and summary APIs are working
- Create batch API creates batch and batch-claim item records
- Ineligible claims (paid, denied, void) are excluded from created batch items

## Step 5.4: Workloads module

Artifacts:

- modules/workloads/README.md
- modules/workloads/script-includes/x_rcm_WorkloadService.js
- modules/workloads/scripted-rest/x_rcm_workloads_api.js
- modules/workloads/tests/ATF_workloads.md

Completion criteria:

- Queue list, item list, and summary APIs are working
- Assign and complete actions update status and timestamps correctly
- Status filtering returns only matching workload items

## Step 5.5: Reports module

Artifacts:

- modules/reports/README.md
- modules/reports/script-includes/x_rcm_ReportService.js
- modules/reports/scripted-rest/x_rcm_reports_api.js
- modules/reports/tests/ATF_reports.md

Completion criteria:

- Executive summary and aging summary endpoints are working
- Export endpoints return claims, denials, and aging datasets
- Compliance snapshot endpoint returns expected compliance status fields

## Step 5.6: Payer Contracts module

Artifacts:

- modules/payer-contracts/README.md
- modules/payer-contracts/script-includes/x_rcm_PayerContractService.js
- modules/payer-contracts/scripted-rest/x_rcm_payer_contracts_api.js
- modules/payer-contracts/tests/ATF_payer_contracts.md

Completion criteria:

- Contract list and search APIs are working
- Create contract API inserts contract with required fields
- Fee schedule and summary endpoints return expected contract metrics

## Step 5.7: Charge Capture module

Artifacts:

- modules/charge-capture/README.md
- modules/charge-capture/script-includes/x_rcm_ChargeCaptureService.js
- modules/charge-capture/scripted-rest/x_rcm_charge_capture_api.js
- modules/charge-capture/tests/ATF_charge_capture.md

Completion criteria:

- Encounter list and summary endpoints are working
- Create encounter endpoint inserts active encounters
- Bill encounter endpoint creates claim and updates encounter status to billed

## Step 5.8: Patient Financial module

Artifacts:

- modules/patient-financial/README.md
- modules/patient-financial/script-includes/x_rcm_PatientFinancialService.js
- modules/patient-financial/scripted-rest/x_rcm_patient_financial_api.js
- modules/patient-financial/tests/ATF_patient_financial.md

Completion criteria:

- Payment plan, credit balance, payment feed, and summary endpoints are working
- Create plan endpoint inserts plan with remaining balance and next payment date
- Payment intelligence integration action is callable from ServiceNow API path

## Step 5.9: Revenue Intelligence module

Artifacts:

- modules/revenue-intelligence/README.md
- modules/revenue-intelligence/script-includes/x_rcm_RevenueIntelService.js
- modules/revenue-intelligence/scripted-rest/x_rcm_revenue_intelligence_api.js
- modules/revenue-intelligence/tests/ATF_revenue_intelligence.md

Completion criteria:

- Metrics, denial category, payer yield, and monthly trend endpoints are working
- Revenue simulation endpoint returns projected revenue/leakage outputs

## Step 5.10: Compliance module

Artifacts:

- modules/compliance/README.md
- modules/compliance/script-includes/x_rcm_ComplianceService.js
- modules/compliance/scripted-rest/x_rcm_compliance_api.js
- modules/compliance/tests/ATF_compliance.md

Completion criteria:

- Compliance check list and summary endpoints are working
- Run scan endpoint inserts claim-level and system-level checks
- Compliance score and status counts compute correctly from stored checks

## Step 5.11: Exception Triage module

Artifacts:

- modules/exception-triage/README.md
- modules/exception-triage/script-includes/x_rcm_ExceptionTriageService.js
- modules/exception-triage/scripted-rest/x_rcm_exception_triage_api.js
- modules/exception-triage/tests/ATF_exception_triage.md

Completion criteria:

- Triage endpoint returns prioritized claims sorted by priority score
- Summary endpoint returns critical/high/medium counts and revenue-at-risk
- Scoring reasons and recommended actions reflect triage policy

## Step 5.12: Touchless Processing module

Artifacts:

- modules/touchless-processing/README.md
- modules/touchless-processing/script-includes/x_rcm_StpService.js
- modules/touchless-processing/scripted-rest/x_rcm_touchless_processing_api.js
- modules/touchless-processing/tests/ATF_touchless_processing.md

Completion criteria:

- STP metrics, stage breakdown, and processing breakdown endpoints are working
- Recent runs and manual-claims feeds are available for operational dashboarding

## Step 5.13: Self-Healing module

Artifacts:

- modules/self-healing/README.md
- modules/self-healing/script-includes/x_rcm_SelfHealingService.js
- modules/self-healing/scripted-rest/x_rcm_self_healing_api.js
- modules/self-healing/tests/ATF_self_healing.md

Completion criteria:

- Rule list, execution list, and summary endpoints are working
- Seed-rules and toggle-rule actions function correctly

## Step 5.14: Behavioral Biometrics module

Artifacts:

- modules/behavioral-biometrics/README.md
- modules/behavioral-biometrics/script-includes/x_rcm_BehavioralService.js
- modules/behavioral-biometrics/scripted-rest/x_rcm_behavioral_biometrics_api.js
- modules/behavioral-biometrics/tests/ATF_behavioral_biometrics.md

Completion criteria:

- Session events and UBA metrics endpoints are working
- Risk trend, IP analysis, and recent-audit feeds return expected data shapes

## Step 5.15: Zero Trust module

Artifacts:

- modules/zero-trust/README.md
- modules/zero-trust/script-includes/x_rcm_ZeroTrustService.js
- modules/zero-trust/scripted-rest/x_rcm_zero_trust_api.js
- modules/zero-trust/tests/ATF_zero_trust.md

Completion criteria:

- Security overview endpoint returns audit/user/role/hash integrity metrics
- Compliance matrix, MFA methods, and encryption posture endpoints are available

## Step 5.16: Data Residency module

Artifacts:

- modules/data-residency/README.md
- modules/data-residency/script-includes/x_rcm_DataResidencyService.js
- modules/data-residency/scripted-rest/x_rcm_data_residency_api.js
- modules/data-residency/tests/ATF_data_residency.md

Completion criteria:

- Region list, summary, and data flow rule endpoints are working
- Seed regions action inserts baseline regional policy configuration

## Step 5.17: Integrations module

Artifacts:

- modules/integrations/README.md
- modules/integrations/script-includes/x_rcm_IntegrationConfigService.js
- modules/integrations/scripted-rest/x_rcm_integrations_api.js
- modules/integrations/tests/ATF_integrations.md

Completion criteria:

- Integration config list and summary endpoints are working
- Seed integrations action inserts baseline EHR/clearinghouse/payer/payment/lab records

## Step 5.18: Anomaly Detection module

Artifacts:

- modules/anomaly-detection/README.md
- modules/anomaly-detection/script-includes/x_rcm_AnomalyService.js
- modules/anomaly-detection/scripted-rest/x_rcm_anomaly_detection_api.js
- modules/anomaly-detection/tests/ATF_anomaly_detection.md

Completion criteria:

- Run-scan action invokes AI anomaly function and stores latest report
- Last-report endpoint returns latest anomaly payload and metadata

## Step 5.19: Revenue Forecast module

Artifacts:

- modules/revenue-forecast/README.md
- modules/revenue-forecast/script-includes/x_rcm_RevenueForecastService.js
- modules/revenue-forecast/scripted-rest/x_rcm_revenue_forecast_api.js
- modules/revenue-forecast/tests/ATF_revenue_forecast.md

Completion criteria:

- Generate action invokes AI revenue forecast and stores latest forecast
- Last-forecast endpoint returns latest forecast payload and summary fields

## Step 5.20: Workflow Optimization module

Artifacts:

- modules/workflow-optimization/README.md
- modules/workflow-optimization/script-includes/x_rcm_WorkflowOptimizationService.js
- modules/workflow-optimization/scripted-rest/x_rcm_workflow_optimization_api.js
- modules/workflow-optimization/tests/ATF_workflow_optimization.md

Completion criteria:

- Optimize action invokes AI workflow optimizer and stores latest worklist
- Last-worklist endpoint returns prioritized workload summary payload

## Step 5.21: AI Operations module

Artifacts:

- modules/ai-operations/README.md
- modules/ai-operations/script-includes/x_rcm_AiOpsService.js
- modules/ai-operations/scripted-rest/x_rcm_ai_operations_api.js
- modules/ai-operations/tests/ATF_ai_operations.md

Completion criteria:

- Overview endpoint returns capability-level AI usage metrics and recent error feed
- Feedback endpoint returns positive-rate and accuracy aggregates by capability
- Dashboard endpoint returns combined overview and feedback payload

## Step 5.22: AI ROI module

Artifacts:

- modules/ai-roi/README.md
- modules/ai-roi/script-includes/x_rcm_AiRoiService.js
- modules/ai-roi/scripted-rest/x_rcm_ai_roi_api.js
- modules/ai-roi/tests/ATF_ai_roi.md

Completion criteria:

- Metrics endpoint returns per-capability ROI values and annualized projection
- Snapshot action stores current ROI metrics for trend history
- Latest-snapshot endpoint returns most recent persisted ROI payload

## Step 5.23: Notifications module

Artifacts:

- modules/notifications/README.md
- modules/notifications/script-includes/x_rcm_NotificationService.js
- modules/notifications/scripted-rest/x_rcm_notifications_api.js
- modules/notifications/tests/ATF_notifications.md

Completion criteria:

- Notification list endpoint supports all, unread, critical, claims, AI, and deadlines filters
- Summary endpoint returns total, unread, critical, and warning counters
- Mark-read and mark-all-read actions update read state and timestamps

## Step 5.24: Patient Portal module

Artifacts:

- modules/patient-portal/README.md
- modules/patient-portal/script-includes/x_rcm_PatientPortalService.js
- modules/patient-portal/scripted-rest/x_rcm_patient_portal_api.js
- modules/patient-portal/tests/ATF_patient_portal.md

Completion criteria:

- Patient list endpoint returns active patients for portal selection
- Dashboard endpoint returns statements, payments, plans, messages, and aggregate totals
- Send-message and mark-message-read actions work for secure portal messaging

## Step 6: Remaining pages and hardening

- Build remaining workspace pages in priority order from route map
- Add ACL matrix and field-level controls
- Finish ATF regression pack

Operational playbook:

- STEP6_INSTANCE_EXECUTION_PLAYBOOK.md

Step 6 implementation checklist:

- Import foundation artifacts and validate core APIs
- Roll out all remaining module artifacts in deployment waves
- Apply expanded ACL matrix and field security controls
- Build and validate workspace pages for business-critical flows
- Run module ATF and security ATF suites and resolve blockers

Security artifacts:

- security/ROLE_MODEL.md
- security/ACL_MATRIX_CORE_MODULES.md
- security/FIELD_SECURITY_POLICY.md
- security/ATF_SECURITY_TESTS.md

## Step 7: Controlled legacy decommission

Artifacts:

- decommission/DECOMMISSION_POLICY.md
- decommission/CUTOVER_CHECKLIST.md
- decommission/LEGACY_REMOVAL_MATRIX.md

Completion criteria:

- All go/no-go gates pass
- Legacy runtime is archived and safely decommissioned
- Non-ServiceNow runtime dependencies are removed

Definition of finished:

- Business-critical modules live in ServiceNow
- No critical user flow depends on React/Supabase runtime
- Security/compliance baseline and test coverage accepted
