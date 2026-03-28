# Module: Touchless Processing

This module ports straight-through processing (STP) pipeline monitoring behavior from the legacy application into ServiceNow.

## Scope

- Compute STP metrics from pipeline runs and claim state
- Return stage-level touchless rates
- Return processing breakdown and recent run feed
- Return manual-attention claims list

## Required tables

- x_rcm_nexus_stp_run
- x_rcm_nexus_claim

## Required script include

- x_rcm_StpService

## Required Scripted REST resource

- scripted-rest/x_rcm_touchless_processing_api.js

## API usage

- GET action=metrics
- GET action=stage_breakdown
- GET action=processing_breakdown
- GET action=recent_runs
- GET action=manual_claims
