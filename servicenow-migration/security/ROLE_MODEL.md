# ServiceNow Role Model (Core RCM)

Scoped app prefix: x_rcm_nexus

## Roles

- x_rcm_nexus.admin: full app administration
- x_rcm_nexus.supervisor: cross-team operational oversight
- x_rcm_nexus.agent: day-to-day operational access
- x_rcm_nexus.ai_ops: AI operations and governance
- x_rcm_nexus.audit: read-only compliance and audit access
- x_rcm_nexus.integration: machine/integration account role

## Suggested inheritance

- x_rcm_nexus.admin includes supervisor, agent, ai_ops, audit
- x_rcm_nexus.supervisor includes agent

## Separation of duties

- ai_ops should not have broad claim edit rights by default
- audit should have read-only access and no API write rights
- integration should only access specific endpoints/tables needed for integrations

## Group mapping example

- RCM_Admins -> x_rcm_nexus.admin
- RCM_Supervisors -> x_rcm_nexus.supervisor
- RCM_Agents -> x_rcm_nexus.agent
- RCM_AI_Ops -> x_rcm_nexus.ai_ops
- RCM_Auditors -> x_rcm_nexus.audit
- RCM_Integrations -> x_rcm_nexus.integration
