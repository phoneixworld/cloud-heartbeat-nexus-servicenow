import '@servicenow/sdk/global'

// Comprehensive UI page specifications for all remaining modules

export const expandedUIPages = {
    // Analytics Pages
    analyticsOverview: {
        name: 'rcm_analytics_overview',
        title: 'Analytics Overview',
        sections: ['denial_metrics', 'payment_metrics', 'claim_metrics'],
        widgets: ['denial_rate_gauge', 'payment_timeline', 'claim_status_pie'],
    },
    denialTrends: {
        name: 'rcm_denial_trends',
        title: 'Denial Trends & Analysis',
        dataTable: 'x_rcm_nexus_denial',
        charts: ['denial_by_category', 'appeal_success_rate'],
    },

    // Workload Pages
    workloadQueues: {
        name: 'rcm_workload_queues',
        title: 'Workload Queues',
        dataTable: 'x_rcm_nexus_workload_queue',
        actions: ['assign_claims', 'rebalance', 'view_queue_detail'],
    },
    workloadDetail: {
        name: 'rcm_workload_detail',
        title: 'Queue Detail & Assignment',
        dataTable: 'x_rcm_nexus_claim',
        filters: ['queue_id', 'priority'],
    },

    // Batch Pages
    batchSubmission: {
        name: 'rcm_batch_submission',
        title: 'Batch Submission',
        dataTable: 'x_rcm_nexus_batch',
        actions: ['create_batch', 'upload_file', 'submit'],
        statusTracking: true,
    },
    batchHistory: {
        name: 'rcm_batch_history',
        title: 'Batch Processing History',
        dataTable: 'x_rcm_nexus_batch',
        columns: ['batch_id', 'batch_date', 'claim_count', 'status'],
    },

    // Notification Pages
    notifications: {
        name: 'rcm_notifications',
        title: 'My Notifications',
        dataTable: 'x_rcm_nexus_notification',
        filters: ['read', 'notification_type'],
        actions: ['mark_as_read', 'delete'],
    },

    // Audit Pages
    auditLog: {
        name: 'rcm_audit_log',
        title: 'Audit Log & Compliance',
        dataTable: 'x_rcm_nexus_audit_log',
        filters: ['action', 'record_type', 'date_range'],
        exportable: true,
    },

    // Configuration Pages
    configuration: {
        name: 'rcm_configuration',
        title: 'System Configuration',
        dataTable: 'x_rcm_nexus_config',
        sections: [
            'general_settings',
            'payer_management',
            'rule_configuration',
            'notification_settings',
        ],
        roles_required: ['x_rcm_nexus.admin'],
    },

    // AI Operations Pages
    anomalyDetection: {
        name: 'rcm_anomaly_detection',
        title: 'Anomaly Detection',
        controls: ['run_detection', 'view_results'],
        resultFields: ['claim_id', 'anomaly_score', 'recommendation'],
    },
    denialPrediction: {
        name: 'rcm_denial_prediction',
        title: 'Denial Prediction',
        inputs: ['claim_data'],
        outputs: ['denial_risk_score', 'likely_reasons'],
    },
    revenueForecast: {
        name: 'rcm_revenue_forecast',
        title: 'Revenue Forecast',
        charts: ['forecast_trend', 'confidence_interval'],
        periods: ['monthly', 'quarterly', 'annual'],
    },

    // Revenue Intelligence Pages
    revenueMetrics: {
        name: 'rcm_revenue_metrics',
        title: 'Revenue Metrics',
        widgets: [
            'gross_charges_card',
            'contractual_adjustments_card',
            'net_revenue_card',
        ],
    },
    payerPerformance: {
        name: 'rcm_payer_performance',
        title: 'Payer Performance Analysis',
        dataTable: 'x_rcm_nexus_payer',
        metrics: ['denial_rate', 'payment_days', 'compliance_score'],
    },

    // Compliance Pages
    complianceValidation: {
        name: 'rcm_compliance_validation',
        title: 'Compliance Validation',
        controls: ['validate_claim', 'batch_validate'],
        resultDisplay: 'violations_list',
    },
    complianceReport: {
        name: 'rcm_compliance_report',
        title: 'Compliance Report',
        charts: ['compliance_percentage', 'violations_timeline'],
        exportable: true,
    },

    // Exception Triage Pages
    exceptionQueue: {
        name: 'rcm_exception_queue',
        title: 'Exception Queue & Triage',
        dataTable: 'Custom',
        filters: ['severity', 'type', 'status'],
        actions: ['resolve_exception', 'reassign'],
    },

    // Touchless Processing Pages
    touchlessOverview: {
        name: 'rcm_touchless_overview',
        title: 'Touchless Processing',
        widgets: ['processing_rate', 'success_rate', 'confidence_distribution'],
    },
    claimAutoProcess: {
        name: 'rcm_claim_auto_process',
        title: 'Auto-Process Claim',
        controls: ['select_claim', 'process_button'],
        resultDisplay: 'processing_result',
    },

    // Additional Pages for Other Modules
    reports: {
        name: 'rcm_reports',
        title: 'Reports & Export',
        reportTypes: [
            'claim_summary',
            'denial_analysis',
            'revenue_report',
            'compliance_report',
        ],
        exportFormats: ['pdf', 'excel', 'csv'],
    },

    payerContracts: {
        name: 'rcm_payer_contracts',
        title: 'Payer Contracts',
        dataTable: 'x_rcm_nexus_payer',
        actions: ['view_contract', 'update_terms', 'document_upload'],
    },

    chargeCapture: {
        name: 'rcm_charge_capture',
        title: 'Charge Capture',
        controls: ['capture_charges', 'verify', 'post'],
        relatedTables: ['x_rcm_nexus_claim'],
    },

    patientFinancial: {
        name: 'rcm_patient_financial',
        title: 'Patient Financial Services',
        dataTable: 'x_rcm_nexus_patient',
        features: [
            'balance_inquiry',
            'payment_plan',
            'financial_counseling',
        ],
    },

    patientPortal: {
        name: 'rcm_patient_portal',
        title: 'Patient Portal',
        access: 'external',
        features: ['view_claims', 'pay_bill', 'message_support'],
    },

    integrationsHub: {
        name: 'rcm_integrations_hub',
        title: 'Integration Hub',
        integrations: [
            'hl7_adt',
            'edi_837',
            'supabase',
            'edge_functions',
        ],
        controls: ['test_connection', 'enable_disable', 'logs'],
    },

    zeroTrustSecurity: {
        name: 'rcm_zero_trust_security',
        title: 'Zero Trust Security',
        sections: [
            'access_controls',
            'device_verification',
            'anomaly_alerts',
        ],
        roles_required: ['x_rcm_nexus.admin'],
    },

    dataResidency: {
        name: 'rcm_data_residency',
        title: 'Data Residency Compliance',
        validations: ['location_check', 'encryption_status'],
        reportable: true,
    },

    behavioralBiometrics: {
        name: 'rcm_behavioral_biometrics',
        title: 'Behavioral Analysis',
        metrics: ['user_risk_score', 'activity_pattern'],
        roles_required: ['x_rcm_nexus.admin'],
    },
}
