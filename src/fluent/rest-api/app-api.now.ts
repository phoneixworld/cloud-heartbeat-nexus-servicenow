import '@servicenow/sdk/global'
import { RestEndpoint, HttpMethod } from '@servicenow/sdk/core'
import { ClaimsService, DenialService, ScrubService, RtaService, PaymentPostingService } from '../script-includes/app-script-includes.now'

const claimsService = new ClaimsService()
const denialService = new DenialService()
const scrubService = new ScrubService()
const rtaService = new RtaService()
const paymentService = new PaymentPostingService()

// Claims API endpoints
RestEndpoint({
    path: '/x_rcm_nexus/claims',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const claims = await claimsService.listClaims(req.queryParams)
            return { status: 200, data: claims }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/claims',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await claimsService.createClaim(req.body)
            return { status: 201, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/claims/{claimId}',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const claim = await claimsService.getClaim(req.pathParams.claimId)
            return { status: 200, data: claim }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// Denials API endpoints
RestEndpoint({
    path: '/x_rcm_nexus/denials',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await denialService.createDenial(req.body)
            return { status: 201, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/claims/{claimId}/denials',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const denials = await denialService.getDenialsByClaim(req.pathParams.claimId)
            return { status: 200, data: denials }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// Scrubbing API endpoints
RestEndpoint({
    path: '/x_rcm_nexus/scrub-rules',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await scrubService.createScrubRule(req.body)
            return { status: 201, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/claims/{claimId}/scrub',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await scrubService.executeScrubRule(req.pathParams.claimId, req.body.ruleId)
            return { status: 200, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/claims/{claimId}/scrub-results',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const results = await scrubService.getScrubResults(req.pathParams.claimId)
            return { status: 200, data: results }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// RTA API endpoints
RestEndpoint({
    path: '/x_rcm_nexus/rta-submit',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await rtaService.submitRta(req.body)
            return { status: 201, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/claims/{claimId}/rta-status',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const status = await rtaService.getRtaStatus(req.pathParams.claimId)
            return { status: 200, data: status }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// Payment Posting API endpoints
RestEndpoint({
    path: '/x_rcm_nexus/payments',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await paymentService.postPayment(req.body)
            return { status: 201, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/claims/{claimId}/payments',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const payments = await paymentService.getPaymentHistory(req.pathParams.claimId)
            return { status: 200, data: payments }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})
