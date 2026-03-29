import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

Role({
    $id: Now.ID['rcm_admin_role'],
    name: 'x_rcm_nexus.admin',
    description: 'Full administrative access to all Cloud Heartbeat Nexus features',
})

Role({
    $id: Now.ID['rcm_supervisor_role'],
    name: 'x_rcm_nexus.supervisor',
    description: 'Supervisory access to claims, denials, and team management',
})

Role({
    $id: Now.ID['rcm_agent_role'],
    name: 'x_rcm_nexus.agent',
    description: 'Standard user access for claim processing and workflow',
})

Role({
    $id: Now.ID['rcm_ai_ops_role'],
    name: 'x_rcm_nexus.ai_ops',
    description: 'AI operations and automation configuration access',
})

Role({
    $id: Now.ID['rcm_audit_role'],
    name: 'x_rcm_nexus.audit',
    description: 'Read-only audit and compliance reporting access',
})

Role({
    $id: Now.ID['rcm_integration_role'],
    name: 'x_rcm_nexus.integration',
    description: 'API and integration access for external systems',
})