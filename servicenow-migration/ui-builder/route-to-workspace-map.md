# Route to ServiceNow Workspace Mapping

This is a migration map from SPA routes to workspace pages/experiences.

| React route | Suggested ServiceNow page id | Experience | Notes |
|---|---|---|---|
| / | rcm_home | Agent Workspace | KPI home with role-aware widgets |
| /claims | rcm_claims | Agent Workspace | List + form + actions |
| /patients | rcm_patients | Agent Workspace | List + patient profile record page |
| /denials | rcm_denials | Agent Workspace | Queue + triage panel |
| /scrubbing | rcm_scrubbing | Agent Workspace | Rule mgmt + run results |
| /batches | rcm_batches | Agent Workspace | Batch operations |
| /rta | rcm_rta | Agent Workspace | Eligibility and auth status |
| /analytics | rcm_analytics | Agent Workspace | Aggregated reporting widgets |
| /workloads | rcm_workloads | Agent Workspace | Work assignment boards |
| /reports | rcm_reports | Agent Workspace | Report Library links |
| /payment-posting | rcm_payment_posting | Agent Workspace | Payment import and posting |
| /payer-contracts | rcm_payer_contracts | Agent Workspace | Contract lifecycle |
| /charge-capture | rcm_charge_capture | Agent Workspace | Capture and review |
| /patient-financial | rcm_patient_financial | Agent Workspace | Plans, balances, collections |
| /revenue-intelligence | rcm_revenue_intelligence | Agent Workspace | Revenue dashboard |
| /compliance | rcm_compliance | Agent Workspace | Compliance monitor |
| /exception-triage | rcm_exception_triage | Agent Workspace | Exceptions queue |
| /touchless-processing | rcm_touchless_processing | Agent Workspace | STP execution dashboard |
| /self-healing | rcm_self_healing | Agent Workspace | Automation rules and outcomes |
| /behavioral-biometrics | rcm_behavioral_biometrics | Agent Workspace | Risk signal viewer |
| /zero-trust | rcm_zero_trust | Agent Workspace | Access posture dashboard |
| /data-residency | rcm_data_residency | Agent Workspace | Regional policy controls |
| /integrations | rcm_integrations | Admin Workspace | Integration config center |
| /anomaly-detection | rcm_anomaly_detection | Agent Workspace | Alerts and review |
| /revenue-forecast | rcm_revenue_forecast | Agent Workspace | Forecast charts |
| /workflow-optimization | rcm_workflow_optimization | Agent Workspace | Throughput optimization |
| /ai-operations | rcm_ai_operations | Admin Workspace | AI usage, spend, governance |
| /ai-roi | rcm_ai_roi | Admin Workspace | KPI and ROI dashboard |
| /notifications | rcm_notifications | Agent Workspace | Notification stream |
| /patient-portal | rcm_patient_portal | Employee Center | External-facing patient workflows |
| /auth | native_login | Platform login | Use ServiceNow auth/SSO |

## Practical note

Not every route should become a separate page. Several can be merged into tabbed workspaces to reduce maintenance.
