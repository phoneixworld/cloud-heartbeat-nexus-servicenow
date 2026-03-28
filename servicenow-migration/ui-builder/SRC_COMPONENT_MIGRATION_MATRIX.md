# SRC and Components Migration Matrix

This matrix clarifies what has been completed for ServiceNow compatibility versus what still exists as legacy React source.

## Important interpretation

- Completed: ServiceNow-compatible module artifacts exist for business routes and server behavior.
- Not auto-converted: React TSX files in src/ are still legacy UI code and are not executable inside native ServiceNow runtime.

## Route/page parity status

| Legacy file | Route | ServiceNow module status | Notes |
|---|---|---|---|
| src/pages/Claims.tsx | /claims | Implemented | modules/core-claims |
| src/pages/Denials.tsx | /denials | Implemented | modules/denials |
| src/pages/Scrubbing.tsx | /scrubbing | Implemented | modules/scrubbing |
| src/pages/RTA.tsx | /rta | Implemented | modules/rta |
| src/pages/Batches.tsx | /batches | Implemented | modules/batches |
| src/pages/Analytics.tsx | /analytics | Implemented | modules/analytics |
| src/pages/Workloads.tsx | /workloads | Implemented | modules/workloads |
| src/pages/Reports.tsx | /reports | Implemented | modules/reports |
| src/pages/PaymentPosting.tsx | /payment-posting | Implemented | modules/payment-posting |
| src/pages/PayerContracts.tsx | /payer-contracts | Implemented | modules/payer-contracts |
| src/pages/ChargeCapture.tsx | /charge-capture | Implemented | modules/charge-capture |
| src/pages/PatientFinancial.tsx | /patient-financial | Implemented | modules/patient-financial |
| src/pages/RevenueIntelligence.tsx | /revenue-intelligence | Implemented | modules/revenue-intelligence |
| src/pages/Compliance.tsx | /compliance | Implemented | modules/compliance |
| src/pages/ExceptionTriage.tsx | /exception-triage | Implemented | modules/exception-triage |
| src/pages/TouchlessProcessing.tsx | /touchless-processing | Implemented | modules/touchless-processing |
| src/pages/SelfHealing.tsx | /self-healing | Implemented | modules/self-healing |
| src/pages/BehavioralBiometrics.tsx | /behavioral-biometrics | Implemented | modules/behavioral-biometrics |
| src/pages/ZeroTrustSecurity.tsx | /zero-trust | Implemented | modules/zero-trust |
| src/pages/DataResidency.tsx | /data-residency | Implemented | modules/data-residency |
| src/pages/IntegrationHub.tsx | /integrations | Implemented | modules/integrations |
| src/pages/AnomalyDetection.tsx | /anomaly-detection | Implemented | modules/anomaly-detection |
| src/pages/RevenueForecast.tsx | /revenue-forecast | Implemented | modules/revenue-forecast |
| src/pages/WorkflowOptimization.tsx | /workflow-optimization | Implemented | modules/workflow-optimization |
| src/pages/AIOperations.tsx | /ai-operations | Implemented | modules/ai-operations |
| src/pages/AIROIDashboard.tsx | /ai-roi | Implemented | modules/ai-roi |
| src/pages/Notifications.tsx | /notifications | Implemented | modules/notifications |
| src/pages/PatientPortal.tsx | /patient-portal | Implemented | modules/patient-portal |
| src/pages/Patients.tsx | /patients | Covered by core data model + service patterns | Add dedicated patient workspace build in Step 6 UX |
| src/pages/Index.tsx | / | Covered by workspace landing design | Implement as rcm_home in Step 6 UX |
| src/pages/Auth.tsx | /auth | Mapped to native ServiceNow auth/SSO | Replace with platform login policies |
| src/pages/NotFound.tsx | * | Workspace navigation fallback | Handle with workspace routing and ACL nav |

## Components and hooks status

| Legacy area | Compatibility status | Migration target |
|---|---|---|
| src/components/auth/* | Not directly portable | ServiceNow auth/roles/ACL + workspace route guards |
| src/components/layout/* | Not directly portable | UI Builder page templates and workspace shell |
| src/components/ui/* | Not directly portable | Now Experience components/UI Builder widgets |
| src/components/claims/* | Behavior covered | Module APIs + workspace claim pages |
| src/components/notifications/* | Behavior covered | modules/notifications + workspace notifications page |
| src/components/scrubbing/* | Behavior covered | modules/scrubbing + workspace scrub views |
| src/components/ai/* | Behavior covered | AI modules + integration actions |
| src/hooks/use*.ts* | Not directly portable | Script Includes + Scripted REST + Flow Designer |
| src/integrations/supabase/* | Transitional bridge only | IntegrationHub and platform-managed credentials |

## Definition of complete conversion

Conversion is complete when both are true:

1. ServiceNow side: all module APIs, ACLs, workspace pages, and ATF are live in instance.
2. Legacy side: src/pages, src/components, src/hooks, and supabase runtime are decommissioned per decommission docs.

## Current state

- Repository artifact conversion for business modules: complete.
- Full runtime conversion (native ServiceNow UI replacing src/ execution): pending Step 6 instance UX build and Step 7 decommission.
