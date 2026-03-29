import '@servicenow/sdk/global'
import { Table, Field } from '@servicenow/sdk/core'

export const rtaTable = Table({
    $id: Now.ID['x_rcm_nexus_rta'],
    name: 'x_rcm_nexus_rta',
    label: 'RTA Submission',
    description: 'Real-time assessment submissions and responses',
    fields: {
        claim_id: Field({
            name: 'claim_id',
            label: 'Claim',
            type: 'Reference',
            reference: 'x_rcm_nexus_claim',
            mandatory: true,
        }),
        submission_date: Field({
            name: 'submission_date',
            label: 'Submission Date',
            type: 'DateTime',
        }),
        response_date: Field({
            name: 'response_date',
            label: 'Response Date',
            type: 'DateTime',
        }),
        rta_status: Field({
            name: 'rta_status',
            label: 'Status',
            type: 'Choice',
            choices: [
                { label: 'Submitted', value: 'submitted' },
                { label: 'In Review', value: 'in_review' },
                { label: 'Approved', value: 'approved' },
                { label: 'Denied', value: 'denied' },
            ],
        }),
        response_amount: Field({
            name: 'response_amount',
            label: 'Response Amount',
            type: 'Decimal',
        }),
    },
})

export const paymentPostingTable = Table({
    $id: Now.ID['x_rcm_nexus_payment_posting'],
    name: 'x_rcm_nexus_payment_posting',
    label: 'Payment Posting',
    description: 'Payment posting records and transactions',
    fields: {
        claim_id: Field({
            name: 'claim_id',
            label: 'Claim',
            type: 'Reference',
            reference: 'x_rcm_nexus_claim',
            mandatory: true,
        }),
        payer_id: Field({
            name: 'payer_id',
            label: 'Payer',
            type: 'Reference',
            reference: 'x_rcm_nexus_payer',
        }),
        payment_amount: Field({
            name: 'payment_amount',
            label: 'Payment Amount',
            type: 'Decimal',
            mandatory: true,
        }),
        payment_date: Field({
            name: 'payment_date',
            label: 'Payment Date',
            type: 'DateTime',
        }),
        posting_date: Field({
            name: 'posting_date',
            label: 'Posting Date',
            type: 'DateTime',
        }),
        reference_number: Field({
            name: 'reference_number',
            label: 'Reference Number',
            type: 'String',
            maxLength: 100,
        }),
    },
})
