# Supabase to ServiceNow Table Mapping

Use scoped table prefix x_rcm_nexus_.

| Supabase table | ServiceNow target table | Notes |
|---|---|---|
| claims | x_rcm_nexus_claim | Core claim record; include status, amounts, DOS, payer/patient refs |
| claim_line_items | x_rcm_nexus_claim_line_item | Child table referencing claim |
| patients | x_rcm_nexus_patient | Keep MRN indexed, PHI fields encrypted where needed |
| payers | x_rcm_nexus_payer | Contract and denial-rate metrics |
| denial_workflows | x_rcm_nexus_denial_workflow | Appeals lifecycle + owner/work notes |
| patient_payments | x_rcm_nexus_patient_payment | Payment posting transactions |
| patient_payment_plans | x_rcm_nexus_payment_plan | Installments and status |
| scrub_rules | x_rcm_nexus_scrub_rule | Rule metadata and severity |
| scrub_results | x_rcm_nexus_scrub_result | Rule outcomes per claim |
| rta_transactions | x_rcm_nexus_rta_txn | Response payload + auth + timestamps |
| payer_rta_config | x_rcm_nexus_payer_rta_config | Endpoint/config setup per payer |
| compliance_checks | x_rcm_nexus_compliance_check | HIPAA/compliance result snapshots |
| ai_usage_logs | x_rcm_nexus_ai_usage_log | Cost, latency, outcome metrics |
| ai_feedback | x_rcm_nexus_ai_feedback | Human feedback loop |
| ml_predictions | x_rcm_nexus_ml_prediction | Inference outputs |
| automation_rules | x_rcm_nexus_automation_rule | Autonomous rules and flags |
| automation_executions | x_rcm_nexus_automation_execution | Rule execution audit |
| integration_configs | x_rcm_nexus_integration_config | Endpoint + auth metadata |
| data_residency_configs | x_rcm_nexus_data_residency_cfg | Regional residency controls |
| claim_audit_log | x_rcm_nexus_claim_audit_log | Immutable audit pattern recommended |
| user_roles | x_rcm_nexus_user_role | Prefer native role model where possible |
| profiles | x_rcm_nexus_profile | Map minimally; prefer sys_user extension |
| session_events | x_rcm_nexus_session_event | Behavioral analytics telemetry |
| patient_portal_messages | x_rcm_nexus_portal_message | Patient-provider communication |
| stp_pipeline_runs | x_rcm_nexus_stp_run | Touchless processing metrics |

## Data type guidance

- UUID -> String(36) or GUID field strategy
- numeric money fields -> Decimal with currency-aware patterns if needed
- JSON payloads -> JSON field or string with schema validation
- created_at/updated_at -> sys_created_on/sys_updated_on where equivalent

## Index guidance

Create indexes for:

- claim number
- patient MRN
- payer id
- claim status
- denial category
- created date for large log tables

## Security guidance

- ACL by role and by assignment for claim/denial tables
- Encrypt PHI columns at rest if policy requires
- Mask sensitive fields in list views for non-privileged roles
