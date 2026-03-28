var x_rcm_PaymentPostingService = Class.create();
x_rcm_PaymentPostingService.prototype = {
  initialize: function() {
    this.paymentTable = 'x_rcm_nexus_patient_payment';
    this.claimTable = 'x_rcm_nexus_claim';
  },

  listPayments: function(searchText) {
    var gr = new GlideRecord(this.paymentTable);
    gr.orderByDesc('u_payment_date');
    gr.setLimit(200);
    gr.query();

    var out = [];
    var s = String(searchText || '').toLowerCase();
    while (gr.next()) {
      var row = {
        sys_id: gr.getUniqueValue(),
        claim_sys_id: gr.getValue('u_claim'),
        patient_sys_id: gr.getValue('u_patient'),
        amount: parseFloat(gr.getValue('u_amount') || 0),
        payment_method: gr.getValue('u_payment_method'),
        payment_date: gr.getValue('u_payment_date'),
        status: gr.getValue('u_status'),
        notes: gr.getValue('u_notes')
      };

      if (s) {
        var key = (row.claim_sys_id + ' ' + row.patient_sys_id + ' ' + (row.payment_method || '')).toLowerCase();
        if (key.indexOf(s) < 0) {
          continue;
        }
      }

      out.push(row);
    }

    return out;
  },

  listUnpaidClaims: function() {
    var gr = new GlideRecord(this.claimTable);
    gr.addQuery('u_status', 'IN', 'submitted,acknowledged,pending,partial_paid');
    gr.orderByDesc('sys_created_on');
    gr.setLimit(300);
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        claim_number: gr.getValue('u_claim_number'),
        patient_sys_id: gr.getValue('u_patient'),
        total_charge_amount: parseFloat(gr.getValue('u_total_charge_amount') || 0),
        total_paid_amount: parseFloat(gr.getValue('u_total_paid_amount') || 0),
        claim_status: gr.getValue('u_status')
      });
    }

    return out;
  },

  postPayment: function(input) {
    var amount = parseFloat(input.amount || 0);
    if (amount <= 0) {
      return { ok: false, message: 'Amount must be greater than 0' };
    }

    var claim = new GlideRecord(this.claimTable);
    if (!claim.get(input.claim_sys_id || '')) {
      return { ok: false, message: 'Claim not found' };
    }

    var pay = new GlideRecord(this.paymentTable);
    pay.initialize();
    pay.setValue('u_patient', input.patient_sys_id || claim.getValue('u_patient'));
    pay.setValue('u_claim', input.claim_sys_id || '');
    pay.setValue('u_amount', amount);
    pay.setValue('u_payment_method', input.payment_method || 'eft');
    pay.setValue('u_payment_date', gs.nowDateTime());
    pay.setValue('u_status', 'completed');
    pay.setValue('u_notes', input.notes || '');
    var paymentSysId = pay.insert();

    var currentPaid = parseFloat(claim.getValue('u_total_paid_amount') || 0);
    var totalCharge = parseFloat(claim.getValue('u_total_charge_amount') || 0);
    var newPaid = currentPaid + amount;

    claim.setValue('u_total_paid_amount', newPaid);
    if (newPaid >= totalCharge && totalCharge > 0) {
      claim.setValue('u_status', 'paid');
    } else if (newPaid > 0) {
      claim.setValue('u_status', 'partial_paid');
    }
    claim.update();

    return {
      ok: true,
      payment_sys_id: paymentSysId,
      claim_sys_id: claim.getUniqueValue(),
      new_total_paid_amount: newPaid,
      claim_status: claim.getValue('u_status')
    };
  },

  summary: function() {
    var payments = this.listPayments('');
    var unpaid = this.listUnpaidClaims();

    var totalPosted = 0;
    var todayTotal = 0;
    var todayStr = new GlideDate().getValue();

    for (var i = 0; i < payments.length; i++) {
      totalPosted += payments[i].amount;
      if (String(payments[i].payment_date || '').indexOf(todayStr) === 0) {
        todayTotal += payments[i].amount;
      }
    }

    return {
      total_posted: totalPosted,
      today_total: todayTotal,
      payment_count: payments.length,
      unpaid_claim_count: unpaid.length
    };
  },

  type: 'x_rcm_PaymentPostingService'
};
