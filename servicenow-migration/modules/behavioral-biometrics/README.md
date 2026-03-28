# Module: Behavioral Biometrics

This module ports behavioral biometrics and user behavior analytics (UBA) behavior into ServiceNow.

## Scope

- Session events feed
- UBA metrics: sessions, anomalies, users, PHI accesses, average risk
- Risk/activity trend dataset
- Top users by PHI access and IP analysis
- Recent audit activity feed

## Required tables

- x_rcm_nexus_session_event
- x_rcm_nexus_claim_audit_log

## Required script include

- x_rcm_BehavioralService

## Required Scripted REST resource

- scripted-rest/x_rcm_behavioral_biometrics_api.js

## API usage

- GET action=session_events
- GET action=metrics
- GET action=risk_trend
- GET action=ip_analysis
- GET action=recent_audit
