import '@servicenow/sdk/global'
import { RestEndpoint, HttpMethod } from '@servicenow/sdk/core'
import {
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
} from '../script-includes/operational-services.now'

const analyticsService = new AnalyticsService()
const workloadService = new WorkloadService()
const batchService = new BatchService()
const notificationService = new NotificationService()
const auditService = new AuditService()
const configService = new ConfigService()
const aiService = new AIOperationsService()
const revenueService = new RevenueIntelligenceService()
const complianceService = new ComplianceService()
const triageService = new ExceptionTriageService()
const touchlessService = new TouchlessProcessingService()

// Analytics APIs
RestEndpoint({
    path: '/x_rcm_nexus/analytics/denial-metrics',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const metrics = await analyticsService.getDenialMetrics()
            return { status: 200, data: metrics }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/analytics/payment-metrics',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const metrics = await analyticsService.getPaymentMetrics()
            return { status: 200, data: metrics }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/analytics/claim-metrics',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const metrics = await analyticsService.getClaimMetrics()
            return { status: 200, data: metrics }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// Workload APIs
RestEndpoint({
    path: '/x_rcm_nexus/workloads',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const status = await workloadService.getWorkloadStatus()
            return { status: 200, data: status }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/workloads/assign',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await workloadService.assignClaimsToQueue(req.body.queueId, req.body.claimIds)
            return { status: 200, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// Batch APIs
RestEndpoint({
    path: '/x_rcm_nexus/batches',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await batchService.submitBatch(req.body)
            return { status: 201, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/batches/{batchId}/status',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const status = await batchService.getBatchStatus(req.pathParams.batchId)
            return { status: 200, data: status }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// Notification APIs
RestEndpoint({
    path: '/x_rcm_nexus/notifications',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await notificationService.sendNotification(req.body)
            return { status: 201, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/notifications/user/{userId}',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const notifications = await notificationService.getNotifications(req.pathParams.userId)
            return { status: 200, data: notifications }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// Audit APIs
RestEndpoint({
    path: '/x_rcm_nexus/audit-log/{recordId}',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const logs = await auditService.getAuditLog(req.pathParams.recordId)
            return { status: 200, data: logs }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// Configuration APIs
RestEndpoint({
    path: '/x_rcm_nexus/config/{key}',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const config = await configService.getConfig(req.pathParams.key)
            return { status: 200, data: config }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/config',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await configService.setConfig(req.body.key, req.body.value)
            return { status: 200, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// AI Operations APIs
RestEndpoint({
    path: '/x_rcm_nexus/ai/anomaly-detection/{claimId}',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await aiService.runAnomalyDetection(req.pathParams.claimId)
            return { status: 200, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/ai/denial-prediction',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await aiService.runDenialPrediction(req.body)
            return { status: 200, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/ai/revenue-forecast',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await aiService.runRevenueForecast()
            return { status: 200, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// Revenue Intelligence APIs
RestEndpoint({
    path: '/x_rcm_nexus/revenue/metrics',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const metrics = await revenueService.getRevenueMetrics()
            return { status: 200, data: metrics }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/revenue/payer/{payerId}',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const performance = await revenueService.getPayerPerformance(req.pathParams.payerId)
            return { status: 200, data: performance }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// Compliance APIs
RestEndpoint({
    path: '/x_rcm_nexus/compliance/validate/{claimId}',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await complianceService.validateCompliance(req.pathParams.claimId)
            return { status: 200, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/compliance/report',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const report = await complianceService.getComplianceReport()
            return { status: 200, data: report }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// Exception Triage APIs
RestEndpoint({
    path: '/x_rcm_nexus/exceptions',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const exceptions = await triageService.getExceptions(req.queryParams.status)
            return { status: 200, data: exceptions }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/exceptions/{exceptionId}/resolve',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await triageService.resolveException(req.pathParams.exceptionId, req.body.resolution)
            return { status: 200, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

// Touchless Processing APIs
RestEndpoint({
    path: '/x_rcm_nexus/touchless/process/{claimId}',
    method: HttpMethod.POST,
    handler: async (req: any) => {
        try {
            const result = await touchlessService.autoProcessClaim(req.pathParams.claimId)
            return { status: 200, data: result }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})

RestEndpoint({
    path: '/x_rcm_nexus/touchless/metrics',
    method: HttpMethod.GET,
    handler: async (req: any) => {
        try {
            const metrics = await touchlessService.getTouchlessMetrics()
            return { status: 200, data: metrics }
        } catch (e) {
            return { status: 500, data: { error: e.message } }
        }
    },
})
