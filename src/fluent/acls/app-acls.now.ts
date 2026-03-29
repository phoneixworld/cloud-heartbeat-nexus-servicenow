import '@servicenow/sdk/global'
import { AclRule } from '@servicenow/sdk/core'

// Table-level ACLs for x_rcm_nexus scope

// Claims table ACLs
AclRule({
    $id: Now.ID['acl_claim_read_all'],
    table: 'x_rcm_nexus_claim',
    operation: 'read',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor', 'x_rcm_nexus.agent', 'x_rcm_nexus.audit'],
})

AclRule({
    $id: Now.ID['acl_claim_create_supervisor'],
    table: 'x_rcm_nexus_claim',
    operation: 'create',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor'],
})

AclRule({
    $id: Now.ID['acl_claim_write_supervisor'],
    table: 'x_rcm_nexus_claim',
    operation: 'write',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor'],
})

AclRule({
    $id: Now.ID['acl_claim_delete_admin'],
    table: 'x_rcm_nexus_claim',
    operation: 'delete',
    grantedBy: ['x_rcm_nexus.admin'],
})

// Denials table ACLs
AclRule({
    $id: Now.ID['acl_denial_read_all'],
    table: 'x_rcm_nexus_denial',
    operation: 'read',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor', 'x_rcm_nexus.agent', 'x_rcm_nexus.audit'],
})

AclRule({
    $id: Now.ID['acl_denial_create_supervisor'],
    table: 'x_rcm_nexus_denial',
    operation: 'create',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor'],
})

// Scrubbing tables ACLs
AclRule({
    $id: Now.ID['acl_scrub_rule_read_all'],
    table: 'x_rcm_nexus_scrub_rule',
    operation: 'read',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor', 'x_rcm_nexus.agent'],
})

AclRule({
    $id: Now.ID['acl_scrub_rule_write_supervisor'],
    table: 'x_rcm_nexus_scrub_rule',
    operation: 'write',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor'],
})

AclRule({
    $id: Now.ID['acl_scrub_result_read_all'],
    table: 'x_rcm_nexus_scrub_result',
    operation: 'read',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor', 'x_rcm_nexus.agent'],
})

// RTA table ACLs
AclRule({
    $id: Now.ID['acl_rta_read_all'],
    table: 'x_rcm_nexus_rta',
    operation: 'read',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor', 'x_rcm_nexus.agent'],
})

AclRule({
    $id: Now.ID['acl_rta_create_supervisor'],
    table: 'x_rcm_nexus_rta',
    operation: 'create',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor'],
})

// Payment Posting table ACLs
AclRule({
    $id: Now.ID['acl_payment_posting_read_all'],
    table: 'x_rcm_nexus_payment_posting',
    operation: 'read',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor', 'x_rcm_nexus.agent', 'x_rcm_nexus.audit'],
})

AclRule({
    $id: Now.ID['acl_payment_posting_create_supervisor'],
    table: 'x_rcm_nexus_payment_posting',
    operation: 'create',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor'],
})

// Patient table ACLs
AclRule({
    $id: Now.ID['acl_patient_read_all'],
    table: 'x_rcm_nexus_patient',
    operation: 'read',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor', 'x_rcm_nexus.agent'],
})

// Payer table ACLs
AclRule({
    $id: Now.ID['acl_payer_read_all'],
    table: 'x_rcm_nexus_payer',
    operation: 'read',
    grantedBy: ['x_rcm_nexus.admin', 'x_rcm_nexus.supervisor', 'x_rcm_nexus.agent', 'x_rcm_nexus.integration'],
})

AclRule({
    $id: Now.ID['acl_payer_write_admin'],
    table: 'x_rcm_nexus_payer',
    operation: 'write',
    grantedBy: ['x_rcm_nexus.admin'],
})
