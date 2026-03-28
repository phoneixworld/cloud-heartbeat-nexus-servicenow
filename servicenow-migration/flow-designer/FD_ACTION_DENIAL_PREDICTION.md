# Flow Designer Action Spec: RCM Denial Prediction

Action name: RCM Denial Prediction
Scope: x_rcm_nexus

## Inputs

- claim_sys_id (String, required)
- model_version (String, optional)

## Steps

1. Retrieve claim + payer context
2. Build normalized model input payload
3. Call IntegrationHub action mapped to denial prediction service
4. Persist result to x_rcm_nexus_ml_prediction
5. Optionally update claim risk fields
6. Add AI usage log row in x_rcm_nexus_ai_usage_log

## Outputs

- ok (Boolean)
- risk_score (Decimal)
- risk_level (String)
- reasoning (String)

## Error handling

- Log failure details into ai usage log
- Return ok=false with non-sensitive error text
- Create work item in exception queue for repeated failures

## Retry policy

- 2 retries
- Backoff: 30s, 2m
