import '@servicenow/sdk/global'
import { Table, Field } from '@servicenow/sdk/core'

// Additional operational tables for complete module coverage

export const workloadQueueTable = Table({
    $id: Now.ID['x_rcm_nexus_workload_queue'],
    name: 'x_rcm_nexus_workload_queue',
    label: 'Workload Queue',
    description: 'Work queue and task assignment',
    fields: {
        queue_name: Field({
            name: 'queue_name',
            label: 'Queue Name',
            type: 'String',
            maxLength: 150,
            mandatory: true,
        }),
        claim_count: Field({
            name: 'claim_count',
            label: 'Claim Count',
            type: 'Integer',
        }),
        assigned_to: Field({
            name: 'assigned_to',
            label: 'Assigned To',
            type: 'Reference',
            reference: 'sys_user',
        }),
        priority: Field({
            name: 'priority',
            label: 'Priority',
            type: 'Choice',
            choices: [
                { label: 'High', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low', value: 'low' },
            ],
        }),
        status: Field({
            name: 'status',
            label: 'Status',
            type: 'Choice',
            choices: [
                { label: 'Open', value: 'open' },
                { label: 'In Progress', value: 'in_progress' },
                { label: 'Completed', value: 'completed' },
            ],
        }),
    },
})

export const batchTable = Table({
    $id: Now.ID['x_rcm_nexus_batch'],
    name: 'x_rcm_nexus_batch',
    label: 'Batch',
    description: 'Batch processing records',
    fields: {
        batch_id: Field({
            name: 'batch_id',
            label: 'Batch ID',
            type: 'String',
            maxLength: 50,
            mandatory: true,
        }),
        batch_date: Field({
            name: 'batch_date',
            label: 'Batch Date',
            type: 'DateTime',
        }),
        claim_count: Field({
            name: 'claim_count',
            label: 'Claim Count',
            type: 'Integer',
        }),
        status: Field({
            name: 'status',
            label: 'Status',
            type: 'Choice',
            choices: [
                { label: 'Submitted', value: 'submitted' },
                { label: 'Processing', value: 'processing' },
                { label: 'Completed', value: 'completed' },
                { label: 'Failed', value: 'failed' },
            ],
        }),
    },
})

export const auditLogTable = Table({
    $id: Now.ID['x_rcm_nexus_audit_log'],
    name: 'x_rcm_nexus_audit_log',
    label: 'Audit Log',
    description: 'System audit and compliance logging',
    fields: {
        action: Field({
            name: 'action',
            label: 'Action',
            type: 'String',
            maxLength: 100,
        }),
        record_type: Field({
            name: 'record_type',
            label: 'Record Type',
            type: 'String',
            maxLength: 100,
        }),
        record_id: Field({
            name: 'record_id',
            label: 'Record ID',
            type: 'String',
            maxLength: 100,
        }),
        performed_by: Field({
            name: 'performed_by',
            label: 'Performed By',
            type: 'Reference',
            reference: 'sys_user',
        }),
        timestamp: Field({
            name: 'timestamp',
            label: 'Timestamp',
            type: 'DateTime',
        }),
        details: Field({
            name: 'details',
            label: 'Details',
            type: 'String',
            maxLength: 1000,
        }),
    },
})

export const notificationTable = Table({
    $id: Now.ID['x_rcm_nexus_notification'],
    name: 'x_rcm_nexus_notification',
    label: 'Notification',
    description: 'User notifications and alerts',
    fields: {
        recipient: Field({
            name: 'recipient',
            label: 'Recipient',
            type: 'Reference',
            reference: 'sys_user',
            mandatory: true,
        }),
        subject: Field({
            name: 'subject',
            label: 'Subject',
            type: 'String',
            maxLength: 200,
        }),
        body: Field({
            name: 'body',
            label: 'Body',
            type: 'String',
            maxLength: 1000,
        }),
        notification_type: Field({
            name: 'notification_type',
            label: 'Type',
            type: 'Choice',
            choices: [
                { label: 'Alert', value: 'alert' },
                { label: 'Info', value: 'info' },
                { label: 'Warning', value: 'warning' },
                { label: 'Error', value: 'error' },
            ],
        }),
        read: Field({
            name: 'read',
            label: 'Read',
            type: 'Boolean',
            default: false,
        }),
        created_date: Field({
            name: 'created_date',
            label: 'Created Date',
            type: 'DateTime',
        }),
    },
})

export const configTable = Table({
    $id: Now.ID['x_rcm_nexus_config'],
    name: 'x_rcm_nexus_config',
    label: 'Configuration',
    description: 'System configuration settings',
    fields: {
        key: Field({
            name: 'key',
            label: 'Config Key',
            type: 'String',
            maxLength: 100,
            mandatory: true,
        }),
        value: Field({
            name: 'value',
            label: 'Config Value',
            type: 'String',
            maxLength: 500,
        }),
        description: Field({
            name: 'description',
            label: 'Description',
            type: 'String',
            maxLength: 500,
        }),
        config_type: Field({
            name: 'config_type',
            label: 'Type',
            type: 'Choice',
            choices: [
                { label: 'String', value: 'string' },
                { label: 'Number', value: 'number' },
                { label: 'Boolean', value: 'boolean' },
                { label: 'JSON', value: 'json' },
            ],
        }),
    },
})
