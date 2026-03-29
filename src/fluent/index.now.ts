import '@servicenow/sdk/global'

// Core application exports for the Cloud Heartbeat Nexus RCM platform

// ========== TABLES ==========
export { claimTable } from './tables/claim.now'
export { patientTable } from './tables/patient.now'
export { payerTable } from './tables/payer.now'
export { denialTable } from './tables/denial.now'
export { scrubRuleTable, scrubResultTable } from './tables/scrubbing.now'
export { rtaTable, paymentPostingTable } from './tables/rta-and-payment.now'

// ========== ROLES ==========
import './roles/app-roles.now'

// ========== ACLS - Table and API security ==========
import './acls/app-acls.now'

// ========== BUSINESS RULES ==========
import './business-rules/app-rules.now'

// ========== SCRIPT INCLUDES - Service classes ==========
export { ClaimsService, DenialService, ScrubService, RtaService, PaymentPostingService } from './script-includes/app-script-includes.now'

// ========== REST APIs ==========
import './rest-api/app-api.now'

// ========== NAVIGATION & MODULES ==========
import './navigation/app-menu.now'

// ========== UI PAGES ==========
export { uiPages } from './ui-pages/app-page.now'

// ========== TESTS - ATF definitions ==========
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
    ],
    features: [
        'Claim management and tracking',
        'Denial management and appeals',
        'Billing compliance scrubbing',
        'Real-time assessment',
        'Payment posting and reconciliation',
        'Patient and payer management',
        'Advanced analytics and reporting',
        'Automated notifications',
        'AI-powered operations',
        'Role-based access control',
    ],
}