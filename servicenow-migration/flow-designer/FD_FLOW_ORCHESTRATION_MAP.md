# Flow Orchestration Map

This map shows when to call each action and how to chain them.

## Flow 1: Claim Submission Pipeline

Trigger:
- Claim status changes to submitted

Sequence:
1. RCM Scrub Claim
2. If scrub errors > 0 then assign exception queue and stop
3. RCM Denial Prediction
4. If risk high then route to denial-prevention work queue
5. If payer eligible then RCM Submit RTA

## Flow 2: Nightly Quality Sweep

Trigger:
- Scheduled nightly

Sequence:
1. Query claims updated last 24h
2. Run RCM Denial Prediction in batch
3. Persist model outputs and KPI summary rows
4. Notify supervisors with high-risk summary

## Flow 3: RTA Retry Worker

Trigger:
- Event x_rcm_nexus.rta.retry

Sequence:
1. Load failed transaction context
2. Re-run RCM Submit RTA
3. If still failed after threshold, create exception task

## Observability

For each flow run, store:
- execution id
- claim sys id
- step latency
- status
- error classification
