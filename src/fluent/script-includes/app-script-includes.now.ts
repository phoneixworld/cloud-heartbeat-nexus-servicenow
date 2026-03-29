import '@servicenow/sdk/global'

// Core Claims Service
export class ClaimsService {
    async createClaim(claimData: any): Promise<any> {
        const gr = new GlideRecord('x_rcm_nexus_claim')
        gr.claim_number = claimData.claim_number
        gr.patient_name = claimData.patient_name
        gr.dos = claimData.dos
        gr.claim_amount = claimData.claim_amount
        gr.status = 'new'
        gr.payer_id = claimData.payer_id
        gr.created_date = new GlideDateTime().toString()
        gr.insert()
        return { sys_id: gr.sys_id.toString(), status: 'created' }
    }

    async getClaim(claimId: string): Promise<any> {
        const gr = new GlideRecord('x_rcm_nexus_claim')
        if (gr.get(claimId)) {
            return {
                sys_id: gr.sys_id.toString(),
                claim_number: gr.claim_number.toString(),
                status: gr.status.toString(),
                claim_amount: parseFloat(gr.claim_amount.toString()),
            }
        }
        return null
    }

    async updateClaimStatus(claimId: string, status: string): Promise<any> {
        const gr = new GlideRecord('x_rcm_nexus_claim')
        if (gr.get(claimId)) {
            gr.status = status
            gr.update()
            return { status: 'updated' }
        }
        return { status: 'not_found' }
    }

    async listClaims(filter?: any): Promise<any[]> {
        const gr = new GlideRecord('x_rcm_nexus_claim')
        if (filter?.status) {
            gr.addQuery('status', filter.status)
        }
        gr.query()
        const results: any[] = []
        while (gr.next()) {
            results.push({
                sys_id: gr.sys_id.toString(),
                claim_number: gr.claim_number.toString(),
                status: gr.status.toString(),
            })
        }
        return results
    }
}

// Denials Service
export class DenialService {
    async createDenial(denialData: any): Promise<any> {
        const gr = new GlideRecord('x_rcm_nexus_denial')
        gr.claim_id = denialData.claim_id
        gr.denial_code = denialData.denial_code
        gr.denial_reason = denialData.denial_reason
        gr.denial_category = denialData.denial_category
        gr.appeal_status = 'not_appealed'
        gr.denial_date = new GlideDateTime().toString()
        gr.insert()
        return { sys_id: gr.sys_id.toString(), status: 'created' }
    }

    async updateAppealStatus(denialId: string, appealStatus: string): Promise<any> {
        const gr = new GlideRecord('x_rcm_nexus_denial')
        if (gr.get(denialId)) {
            gr.appeal_status = appealStatus
            gr.update()
            return { status: 'updated' }
        }
        return { status: 'not_found' }
    }

    async getDenialsByClaim(claimId: string): Promise<any[]> {
        const gr = new GlideRecord('x_rcm_nexus_denial')
        gr.addQuery('claim_id', claimId)
        gr.query()
        const results: any[] = []
        while (gr.next()) {
            results.push({
                sys_id: gr.sys_id.toString(),
                denial_code: gr.denial_code.toString(),
                denial_category: gr.denial_category.toString(),
            })
        }
        return results
    }
}

// Scrubbing Service
export class ScrubService {
    async createScrubRule(ruleData: any): Promise<any> {
        const gr = new GlideRecord('x_rcm_nexus_scrub_rule')
        gr.rule_name = ruleData.rule_name
        gr.rule_code = ruleData.rule_code
        gr.rule_type = ruleData.rule_type
        gr.severity = ruleData.severity
        gr.active = true
        gr.insert()
        return { sys_id: gr.sys_id.toString(), status: 'created' }
    }

    async executeScrubRule(claimId: string, ruleId: string): Promise<any> {
        // Scrub execution logic
        const gr = new GlideRecord('x_rcm_nexus_scrub_result')
        gr.claim_id = claimId
        gr.rule_id = ruleId
        gr.finding = 'Scrub executed'
        gr.resolved = false
        gr.insert()
        return { result_id: gr.sys_id.toString(), status: 'executed' }
    }

    async getScrubResults(claimId: string): Promise<any[]> {
        const gr = new GlideRecord('x_rcm_nexus_scrub_result')
        gr.addQuery('claim_id', claimId)
        gr.query()
        const results: any[] = []
        while (gr.next()) {
            results.push({
                sys_id: gr.sys_id.toString(),
                finding: gr.finding.toString(),
                resolved: gr.resolved.toString() === 'true',
            })
        }
        return results
    }
}

// RTA Service
export class RtaService {
    async submitRta(rtaData: any): Promise<any> {
        const gr = new GlideRecord('x_rcm_nexus_rta')
        gr.claim_id = rtaData.claim_id
        gr.submission_date = new GlideDateTime().toString()
        gr.rta_status = 'submitted'
        gr.insert()
        return { sys_id: gr.sys_id.toString(), status: 'submitted' }
    }

    async getRtaStatus(claimId: string): Promise<any> {
        const gr = new GlideRecord('x_rcm_nexus_rta')
        gr.addQuery('claim_id', claimId)
        gr.query()
        if (gr.next()) {
            return {
                sys_id: gr.sys_id.toString(),
                rta_status: gr.rta_status.toString(),
                response_amount: gr.response_amount.toString(),
            }
        }
        return null
    }
}

// Payment Posting Service
export class PaymentPostingService {
    async postPayment(paymentData: any): Promise<any> {
        const gr = new GlideRecord('x_rcm_nexus_payment_posting')
        gr.claim_id = paymentData.claim_id
        gr.payer_id = paymentData.payer_id
        gr.payment_amount = paymentData.payment_amount
        gr.payment_date = new GlideDateTime().toString()
        gr.posting_date = new GlideDateTime().toString()
        gr.insert()

        // Update claim paid_amount
        const claimGr = new GlideRecord('x_rcm_nexus_claim')
        if (claimGr.get(paymentData.claim_id)) {
            claimGr.paid_amount = paymentData.payment_amount
            claimGr.status = 'paid'
            claimGr.update()
        }

        return { sys_id: gr.sys_id.toString(), status: 'posted' }
    }

    async getPaymentHistory(claimId: string): Promise<any[]> {
        const gr = new GlideRecord('x_rcm_nexus_payment_posting')
        gr.addQuery('claim_id', claimId)
        gr.query()
        const results: any[] = []
        while (gr.next()) {
            results.push({
                sys_id: gr.sys_id.toString(),
                payment_amount: gr.payment_amount.toString(),
                posting_date: gr.posting_date.toString(),
            })
        }
        return results
    }
}
