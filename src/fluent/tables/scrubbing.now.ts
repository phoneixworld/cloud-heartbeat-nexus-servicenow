import '@servicenow/sdk/global'
import { Table, Field } from '@servicenow/sdk/core'

export const scrubRuleTable = Table({
    $id: Now.ID['x_rcm_nexus_scrub_rule'],
    name: 'x_rcm_nexus_scrub_rule',
    label: 'Scrub Rule',
    description: 'Billing compliance scrubbing rules',
    fields: {
        rule_name: Field({
            name: 'rule_name',
            label: 'Rule Name',
            type: 'String',
            maxLength: 150,
            mandatory: true,
        }),
        rule_code: Field({
            name: 'rule_code',
            label: 'Rule Code',
            type: 'String',
            maxLength: 50,
        }),
        description: Field({
            name: 'description',
            label: 'Description',
            type: 'String',
            maxLength: 500,
        }),
        rule_type: Field({
            name: 'rule_type',
            label: 'Rule Type',
            type: 'Choice',
            choices: [
                { label: 'Coding', value: 'coding' },
                { label: 'Billing', value: 'billing' },
                { label: 'Compliance', value: 'compliance' },
            ],
        }),
        severity: Field({
            name: 'severity',
            label: 'Severity',
            type: 'Choice',
            choices: [
                { label: 'High', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low', value: 'low' },
            ],
        }),
        active: Field({
            name: 'active',
            label: 'Active',
            type: 'Boolean',
            default: true,
        }),
    },
})

export const scrubResultTable = Table({
    $id: Now.ID['x_rcm_nexus_scrub_result'],
    name: 'x_rcm_nexus_scrub_result',
    label: 'Scrub Result',
    description: 'Results of scrubbing operations on claims',
    fields: {
        claim_id: Field({
            name: 'claim_id',
            label: 'Claim',
            type: 'Reference',
            reference: 'x_rcm_nexus_claim',
        }),
        rule_id: Field({
            name: 'rule_id',
            label: 'Rule',
            type: 'Reference',
            reference: 'x_rcm_nexus_scrub_rule',
        }),
        finding: Field({
            name: 'finding',
            label: 'Finding',
            type: 'String',
            maxLength: 500,
        }),
        suggested_action: Field({
            name: 'suggested_action',
            label: 'Suggested Action',
            type: 'String',
            maxLength: 500,
        }),
        resolved: Field({
            name: 'resolved',
            label: 'Resolved',
            type: 'Boolean',
            default: false,
        }),
    },
})
