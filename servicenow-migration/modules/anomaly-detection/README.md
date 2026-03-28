# Module: Anomaly Detection

This module ports AI anomaly detection and fraud-prevention behavior into ServiceNow.

## Scope

- Trigger AI anomaly scan through integration bridge
- Return anomaly report with risk score, anomalies, summary, and recommendations
- Persist scan metadata if needed in operational logs

## Required tables

- x_rcm_nexus_anomaly_result
- x_rcm_nexus_ai_usage_log

## Required script include

- x_rcm_AnomalyService

## Required Scripted REST resource

- scripted-rest/x_rcm_anomaly_detection_api.js

## API usage

- POST action=run_scan with optional scan_type
- GET action=last_report
