# Page-by-Page UI Builder Implementation Spec

This is the execution spec to replace each legacy src/pages screen with native ServiceNow workspace pages.

## Standards for every page

- Use Data Resources mapped to corresponding scripted APIs in modules/*/scripted-rest.
- Enforce role-based visibility and action availability per security matrices.
- Use server-side filters and pagination where possible.
- Capture user actions in audit logs for claims, denials, AI actions, and portal messaging.

## 1) Home page

- Legacy source: src/pages/Index.tsx
- Route: /
- Target page id: rcm_home
- Experience: Agent Workspace
- Data resources:
  - x_rcm_claims_api?action=stats
  - x_rcm_denials_api?action=stats
  - x_rcm_analytics_api?action=overview
  - x_rcm_notifications_api?action=summary
- UI sections:
  - KPI cards (claims, denials, collection rate, pending)
  - queue snapshot
  - high-priority alerts
- Acceptance criteria:
  - KPI cards match API values
  - links navigate to route-equivalent workspace pages

## 2) Claims page

- Legacy source: src/pages/Claims.tsx
- Route: /claims
- Target page id: rcm_claims
- Experience: Agent Workspace
- Data resources:
  - x_rcm_claims_api?action=list
  - x_rcm_claims_api?action=stats
- Actions:
  - create claim
  - open claim detail
  - update claim status and fields
- Acceptance criteria:
  - filter by status/payer/search works
  - claim create/update obey assignment ACL constraints

## 3) Patients page

- Legacy source: src/pages/Patients.tsx
- Route: /patients
- Target page id: rcm_patients
- Experience: Agent Workspace
- Data resources:
  - patient list resource from x_rcm_nexus_patient table API endpoint (implement in instance if missing)
  - claim and payment related views via existing module APIs
- Actions:
  - search/select patient
  - open patient profile context
- Acceptance criteria:
  - active patient filtering and search parity
  - navigation to related claims and financial data

## 4) Denials page

- Legacy source: src/pages/Denials.tsx
- Route: /denials
- Target page id: rcm_denials
- Experience: Agent Workspace
- Data resources:
  - x_rcm_denials_api?action=list
  - x_rcm_denials_api?action=stats
- Actions:
  - update appeal status
  - update owner/work notes
- Acceptance criteria:
  - category and status filtering match legacy behavior
  - appeal update flow captured in audit trail

## 5) Scrubbing page

- Legacy source: src/pages/Scrubbing.tsx
- Route: /scrubbing
- Target page id: rcm_scrubbing
- Experience: Agent Workspace
- Data resources:
  - x_rcm_scrubbing_api?action=rules
  - x_rcm_scrubbing_api?action=results
  - x_rcm_scrubbing_api?action=stats
- Actions:
  - run scrub
  - run bulk scrub
  - resolve result
- Acceptance criteria:
  - all three action flows return expected status updates

## 6) Batches page

- Legacy source: src/pages/Batches.tsx
- Route: /batches
- Target page id: rcm_batches
- Experience: Agent Workspace
- Data resources:
  - x_rcm_batches_api?action=list
  - x_rcm_batches_api?action=summary
- Actions:
  - create batch
- Acceptance criteria:
  - ineligible claims excluded from created batches

## 7) RTA page

- Legacy source: src/pages/RTA.tsx
- Route: /rta
- Target page id: rcm_rta
- Experience: Agent Workspace
- Data resources:
  - x_rcm_rta_api?action=config
  - x_rcm_rta_api?action=transactions
- Actions:
  - submit RTA
- Acceptance criteria:
  - approved and pended paths reflected in claim status updates

## 8) Analytics page

- Legacy source: src/pages/Analytics.tsx
- Route: /analytics
- Target page id: rcm_analytics
- Experience: Agent Workspace
- Data resources:
  - x_rcm_analytics_api?action=overview
  - x_rcm_analytics_api?action=denials
  - x_rcm_analytics_api?action=benchmark
  - x_rcm_analytics_api?action=simulator
- Acceptance criteria:
  - all four datasets render and match payload schema

## 9) Workloads page

- Legacy source: src/pages/Workloads.tsx
- Route: /workloads
- Target page id: rcm_workloads
- Experience: Agent Workspace
- Data resources:
  - x_rcm_workloads_api?action=queues
  - x_rcm_workloads_api?action=items
  - x_rcm_workloads_api?action=summary
- Actions:
  - assign item
  - complete item
- Acceptance criteria:
  - assignment and completion transitions are persisted

## 10) Reports page

- Legacy source: src/pages/Reports.tsx
- Route: /reports
- Target page id: rcm_reports
- Experience: Agent Workspace
- Data resources:
  - x_rcm_reports_api?action=executive_summary
  - x_rcm_reports_api?action=aging_summary
  - x_rcm_reports_api?action=exports&type=claims|denials|aging
  - x_rcm_reports_api?action=compliance_snapshot
- Acceptance criteria:
  - export action wiring supports all three export types

## 11) Payment Posting page

- Legacy source: src/pages/PaymentPosting.tsx
- Route: /payment-posting
- Target page id: rcm_payment_posting
- Experience: Agent Workspace
- Data resources:
  - x_rcm_payment_posting_api?action=payments
  - x_rcm_payment_posting_api?action=unpaid_claims
  - x_rcm_payment_posting_api?action=summary
- Actions:
  - post payment
- Acceptance criteria:
  - claim status rollup updates after posting

## 12) Payer Contracts page

- Legacy source: src/pages/PayerContracts.tsx
- Route: /payer-contracts
- Target page id: rcm_payer_contracts
- Experience: Agent Workspace
- Data resources:
  - x_rcm_payer_contracts_api?action=contracts
  - x_rcm_payer_contracts_api?action=fee_schedules
  - x_rcm_payer_contracts_api?action=summary
- Actions:
  - create contract
- Acceptance criteria:
  - fee schedules tied to selected contract

## 13) Charge Capture page

- Legacy source: src/pages/ChargeCapture.tsx
- Route: /charge-capture
- Target page id: rcm_charge_capture
- Experience: Agent Workspace
- Data resources:
  - x_rcm_charge_capture_api?action=encounters
  - x_rcm_charge_capture_api?action=summary
- Actions:
  - create encounter
  - bill encounter
- Acceptance criteria:
  - bill action generates claim and updates encounter status

## 14) Patient Financial page

- Legacy source: src/pages/PatientFinancial.tsx
- Route: /patient-financial
- Target page id: rcm_patient_financial
- Experience: Agent Workspace
- Data resources:
  - x_rcm_patient_financial_api?action=plans
  - x_rcm_patient_financial_api?action=credits
  - x_rcm_patient_financial_api?action=payments
  - x_rcm_patient_financial_api?action=summary
- Actions:
  - create plan
  - payment intelligence invoke
- Acceptance criteria:
  - summary counters align with table state

## 15) Revenue Intelligence page

- Legacy source: src/pages/RevenueIntelligence.tsx
- Route: /revenue-intelligence
- Target page id: rcm_revenue_intelligence
- Experience: Agent Workspace
- Data resources:
  - x_rcm_revenue_intelligence_api?action=metrics
  - x_rcm_revenue_intelligence_api?action=denial_categories
  - x_rcm_revenue_intelligence_api?action=payer_yield
  - x_rcm_revenue_intelligence_api?action=monthly_trend
  - x_rcm_revenue_intelligence_api?action=simulate
- Acceptance criteria:
  - simulator inputs return stable projection outputs

## 16) Compliance page

- Legacy source: src/pages/Compliance.tsx
- Route: /compliance
- Target page id: rcm_compliance
- Experience: Agent Workspace
- Data resources:
  - x_rcm_compliance_api?action=checks
  - x_rcm_compliance_api?action=summary
- Actions:
  - run scan
- Acceptance criteria:
  - check taxonomy and score are rendered correctly

## 17) Exception Triage page

- Legacy source: src/pages/ExceptionTriage.tsx
- Route: /exception-triage
- Target page id: rcm_exception_triage
- Experience: Agent Workspace
- Data resources:
  - x_rcm_exception_triage_api?action=triage
  - x_rcm_exception_triage_api?action=summary
- Acceptance criteria:
  - triage list sorted by priority score desc

## 18) Touchless Processing page

- Legacy source: src/pages/TouchlessProcessing.tsx
- Route: /touchless-processing
- Target page id: rcm_touchless_processing
- Experience: Agent Workspace
- Data resources:
  - x_rcm_touchless_processing_api?action=metrics
  - x_rcm_touchless_processing_api?action=stage_breakdown
  - x_rcm_touchless_processing_api?action=processing_breakdown
  - x_rcm_touchless_processing_api?action=recent_runs
  - x_rcm_touchless_processing_api?action=manual_claims
- Acceptance criteria:
  - STP rate and run feeds render without client-side joins

## 19) Self Healing page

- Legacy source: src/pages/SelfHealing.tsx
- Route: /self-healing
- Target page id: rcm_self_healing
- Experience: Agent Workspace
- Data resources:
  - x_rcm_self_healing_api?action=rules
  - x_rcm_self_healing_api?action=executions
  - x_rcm_self_healing_api?action=summary
- Actions:
  - seed rules
  - toggle rule
- Acceptance criteria:
  - toggle updates are immediately reflected in rules list

## 20) Behavioral Biometrics page

- Legacy source: src/pages/BehavioralBiometrics.tsx
- Route: /behavioral-biometrics
- Target page id: rcm_behavioral_biometrics
- Experience: Agent Workspace
- Data resources:
  - x_rcm_behavioral_biometrics_api?action=session_events
  - x_rcm_behavioral_biometrics_api?action=metrics
  - x_rcm_behavioral_biometrics_api?action=risk_trend
  - x_rcm_behavioral_biometrics_api?action=ip_analysis
  - x_rcm_behavioral_biometrics_api?action=recent_audit
- Acceptance criteria:
  - risk trend and IP analysis datasets render correctly

## 21) Zero Trust page

- Legacy source: src/pages/ZeroTrustSecurity.tsx
- Route: /zero-trust
- Target page id: rcm_zero_trust
- Experience: Agent Workspace
- Data resources:
  - x_rcm_zero_trust_api?action=overview
  - x_rcm_zero_trust_api?action=compliance_matrix
  - x_rcm_zero_trust_api?action=mfa_methods
  - x_rcm_zero_trust_api?action=encryption_posture
- Acceptance criteria:
  - compliance and posture tables display all rows from APIs

## 22) Data Residency page

- Legacy source: src/pages/DataResidency.tsx
- Route: /data-residency
- Target page id: rcm_data_residency
- Experience: Agent Workspace
- Data resources:
  - x_rcm_data_residency_api?action=regions
  - x_rcm_data_residency_api?action=summary
  - x_rcm_data_residency_api?action=data_flow_rules
- Actions:
  - seed regions
- Acceptance criteria:
  - region summary and flow rules are in sync after seed

## 23) Integrations page

- Legacy source: src/pages/IntegrationHub.tsx
- Route: /integrations
- Target page id: rcm_integrations
- Experience: Admin Workspace
- Data resources:
  - x_rcm_integrations_api?action=configs
  - x_rcm_integrations_api?action=summary
- Actions:
  - seed integrations
- Acceptance criteria:
  - by-type summary and records synced counters display correctly

## 24) Anomaly Detection page

- Legacy source: src/pages/AnomalyDetection.tsx
- Route: /anomaly-detection
- Target page id: rcm_anomaly_detection
- Experience: Agent Workspace
- Data resources:
  - x_rcm_anomaly_detection_api?action=last_report
- Actions:
  - run scan
- Acceptance criteria:
  - latest report shows scan metadata and recommendations

## 25) Revenue Forecast page

- Legacy source: src/pages/RevenueForecast.tsx
- Route: /revenue-forecast
- Target page id: rcm_revenue_forecast
- Experience: Agent Workspace
- Data resources:
  - x_rcm_revenue_forecast_api?action=last_forecast
- Actions:
  - generate forecast
- Acceptance criteria:
  - forecast cards match expected_30_day and expected_90_day fields

## 26) Workflow Optimization page

- Legacy source: src/pages/WorkflowOptimization.tsx
- Route: /workflow-optimization
- Target page id: rcm_workflow_optimization
- Experience: Agent Workspace
- Data resources:
  - x_rcm_workflow_optimization_api?action=last_worklist
- Actions:
  - optimize workflow
- Acceptance criteria:
  - worklist counts and revenue-at-risk values update after optimize

## 27) AI Operations page

- Legacy source: src/pages/AIOperations.tsx
- Route: /ai-operations
- Target page id: rcm_ai_operations
- Experience: Admin Workspace
- Data resources:
  - x_rcm_ai_operations_api?action=overview
  - x_rcm_ai_operations_api?action=feedback
  - x_rcm_ai_operations_api?action=dashboard
- Acceptance criteria:
  - capability health table and error feed match payload values

## 28) AI ROI page

- Legacy source: src/pages/AIROIDashboard.tsx
- Route: /ai-roi
- Target page id: rcm_ai_roi
- Experience: Admin Workspace
- Data resources:
  - x_rcm_ai_roi_api?action=metrics
  - x_rcm_ai_roi_api?action=latest_snapshot
- Actions:
  - snapshot
- Acceptance criteria:
  - total value and annualized projection render from API response

## 29) Notifications page

- Legacy source: src/pages/Notifications.tsx
- Route: /notifications
- Target page id: rcm_notifications
- Experience: Agent Workspace
- Data resources:
  - x_rcm_notifications_api?action=list
  - x_rcm_notifications_api?action=summary
- Actions:
  - mark read
  - mark all read
  - seed demo (admin/integration only)
- Acceptance criteria:
  - all/unread/critical/claims/ai/deadlines filters behave as expected

## 30) Patient Portal page

- Legacy source: src/pages/PatientPortal.tsx
- Route: /patient-portal
- Target page id: rcm_patient_portal
- Experience: Employee Center
- Data resources:
  - x_rcm_patient_portal_api?action=patients
  - x_rcm_patient_portal_api?action=dashboard&patient_sys_id
- Actions:
  - send message
  - mark message read
- Acceptance criteria:
  - dashboard returns statements, payments, plans, messages, and totals

## 31) Auth page

- Legacy source: src/pages/Auth.tsx
- Route: /auth
- Target page id: native_login
- Experience: Platform login
- Implementation note:
  - Replace React auth UI with ServiceNow SSO/native auth policies.

## 32) Not Found page

- Legacy source: src/pages/NotFound.tsx
- Route: *
- Target behavior: workspace route fallback
- Implementation note:
  - Configure workspace navigation guards and fallback landing page.

## 33) Protected route and layout replacement

- Legacy files:
  - src/components/auth/ProtectedRoute.tsx
  - src/components/layout/AppLayout.tsx
- ServiceNow replacement:
  - role-based workspace menu and page ACL
  - experience-specific navigation and shell templates
- Acceptance criteria:
  - unauthorized users are denied at page and API layers
  - layout and nav render per assigned role and workspace

## Final completion gate for src replacement

All src/pages are considered replaced only when:

1. Corresponding workspace page id is implemented and role-tested.
2. API/action parity passes module ATF and role matrix ATF.
3. Legacy route is no longer production entry path.
