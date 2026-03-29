import '@servicenow/sdk/global'

// Claim status rollup business rule
export function onClaimStatusChange() {
    gs.log('[BR] Claim status changed', 'claims_br')
    const claimId = current.sys_id
    const newStatus = current.status

    // Update associated records
    if (newStatus === 'paid') {
        evaluateRelatedDenials(claimId)
        updatePaymentMetrics(claimId)
    } else if (newStatus === 'denied') {
        createDenialNotification(claimId)
    }
}

function evaluateRelatedDenials(claimId: any) {
    const denialGr = new GlideRecord('x_rcm_nexus_denial')
    denialGr.addQuery('claim_id', claimId)
    denialGr.query()
    while (denialGr.next()) {
        denialGr.appeal_status = 'not_appealed'
        denialGr.update()
    }
}

function updatePaymentMetrics(claimId: any) {
    gs.log('[BR] Updating payment metrics for claim ' + claimId, 'claims_br')
    // Aggregate metrics calculation
}

function createDenialNotification(claimId: any) {
    gs.log('[BR] Creating denial notification for claim ' + claimId, 'claims_br')
    // Notification logic
}

// Denial escalation business rule
export function onDenialUpdate() {
    const denialId = current.sys_id
    const appealStatus = current.appeal_status

    if (appealStatus === 'level_2') {
        escalateToDenialManagement(denialId)
    }
}

function escalateToDenialManagement(denialId: any) {
    gs.log('[BR] Escalating denial ' + denialId + ' to management', 'denial_br')
    // Escalation notification
}

// Payment posting audit business rule
export function onPaymentPosted() {
    const paymentId = current.sys_id
    const claimId = current.claim_id
    const paymentAmount = current.payment_amount

    createAuditRecord(claimId, paymentId, paymentAmount)
}

function createAuditRecord(claimId: any, paymentId: any, amount: any) {
    gs.log('[BR] Creating audit record for payment ' + paymentId, 'payment_br')
    // Audit logging
}

// Scrubbing rule enforcement business rule
export function onScrubResultCreated() {
    const resultId = current.sys_id
    const finding = current.finding

    if (!isResolvedFinding(finding)) {
        flagForReview(resultId)
    }
}

function isResolvedFinding(finding: any): boolean {
    const resolvedPatterns = ['compliant', 'corrected', 'approved']
    return resolvedPatterns.some(pattern => finding.includes(pattern))
}

function flagForReview(resultId: any) {
    gs.log('[BR] Flagging scrub result ' + resultId + ' for review', 'scrub_br')
    // Review flag logic
}
