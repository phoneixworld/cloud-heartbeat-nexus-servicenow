import '@servicenow/sdk/global'
import { Table, Field } from '@servicenow/sdk/core'

export const denialTable = Table({
    $id: Now.ID['x_rcm_nexus_denial'],
    name: 'x_rcm_nexus_denial',
    label: 'Denial',
    description: 'Claim denials and denial reasons',
    fields: {
        claim_id: Field({
            name: 'claim_id',
            label: 'Claim',
            type: 'Reference',
            reference: 'x_rcm_nexus_claim',
            mandatory: true,
        }),
        denial_code: Field({
            name: 'denial_code',
            label: 'Denial Code',
            type: 'String',
            maxLength: 50,
        }),
        denial_reason: Field({
            name: 'denial_reason',
            label: 'Denial Reason',
            type: 'String',
            maxLength: 500,
        }),
        denial_category: Field({
            name: 'denial_category',
            label: 'Category',
            type: 'Choice',
            choices: [
                { label: 'Medical', value: 'medical' },
                { label: 'Coding', value: 'coding' },
                { label: 'Authorization', value: 'authorization' },
                { label: 'Duplicate', value: 'duplicate' },
                { label: 'Other', value: 'other' },
            ],
        }),
        appeal_status: Field({
            name: 'appeal_status',
            label: 'Appeal Status',
            type: 'Choice',
            choices: [
                { label: 'Not Appealed', value: 'not_appealed' },
                { label: 'Level 1', value: 'level_1' },
                { label: 'Level 2', value: 'level_2' },
                { label: 'Overturned', value: 'overturned' },
                { label: 'Sustained', value: 'sustained' },
            ],
        }),
        denial_date: Field({
            name: 'denial_date',
            label: 'Denial Date',
            type: 'DateTime',
        }),
    },
})
