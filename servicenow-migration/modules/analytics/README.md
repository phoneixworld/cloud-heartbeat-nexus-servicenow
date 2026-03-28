# Module: Analytics

This module ports the revenue intelligence analytics behavior from the legacy dashboard.

## Scope

- Claims status distribution
- Denial category and group code analytics
- KPI cards: total claims, pending amount, avg days in AR, collection rate
- Benchmark comparison dataset
- Revenue impact simulation values

## Required tables

- x_rcm_nexus_claim
- x_rcm_nexus_denial_workflow

## Required script include

- x_rcm_AnalyticsService

## Required Scripted REST resource

- scripted-rest/x_rcm_analytics_api.js

## API usage

- GET action=overview
- GET action=denials
- GET action=benchmark
- GET action=simulator
