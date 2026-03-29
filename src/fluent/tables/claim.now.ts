import '@servicenow/sdk/global'
import { Table, Field } from '@servicenow/sdk/core'

export const claimTable = Table({
    $id: Now.ID['x_rcm_nexus_claim'],
    name: 'x_rcm_nexus_claim',
    label: 'Claim',
    description: 'Core claim records for RCM operations',
    fields: {
        claim_number: Field({
            name: 'claim_number',
            label: 'Claim Number',
            type: 'String',
            maxLength: 100,
            mandatory: true,
        }),
        patient_name: Field({
            name: 'patient_name',
            label: 'Patient Name',
            type: 'String',
            maxLength: 200,
        }),
        dos: Field({
            name: 'dos',
            label: 'Date of Service',
            type: 'DateTime',
        }),
        claim_amount: Field({
            name: 'claim_amount',
            label: 'Claim Amount',
            type: 'Decimal',
        }),
        paid_amount: Field({
            name: 'paid_amount',
            label: 'Paid Amount',
            type: 'Decimal',
        }),
        status: Field({
            name: 'status',
            label: 'Status',
            type: 'Choice',
            choices: [
                { label: 'New', value: 'new' },
                { label: 'Scrubbed', value: 'scrubbed' },
                { label: 'Submitted', value: 'submitted' },
                { label: 'In Process', value: 'in_process' },
                { label: 'Denied', value: 'denied' },
                { label: 'Paid', value: 'paid' },
                { label: 'Adjusted', value: 'adjusted' },
            ],
        }),
        payer_id: Field({
            name: 'payer_id',
            label: 'Payer',
            type: 'Reference',
            reference: 'x_rcm_nexus_payer',
        }),
        denial_count: Field({
            name: 'denial_count',
            label: 'Denial Count',
            type: 'Integer',
        }),
        appeal_eligible: Field({
            name: 'appeal_eligible',
            label: 'Appeal Eligible',
            type: 'Boolean',
        }),
        created_date: Field({
            name: 'created_date',
            label: 'Created Date',
            type: 'DateTime',
        }),
    },
})
