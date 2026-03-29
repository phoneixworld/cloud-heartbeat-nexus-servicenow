import '@servicenow/sdk/global'
import { ApplicationMenu, Record } from '@servicenow/sdk/core'

export const rcmAppMenu = ApplicationMenu({
    $id: Now.ID['rcm_app_menu'],
    title: 'Cloud Heartbeat Nexus',
    active: true,
    order: 200,
    description: 'RCM operations and claims management platform',
    category: '',
})

// Home module
Record({
    $id: Now.ID['rcm_home_module'],
    table: 'sys_app_module',
    data: {
        title: 'Dashboard',
        name: 'rcm_home',
        application: rcmAppMenu,
        link_type: 'DIRECT',
        link: 'x_rcm_nexus_dashboard',
        active: true,
        order: 10,
        override_menu_roles: false,
    },
})

// Claims module
Record({
    $id: Now.ID['rcm_claims_module'],
    table: 'sys_app_module',
    data: {
        title: 'Claims',
        name: 'rcm_claims',
        application: rcmAppMenu,
        link_type: 'QUERY_STRING',
        query_string: 'sysparm_table=x_rcm_nexus_claim&sysparm_view=list',
        active: true,
        order: 20,
        override_menu_roles: false,
    },
})

// Denials module
Record({
    $id: Now.ID['rcm_denials_module'],
    table: 'sys_app_module',
    data: {
        title: 'Denials',
        name: 'rcm_denials',
        application: rcmAppMenu,
        link_type: 'QUERY_STRING',
        query_string: 'sysparm_table=x_rcm_nexus_denial&sysparm_view=list',
        active: true,
        order: 30,
        override_menu_roles: false,
    },
})

// Scrubbing module
Record({
    $id: Now.ID['rcm_scrubbing_module'],
    table: 'sys_app_module',
    data: {
        title: 'Scrubbing',
        name: 'rcm_scrubbing',
        application: rcmAppMenu,
        link_type: 'QUERY_STRING',
        query_string: 'sysparm_table=x_rcm_nexus_scrub_rule&sysparm_view=list',
        active: true,
        order: 40,
        override_menu_roles: false,
    },
})

// RTA module
Record({
    $id: Now.ID['rcm_rta_module'],
    table: 'sys_app_module',
    data: {
        title: 'RTA',
        name: 'rcm_rta',
        application: rcmAppMenu,
        link_type: 'QUERY_STRING',
        query_string: 'sysparm_table=x_rcm_nexus_rta&sysparm_view=list',
        active: true,
        order: 50,
        override_menu_roles: false,
    },
})

// Payments module
Record({
    $id: Now.ID['rcm_payments_module'],
    table: 'sys_app_module',
    data: {
        title: 'Payment Posting',
        name: 'rcm_payments',
        application: rcmAppMenu,
        link_type: 'QUERY_STRING',
        query_string: 'sysparm_table=x_rcm_nexus_payment_posting&sysparm_view=list',
        active: true,
        order: 60,
        override_menu_roles: false,
    },
})

// Patients module
Record({
    $id: Now.ID['rcm_patients_module'],
    table: 'sys_app_module',
    data: {
        title: 'Patients',
        name: 'rcm_patients',
        application: rcmAppMenu,
        link_type: 'QUERY_STRING',
        query_string: 'sysparm_table=x_rcm_nexus_patient&sysparm_view=list',
        active: true,
        order: 70,
        override_menu_roles: false,
    },
})

// Configuration module
Record({
    $id: Now.ID['rcm_config_module'],
    table: 'sys_app_module',
    data: {
        title: 'Configuration',
        name: 'rcm_config',
        application: rcmAppMenu,
        link_type: 'DIRECT',
        link: 'x_rcm_nexus_config',
        active: true,
        order: 100,
        override_menu_roles: false,
    },
})
