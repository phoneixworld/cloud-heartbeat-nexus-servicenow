# UI Builder Execution Tracker

Use this tracker to execute Step 6 page replacement work in a controlled way.

## Status values

- Not Started
- In Progress
- Blocked
- Ready for QA
- QA Passed
- Ready for Go-Live
- Live

## Evidence requirements per row

- Build evidence: page screenshot or workspace URL
- API evidence: request/response capture for key actions
- Security evidence: role-based access test result
- QA evidence: ATF run or test case result IDs

## Tracker table

| ID | Legacy Source | Route | Target Page ID | Experience | Primary API/Resource | Owner | Status | Build Evidence | API Evidence | Security Evidence | QA Evidence | Go-Live Gate |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | src/pages/Index.tsx | / | rcm_home | Agent Workspace | claims stats, denials stats, analytics overview | TBD | Not Started |  |  |  |  |  |
| 2 | src/pages/Claims.tsx | /claims | rcm_claims | Agent Workspace | x_rcm_claims_api | TBD | Not Started |  |  |  |  |  |
| 3 | src/pages/Patients.tsx | /patients | rcm_patients | Agent Workspace | patient list + related APIs | TBD | Not Started |  |  |  |  |  |
| 4 | src/pages/Denials.tsx | /denials | rcm_denials | Agent Workspace | x_rcm_denials_api | TBD | Not Started |  |  |  |  |  |
| 5 | src/pages/Scrubbing.tsx | /scrubbing | rcm_scrubbing | Agent Workspace | x_rcm_scrubbing_api | TBD | Not Started |  |  |  |  |  |
| 6 | src/pages/Batches.tsx | /batches | rcm_batches | Agent Workspace | x_rcm_batches_api | TBD | Not Started |  |  |  |  |  |
| 7 | src/pages/RTA.tsx | /rta | rcm_rta | Agent Workspace | x_rcm_rta_api | TBD | Not Started |  |  |  |  |  |
| 8 | src/pages/Analytics.tsx | /analytics | rcm_analytics | Agent Workspace | x_rcm_analytics_api | TBD | Not Started |  |  |  |  |  |
| 9 | src/pages/Workloads.tsx | /workloads | rcm_workloads | Agent Workspace | x_rcm_workloads_api | TBD | Not Started |  |  |  |  |  |
| 10 | src/pages/Reports.tsx | /reports | rcm_reports | Agent Workspace | x_rcm_reports_api | TBD | Not Started |  |  |  |  |  |
| 11 | src/pages/PaymentPosting.tsx | /payment-posting | rcm_payment_posting | Agent Workspace | x_rcm_payment_posting_api | TBD | Not Started |  |  |  |  |  |
| 12 | src/pages/PayerContracts.tsx | /payer-contracts | rcm_payer_contracts | Agent Workspace | x_rcm_payer_contracts_api | TBD | Not Started |  |  |  |  |  |
| 13 | src/pages/ChargeCapture.tsx | /charge-capture | rcm_charge_capture | Agent Workspace | x_rcm_charge_capture_api | TBD | Not Started |  |  |  |  |  |
| 14 | src/pages/PatientFinancial.tsx | /patient-financial | rcm_patient_financial | Agent Workspace | x_rcm_patient_financial_api | TBD | Not Started |  |  |  |  |  |
| 15 | src/pages/RevenueIntelligence.tsx | /revenue-intelligence | rcm_revenue_intelligence | Agent Workspace | x_rcm_revenue_intelligence_api | TBD | Not Started |  |  |  |  |  |
| 16 | src/pages/Compliance.tsx | /compliance | rcm_compliance | Agent Workspace | x_rcm_compliance_api | TBD | Not Started |  |  |  |  |  |
| 17 | src/pages/ExceptionTriage.tsx | /exception-triage | rcm_exception_triage | Agent Workspace | x_rcm_exception_triage_api | TBD | Not Started |  |  |  |  |  |
| 18 | src/pages/TouchlessProcessing.tsx | /touchless-processing | rcm_touchless_processing | Agent Workspace | x_rcm_touchless_processing_api | TBD | Not Started |  |  |  |  |  |
| 19 | src/pages/SelfHealing.tsx | /self-healing | rcm_self_healing | Agent Workspace | x_rcm_self_healing_api | TBD | Not Started |  |  |  |  |  |
| 20 | src/pages/BehavioralBiometrics.tsx | /behavioral-biometrics | rcm_behavioral_biometrics | Agent Workspace | x_rcm_behavioral_biometrics_api | TBD | Not Started |  |  |  |  |  |
| 21 | src/pages/ZeroTrustSecurity.tsx | /zero-trust | rcm_zero_trust | Agent Workspace | x_rcm_zero_trust_api | TBD | Not Started |  |  |  |  |  |
| 22 | src/pages/DataResidency.tsx | /data-residency | rcm_data_residency | Agent Workspace | x_rcm_data_residency_api | TBD | Not Started |  |  |  |  |  |
| 23 | src/pages/IntegrationHub.tsx | /integrations | rcm_integrations | Admin Workspace | x_rcm_integrations_api | TBD | Not Started |  |  |  |  |  |
| 24 | src/pages/AnomalyDetection.tsx | /anomaly-detection | rcm_anomaly_detection | Agent Workspace | x_rcm_anomaly_detection_api | TBD | Not Started |  |  |  |  |  |
| 25 | src/pages/RevenueForecast.tsx | /revenue-forecast | rcm_revenue_forecast | Agent Workspace | x_rcm_revenue_forecast_api | TBD | Not Started |  |  |  |  |  |
| 26 | src/pages/WorkflowOptimization.tsx | /workflow-optimization | rcm_workflow_optimization | Agent Workspace | x_rcm_workflow_optimization_api | TBD | Not Started |  |  |  |  |  |
| 27 | src/pages/AIOperations.tsx | /ai-operations | rcm_ai_operations | Admin Workspace | x_rcm_ai_operations_api | TBD | Not Started |  |  |  |  |  |
| 28 | src/pages/AIROIDashboard.tsx | /ai-roi | rcm_ai_roi | Admin Workspace | x_rcm_ai_roi_api | TBD | Not Started |  |  |  |  |  |
| 29 | src/pages/Notifications.tsx | /notifications | rcm_notifications | Agent Workspace | x_rcm_notifications_api | TBD | Not Started |  |  |  |  |  |
| 30 | src/pages/PatientPortal.tsx | /patient-portal | rcm_patient_portal | Employee Center | x_rcm_patient_portal_api | TBD | Not Started |  |  |  |  |  |
| 31 | src/pages/Auth.tsx | /auth | native_login | Platform Login | SSO/native auth | TBD | Not Started |  |  |  |  |  |
| 32 | src/pages/NotFound.tsx | * | workspace_fallback | Workspace routing | route fallback config | TBD | Not Started |  |  |  |  |  |
| 33 | src/components/auth/ProtectedRoute.tsx | protected wrapper | role_acl_guard | Workspace access control | role/ACL policies | TBD | Not Started |  |  |  |  |  |
| 34 | src/components/layout/AppLayout.tsx | app shell | workspace_shell | Workspace layout | navigation config | TBD | Not Started |  |  |  |  |  |

## Recommended execution order

1. Rows 2 to 7 (core transaction flow)
2. Rows 11 to 14 (financial operations)
3. Rows 8 to 10 and 15 to 18 (analytics and intelligence)
4. Rows 19 to 23 (automation and platform)
5. Rows 24 to 30 (AI governance and engagement)
6. Rows 1, 31, 32, 33, 34 (home/auth/fallback/shell finalization)

## Completion definition for this tracker

A row is complete only when:

1. Status is Live.
2. Build/API/Security/QA evidence columns are populated.
3. Go-Live Gate is explicitly marked Pass.
