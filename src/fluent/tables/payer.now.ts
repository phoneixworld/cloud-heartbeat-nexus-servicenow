import '@servicenow/sdk/global'
import { Table, Field } from '@servicenow/sdk/core'

export const payerTable = Table({
    $id: Now.ID['x_rcm_nexus_payer'],
    name: 'x_rcm_nexus_payer',
    label: 'Payer',
    description: 'Insurance payer information and contracts',
    fields: {
        payer_name: Field({
            name: 'payer_name',
            label: 'Payer Name',
            type: 'String',
            maxLength: 150,
            mandatory: true,
        }),
        payer_code: Field({
            name: 'payer_code',
            label: 'Payer Code',
            type: 'String',
            maxLength: 50,
        }),
        npi: Field({
            name: 'npi',
            label: 'NPI',
            type: 'String',
            maxLength: 10,
        }),
        contract_id: Field({
            name: 'contract_id',
            label: 'Contract ID',
            type: 'String',
            maxLength: 50,
        }),
        payment_method: Field({
            name: 'payment_method',
            label: 'Payment Method',
            type: 'Choice',
            choices: [
                { label: 'ACH', value: 'ach' },
                { label: 'Check', value: 'check' },
                { label: 'Wire', value: 'wire' },
                { label: 'Other', value: 'other' },
            ],
        }),
        remittance_email: Field({
            name: 'remittance_email',
            label: 'Remittance Email',
            type: 'String',
            maxLength: 100,
        }),
        active: Field({
            name: 'active',
            label: 'Active',
            type: 'Boolean',
        }),
    },
})
