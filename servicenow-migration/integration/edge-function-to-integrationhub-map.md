# Supabase Edge Function to ServiceNow IntegrationHub Map

Map each existing function to an IntegrationHub action (or Scripted REST backend).

| Supabase function | ServiceNow action name | Input | Output | Retry policy |
|---|---|---|---|---|
| scrub-claim | RCM Scrub Claim | claim_id | rule violations, severity, auto-corrections | 3 retries, exponential backoff |
| ai-denial-prediction | RCM Denial Prediction | claim summary | risk score, risk tier, explanations | 2 retries |
| ai-anomaly-detection | RCM Anomaly Detection | claim/payment stream batch | anomaly flags and confidence | 3 retries |
| ai-appeal-generator | RCM Appeal Draft | denial context, policy text | appeal letter draft | 2 retries |
| ai-payment-intelligence | RCM Payment Intelligence | payment history | expected payment range, variance flags | 2 retries |
| ai-rcm-copilot | RCM Copilot Assistant | prompt + context references | answer + citations + confidence | 1 retry |
| ai-revenue-forecast | RCM Revenue Forecast | trend time series | forecast points and confidence bands | 2 retries |
| ai-rta-prediction | RCM RTA Prediction | claim + payer context | approval likelihood and expected reimbursement | 2 retries |
| ai-workflow-optimization | RCM Workflow Optimization | queue metrics | recommendation set | 2 retries |
| ai-coding-suggestions | RCM Internal Coding Suggestion | coding context | suggested code actions | 1 retry |

## Logging standard

For every invocation, persist into x_rcm_nexus_ai_usage_log:

- u_action_name
- u_request_id
- u_status
- u_latency_ms
- u_model_name
- u_input_size
- u_output_size
- u_error_message

## Security standard

- Secrets only in Credential records/System Properties
- No PHI in plaintext outbound logs
- Hash or tokenize patient identifiers before external calls where possible
