# Module: Revenue Forecast

This module ports AI revenue forecasting behavior into ServiceNow.

## Scope

- Generate 30/90 day forecasts via AI integration
- Return risk scenarios and optimization opportunities
- Return key metrics assessment trends and overall health
- Keep latest forecast payload for dashboard retrieval

## Required tables

- x_rcm_nexus_revenue_forecast
- x_rcm_nexus_ai_usage_log

## Required script include

- x_rcm_RevenueForecastService

## Required Scripted REST resource

- scripted-rest/x_rcm_revenue_forecast_api.js

## API usage

- POST action=generate with optional period
- GET action=last_forecast
