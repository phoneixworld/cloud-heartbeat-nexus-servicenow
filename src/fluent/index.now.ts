import '@servicenow/sdk/global'

// COMPLETE FLUENT APP WIRING - Cloud Heartbeat Nexus RCM Platform

// ========== CORE TABLES ==========
export { claimTable } from './tables/claim.now'
export { patientTable } from './tables/patient.now'
export { payerTable } from './tables/payer.now'
export { denialTable } from './tables/denial.now'
export { scrubRuleTable, scrubResultTable } from './tables/scrubbing.now'
export { rtaTable, paymentPostingTable } from './tables/rta-and-payment.now'

// ========== OPERATIONAL TABLES ==========
export { workloadQueueTable, batchTable, auditLogTable, notificationTable, configTable } from './tables/operational.now'

// ========== ROLES - Complete 6-role model ==========
import './roles/app-roles.now'

// ========== ACLS - Comprehensive security matrix ==========
import './acls/app-acls.now'

// ========== CORE BUSINESS RULES ==========
import './business-rules/app-rules.now'

// ========== OPERATIONAL BUSINESS RULES ==========
import './business-rules/operational-rules.now'

// ========== CORE SCRIPT INCLUDES ==========
export {
    ClaimsService,
    DenialService,
    ScrubService,
    RtaService,
    PaymentPostingService,
} from './script-includes/app-script-includes.now'

// ========== OPERATIONAL SCRIPT INCLUDES ==========
export {
    AnalyticsService,
    WorkloadService,
    BatchService,
    NotificationService,
    AuditService,
    ConfigService,
    AIOperationsService,
    RevenueIntelligenceService,
    ComplianceService,
    ExceptionTriageService,
    TouchlessProcessingService,
    SelfHealingService,
    BehavioralBiometricsService,
    ZeroTrustSecurityService,
    DataResidencyService,
    IntegrationService,
} from './script-includes/operational-services.now'

// ========== CORE REST APIs ==========
import './rest-api/app-api.now'

// ========== OPERATIONAL REST APIs ==========
import './rest-api/operational-api.now'

// ========== NAVIGATION & MODULES ==========
import './navigation/app-menu.now'

// ========== CORE UI PAGES ==========
export { uiPages } from './ui-pages/app-page.now'

// ========== OPERATIONAL UI PAGES ==========
export { expandedUIPages } from './ui-pages/operational-pages.now'

// ========== TESTS - Comprehensive ATF definitions ==========
export { atfTests } from './tests/example-item-test.now'

// ========== APPLICATION METADATA ==========
export const appMetadata = {
    name: 'Cloud Heartbeat Nexus',
    scope: 'x_rcm_nexus',
    version: '1.0.0',
    description: 'Enterprise RCM (Revenue Cycle Management) platform for healthcare providers',
    
    modules: [
        'claims',
        'denials',
        'scrubbing',
        'rta',
        'payment_posting',
        'patients',
        'payers',
        'analytics',
        'notifications',
        'ai_operations',
        'revenue_intelligence',
        'compliance',
        'exception_triage',
        'touchless_processing',
        'self_healing',
        'behavioral_biometrics',
        'zero_trust_security',
        'data_residency',
        'integrations',
        'anomaly_detection',
        'revenue_forecast',
        'workflow_optimization',
        'ai_roi',
        'batches',
        'workloads',
    ],
    
    features: [
        'Claim management and tracking',
        'Denial management and appeals',
        'Billing compliance scrubbing',
        'Real-time assessment (RTA)',
        'Payment posting and reconciliation',
        'Patient and payer management',
        'Advanced analytics and reporting',
        'Automated notifications',
        'AI-powered anomaly detection',
        'Denial prediction and prevention',
        'Revenue forecasting',
        'Compliance validation',
        'Exception triage and management',
        'Touchless claim processing',
        'Self-healing diagnostics',
        'Behavioral biometrics monitoring',
        'Zero Trust security model',
        'Data residency compliance',
        'Integration hub management',
        'Workflow optimization',
        'Revenue intelligence',
        'Batch processing',
        'Workload management',
        'Complete audit logging',
        'Role-based access control',
    ],
    
    tables: [
        'x_rcm_nexus_claim',
        'x_rcm_nexus_claim_line_item',
        'x_rcm_nexus_patient',
        'x_rcm_nexus_payer',
        'x_rcm_nexus_denial',
        'x_rcm_nexus_scrub_rule',
        'x_rcm_nexus_scrub_result',
        'x_rcm_nexus_rta',
        'x_rcm_nexus_payment_posting',
        'x_rcm_nexus_workload_queue',
        'x_rcm_nexus_batch',
        'x_rcm_nexus_audit_log',
        'x_rcm_nexus_notification',
        'x_rcm_nexus_config',
    ],
    
    roles: [
        'x_rcm_nexus.admin',
        'x_rcm_nexus.supervisor',
        'x_rcm_nexus.agent',
        'x_rcm_nexus.ai_ops',
        'x_rcm_nexus.audit',
        'x_rcm_nexus.integration',
    ],
    
    apis: [
        '/x_rcm_nexus/claims',
        '/x_rcm_nexus/denials',
        '/x_rcm_nexus/scrubbing',
        '/x_rcm_nexus/rta-submit',
        '/x_rcm_nexus/payments',
        '/x_rcm_nexus/analytics',
        '/x_rcm_nexus/workloads',
        '/x_rcm_nexus/batches',
        '/x_rcm_nexus/notifications',
        '/x_rcm_nexus/ai/*',
        '/x_rcm_nexus/revenue/*',
        '/x_rcm_nexus/compliance/*',
        '/x_rcm_nexus/exceptions',
        '/x_rcm_nexus/touchless/*',
        '/x_rcm_nexus/audit-log',
        '/x_rcm_nexus/config',
    ],
    
    pages: [
        'rcm_dashboard',
        'rcm_claims_list',
        'rcm_claim_detail',
        'rcm_denials_list',
        'rcm_denials_detail',
        'rcm_scrubbing_list',
        'rcm_rta_list',
        'rcm_payments_list',
        'rcm_patients_list',
        'rcm_analytics_overview',
        'rcm_denial_trends',
        'rcm_workload_queues',
        'rcm_batch_submission',
        'rcm_notifications',
        'rcm_audit_log',
        'rcm_configuration',
        'rcm_anomaly_detection',
        'rcm_denial_prediction',
        'rcm_revenue_forecast',
        'rcm_compliance_validation',
        'rcm_exception_queue',
        'rcm_touchless_overview',
        'rcm_reports',
        'rcm_integrations_hub',
        'rcm_zero_trust_security',
        'rcm_patient_portal',
    ],
}