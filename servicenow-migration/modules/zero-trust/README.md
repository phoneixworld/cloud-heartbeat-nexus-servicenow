# Module: Zero Trust

This module ports zero-trust security posture behavior from the legacy application into ServiceNow.

## Scope

- Security overview metrics from audit and role/user assignment data
- Hash-chain integrity verification
- Compliance matrix/status payload for governance dashboards
- MFA and encryption posture metadata endpoints

## Required tables

- x_rcm_nexus_claim_audit_log
- x_rcm_nexus_user_role
- x_rcm_nexus_profile

## Required script include

- x_rcm_ZeroTrustService

## Required Scripted REST resource

- scripted-rest/x_rcm_zero_trust_api.js

## API usage

- GET action=overview
- GET action=compliance_matrix
- GET action=mfa_methods
- GET action=encryption_posture
