# Migration Blueprint: React/Supabase to ServiceNow

## Current state summary

The current app is a large SPA with many domain modules and direct Supabase usage in pages/hooks.

Key traits:

- UI: React + Vite + TypeScript + Tailwind + shadcn
- Routing: BrowserRouter with 30+ routes
- Data/Auth/API: Supabase client used directly in frontend
- AI: Supabase Edge Functions for prediction, anomaly detection, workflow optimization, and coding support

This architecture is not directly portable to native ServiceNow runtime. A structured migration is required.

## Migration strategy

Use a strangler pattern in 4 tracks that can run in parallel:

1. Data track: create custom tables and migrate core records
2. Logic track: move hooks/business logic into Script Includes + Business Rules + Flow Designer
3. UX track: recreate route-level pages in Workspace/UI Builder components
4. Integration track: replace Supabase edge function invocations with IntegrationHub actions or Scripted REST endpoints

## Phase plan

### Phase 0: Foundation (1-2 weeks)

- Create scoped app x_rcm_nexus
- Define table prefixes and naming standards
- Set up roles, groups, ACL baseline
- Create CI/CD path (App Repo or update sets + source control)

Exit criteria:

- Scoped app deployable from non-prod to prod
- Security baseline approved

### Phase 1: Core domain migration (2-4 weeks)

- Tables: claims, patients, payers, denial workflows, payments, scrub results
- Services: CRUD and state transition Script Includes
- UI: Claims, Patients, Denials, Payment Posting pages

Exit criteria:

- Core workflows can be executed fully in ServiceNow
- No frontend direct dependency on Supabase for core modules

### Phase 2: Intelligence and automation (2-4 weeks)

- Port AI hooks to IntegrationHub actions
- Recreate RTA and scrubbing orchestration in Flow Designer
- Add anomaly and forecast jobs as scheduled data collection and analysis flows

Exit criteria:

- At least 3 AI-driven flows active in ServiceNow
- AI operations logs persisted in ServiceNow tables

### Phase 3: Governance and hardening (1-2 weeks)

- PHI-sensitive ACL validation
- Audit and immutable tracking patterns
- ATF test coverage for critical paths
- Performance and observability dashboard

Exit criteria:

- Compliance and security sign-off
- Production readiness checklist completed

## Route grouping for migration order

Priority 1:

- /claims
- /patients
- /denials
- /scrubbing
- /payment-posting

Priority 2:

- /rta
- /workloads
- /reports
- /payer-contracts
- /patient-financial

Priority 3:

- /revenue-intelligence
- /exception-triage
- /touchless-processing
- /self-healing
- /behavioral-biometrics
- /zero-trust
- /data-residency
- /integrations
- /anomaly-detection
- /revenue-forecast
- /workflow-optimization
- /ai-operations
- /ai-roi
- /notifications
- /patient-portal

## Technical translation rules

- React hook side effects -> Script Include methods + Flow Designer actions
- Supabase table operations -> GlideRecord with domain service wrappers
- Supabase auth -> ServiceNow users/roles/ACL and SSO plugin strategy
- Edge function call -> IntegrationHub action or Scripted REST API
- Toast/UX notifications -> UI Notification, activity stream updates, and event queue notifications

## Risks and mitigations

Risk: feature loss from UI rewrite
Mitigation: migrate by route and validate behavior parity with acceptance tests

Risk: AI latency and external dependency
Mitigation: async queue model with worker flow + retries + dead-letter table

Risk: security regression around PHI data
Mitigation: table/field ACL matrix and automated ACL test suite in ATF

## Definition of done for full migration

- All business-critical routes available in ServiceNow workspace
- 0 direct dependency on Supabase in production path
- All required AI services callable through ServiceNow integration layer
- Data retention and audit requirements met
- Runbook and support documentation complete
