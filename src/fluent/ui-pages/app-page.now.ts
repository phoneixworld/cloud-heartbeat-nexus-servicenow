import '@servicenow/sdk/global'

// Placeholder UI pages for each major section
// These will be filled in by the IDE with actual UI Builder components

export const uiPages = {
    dashboard: {
        name: 'rcm_dashboard',
        title: 'Cloud Heartbeat Nexus Dashboard',
        description: 'Main dashboard showing KPIs and metrics',
        modules: ['claims', 'denials', 'payment_posting'],
    },
    claims: {
        name: 'rcm_claims_list',
        title: 'Claims Management',
        description: 'View, filter, and manage claim records',
        dataTable: 'x_rcm_nexus_claim',
        columns: ['claim_number', 'patient_name', 'claim_amount', 'status'],
        actions: ['create', 'view', 'edit', 'delete'],
    },
    claimDetail: {
        name: 'rcm_claim_detail',
        title: 'Claim Details',
        description: 'Detailed view of a single claim with related records',
        dataTable: 'x_rcm_nexus_claim',
        relatedTables: ['x_rcm_nexus_denial', 'x_rcm_nexus_scrub_result', 'x_rcm_nexus_rta'],
    },
    denials: {
        name: 'rcm_denials_list',
        title: 'Denials Management',
        description: 'View and manage denial records and appeals',
        dataTable: 'x_rcm_nexus_denial',
        columns: ['denial_code', 'denial_reason', 'appeal_status', 'denial_date'],
        actions: ['create', 'view', 'edit'],
    },
    scrubbing: {
        name: 'rcm_scrubbing_list',
        title: 'Billing Scrubbing',
        description: 'Manage scrubbing rules and review results',
        dataTable: 'x_rcm_nexus_scrub_rule',
        columns: ['rule_name', 'rule_type', 'severity', 'active'],
        actions: ['create', 'view', 'edit'],
    },
    rta: {
        name: 'rcm_rta_list',
        title: 'Real-Time Assessment',
        description: 'RTA submissions and responses',
        dataTable: 'x_rcm_nexus_rta',
        columns: ['claim_id', 'submission_date', 'rta_status', 'response_amount'],
        actions: ['create', 'view'],
    },
    payments: {
        name: 'rcm_payments_list',
        title: 'Payment Posting',
        description: 'Payment posting and reconciliation',
        dataTable: 'x_rcm_nexus_payment_posting',
        columns: ['claim_id', 'payment_amount', 'posting_date', 'reference_number'],
        actions: ['create', 'view'],
    },
    patients: {
        name: 'rcm_patients_list',
        title: 'Patients',
        description: 'Patient demographic and insurance information',
        dataTable: 'x_rcm_nexus_patient',
        columns: ['patient_id', 'first_name', 'last_name', 'primary_insurance'],
        actions: ['create', 'view', 'edit'],
    },
    analytics: {
        name: 'rcm_analytics',
        title: 'Analytics & Reporting',
        description: 'Key metrics and business analytics',
        widgets: [
            'denial_rate_chart',
            'payment_timeline_chart',
            'scrubbing_compliance_gauge',
            'rta_status_summary',
        ],
    },
    config: {
        name: 'rcm_configuration',
        title: 'Configuration',
        description: 'System configuration and settings',
        sections: [
            'payer_management',
            'scrub_rules',
            'user_roles',
            'notification_settings',
        ],
    },
}
