import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

Role({
    $id: Now.ID['rcm_nexus_admin_role'],
    name: 'x_rcm_nexus.admin',
    description: 'Bootstrap admin role for Cloud Heartbeat Nexus',
})