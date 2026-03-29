import '@servicenow/sdk/global'
import { Table, Field } from '@servicenow/sdk/core'

export const patientTable = Table({
    $id: Now.ID['x_rcm_nexus_patient'],
    name: 'x_rcm_nexus_patient',
    label: 'Patient',
    description: 'Patient demographic and insurance information',
    fields: {
        patient_id: Field({
            name: 'patient_id',
            label: 'Patient ID',
            type: 'String',
            maxLength: 50,
            mandatory: true,
        }),
        first_name: Field({
            name: 'first_name',
            label: 'First Name',
            type: 'String',
            maxLength: 100,
        }),
        last_name: Field({
            name: 'last_name',
            label: 'Last Name',
            type: 'String',
            maxLength: 100,
        }),
        dob: Field({
            name: 'dob',
            label: 'Date of Birth',
            type: 'DateTime',
        }),
        ssn: Field({
            name: 'ssn',
            label: 'SSN',
            type: 'String',
            maxLength: 11,
        }),
        primary_insurance: Field({
            name: 'primary_insurance',
            label: 'Primary Insurance',
            type: 'String',
            maxLength: 100,
        }),
        secondary_insurance: Field({
            name: 'secondary_insurance',
            label: 'Secondary Insurance',
            type: 'String',
            maxLength: 100,
        }),
        phone: Field({
            name: 'phone',
            label: 'Phone',
            type: 'String',
            maxLength: 20,
        }),
        email: Field({
            name: 'email',
            label: 'Email',
            type: 'String',
            maxLength: 100,
        }),
        address: Field({
            name: 'address',
            label: 'Address',
            type: 'String',
            maxLength: 200,
        }),
    },
})
