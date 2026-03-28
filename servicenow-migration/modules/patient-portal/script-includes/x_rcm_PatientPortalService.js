var x_rcm_PatientPortalService = Class.create();
x_rcm_PatientPortalService.prototype = {
  initialize: function() {
    this.patientTable = 'x_rcm_nexus_patient';
    this.claimTable = 'x_rcm_nexus_claim';
    this.paymentTable = 'x_rcm_nexus_patient_payment';
    this.planTable = 'x_rcm_nexus_payment_plan';
    this.messageTable = 'x_rcm_nexus_portal_message';
  },

  listPatients: function() {
    var out = [];
    var gr = new GlideRecord(this.patientTable);
    gr.addQuery('u_is_active', true);
    gr.orderBy('u_last_name');
    gr.setLimit(200);
    gr.query();

    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        first_name: gr.getValue('u_first_name') || '',
        last_name: gr.getValue('u_last_name') || '',
        mrn: gr.getValue('u_mrn') || '',
        dob: gr.getValue('u_dob') || '',
        phone: gr.getValue('u_phone') || '',
        email: gr.getValue('u_email') || ''
      });
    }

    return out;
  },

  dashboard: function(patientSysId) {
    if (!patientSysId) {
      return { ok: false, message: 'patient_sys_id is required' };
    }

    var patient = this._getPatient(patientSysId);
    if (!patient) {
      return { ok: false, message: 'Patient not found' };
    }

    var claims = this._claims(patientSysId);
    var payments = this._payments(patientSysId);
    var plans = this._plans(patientSysId);
    var messages = this._messages(patientSysId);

    return {
      ok: true,
      patient: patient,
      claims: claims,
      payments: payments,
      plans: plans,
      messages: messages,
      totals: {
        totalOwed: this._totalOwed(claims),
        totalPaid: this._sum(payments, 'amount'),
        activePlans: this._activePlans(plans)
      }
    };
  },

  sendMessage: function(input) {
    input = input || {};
    if (!input.patient_sys_id || !input.subject || !input.message) {
      return { ok: false, message: 'patient_sys_id, subject, and message are required' };
    }

    var gr = new GlideRecord(this.messageTable);
    gr.initialize();
    gr.setValue('u_patient', input.patient_sys_id);
    gr.setValue('u_subject', input.subject);
    gr.setValue('u_message', input.message);
    gr.setValue('u_direction', 'outbound');
    gr.setValue('u_status', 'sent');
    var sysId = gr.insert();

    return {
      ok: true,
      message_sys_id: sysId
    };
  },

  markMessageRead: function(messageSysId) {
    if (!messageSysId) {
      return { ok: false, message: 'message_sys_id is required' };
    }

    var gr = new GlideRecord(this.messageTable);
    if (!gr.get(messageSysId)) {
      return { ok: false, message: 'Message not found' };
    }

    gr.setValue('u_status', 'read');
    gr.setValue('u_read_at', new GlideDateTime().getValue());
    gr.update();

    return {
      ok: true,
      message_sys_id: messageSysId
    };
  },

  _getPatient: function(sysId) {
    var gr = new GlideRecord(this.patientTable);
    if (!gr.get(sysId)) {
      return null;
    }

    return {
      sys_id: gr.getUniqueValue(),
      first_name: gr.getValue('u_first_name') || '',
      last_name: gr.getValue('u_last_name') || '',
      mrn: gr.getValue('u_mrn') || '',
      dob: gr.getValue('u_dob') || '',
      phone: gr.getValue('u_phone') || '',
      email: gr.getValue('u_email') || ''
    };
  },

  _claims: function(patientSysId) {
    var out = [];
    var gr = new GlideRecord(this.claimTable);
    gr.addQuery('u_patient', patientSysId);
    gr.orderByDesc('u_service_date');
    gr.setLimit(50);
    gr.query();

    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        claim_number: gr.getValue('u_claim_number') || '',
        service_date: gr.getValue('u_service_date') || '',
        claim_status: gr.getValue('u_status') || '',
        total_charge_amount: parseFloat(gr.getValue('u_total_charge_amount') || 0),
        total_paid_amount: parseFloat(gr.getValue('u_total_paid_amount') || 0),
        patient_responsibility: parseFloat(gr.getValue('u_patient_responsibility') || 0),
        payer_name: gr.getDisplayValue('u_payer') || ''
      });
    }

    return out;
  },

  _payments: function(patientSysId) {
    var out = [];
    var gr = new GlideRecord(this.paymentTable);
    gr.addQuery('u_patient', patientSysId);
    gr.orderByDesc('u_payment_date');
    gr.setLimit(50);
    gr.query();

    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        payment_date: gr.getValue('u_payment_date') || '',
        amount: parseFloat(gr.getValue('u_amount') || 0),
        payment_method: gr.getValue('u_payment_method') || '',
        status: gr.getValue('u_status') || '',
        transaction_id: gr.getValue('u_transaction_id') || '',
        claim_number: gr.getDisplayValue('u_claim') || ''
      });
    }

    return out;
  },

  _plans: function(patientSysId) {
    var out = [];
    var gr = new GlideRecord(this.planTable);
    gr.addQuery('u_patient', patientSysId);
    gr.orderByDesc('sys_created_on');
    gr.query();

    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        claim_number: gr.getDisplayValue('u_claim') || '',
        total_balance: parseFloat(gr.getValue('u_total_balance') || 0),
        monthly_amount: parseFloat(gr.getValue('u_monthly_amount') || 0),
        remaining_balance: parseFloat(gr.getValue('u_remaining_balance') || 0),
        payments_made: parseInt(gr.getValue('u_payments_made') || 0, 10),
        number_of_payments: parseInt(gr.getValue('u_number_of_payments') || 0, 10),
        next_payment_date: gr.getValue('u_next_payment_date') || '',
        start_date: gr.getValue('u_start_date') || '',
        auto_pay: gr.getValue('u_auto_pay') === 'true',
        status: gr.getValue('u_status') || ''
      });
    }

    return out;
  },

  _messages: function(patientSysId) {
    var out = [];
    var gr = new GlideRecord(this.messageTable);
    gr.addQuery('u_patient', patientSysId);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(50);
    gr.query();

    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        subject: gr.getValue('u_subject') || '',
        message: gr.getValue('u_message') || '',
        direction: gr.getValue('u_direction') || '',
        status: gr.getValue('u_status') || '',
        read_at: gr.getValue('u_read_at') || '',
        created_at: gr.getValue('sys_created_on')
      });
    }

    return out;
  },

  _totalOwed: function(claims) {
    var total = 0;

    for (var i = 0; i < claims.length; i++) {
      var owed = claims[i].patient_responsibility - claims[i].total_paid_amount;
      if (owed > 0) total += owed;
    }

    return total;
  },

  _sum: function(list, field) {
    var total = 0;
    for (var i = 0; i < list.length; i++) {
      total += parseFloat(list[i][field] || 0);
    }
    return total;
  },

  _activePlans: function(plans) {
    var count = 0;
    for (var i = 0; i < plans.length; i++) {
      if (plans[i].status === 'active') count++;
    }
    return count;
  },

  type: 'x_rcm_PatientPortalService'
};
