var x_rcm_PatientFinancialService = Class.create();
x_rcm_PatientFinancialService.prototype = {
  initialize: function() {
    this.planTable = 'x_rcm_nexus_payment_plan';
    this.creditTable = 'x_rcm_nexus_credit_balance';
    this.paymentTable = 'x_rcm_nexus_patient_payment';
    this.bridge = new x_rcm_SupabaseBridge();
  },

  listPlans: function() {
    var gr = new GlideRecord(this.planTable);
    gr.orderByDesc('sys_created_on');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        patient_sys_id: gr.getValue('u_patient'),
        patient_name: gr.getDisplayValue('u_patient'),
        claim_sys_id: gr.getValue('u_claim'),
        total_balance: parseFloat(gr.getValue('u_total_balance') || 0),
        monthly_amount: parseFloat(gr.getValue('u_monthly_amount') || 0),
        remaining_balance: parseFloat(gr.getValue('u_remaining_balance') || 0),
        payments_made: parseInt(gr.getValue('u_payments_made') || 0, 10),
        number_of_payments: parseInt(gr.getValue('u_number_of_payments') || 0, 10),
        next_payment_date: gr.getValue('u_next_payment_date'),
        auto_pay: gr.getValue('u_auto_pay') === 'true',
        status: gr.getValue('u_status') || 'active'
      });
    }

    return out;
  },

  listCredits: function() {
    var gr = new GlideRecord(this.creditTable);
    gr.orderByDesc('u_identified_date');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        patient_sys_id: gr.getValue('u_patient'),
        patient_name: gr.getDisplayValue('u_patient'),
        claim_sys_id: gr.getValue('u_claim'),
        claim_number: gr.getDisplayValue('u_claim'),
        payer_sys_id: gr.getValue('u_payer'),
        payer_name: gr.getDisplayValue('u_payer'),
        credit_type: gr.getValue('u_credit_type'),
        amount: parseFloat(gr.getValue('u_amount') || 0),
        refund_status: gr.getValue('u_refund_status') || 'identified',
        identified_date: gr.getValue('u_identified_date'),
        compliance_deadline: gr.getValue('u_compliance_deadline'),
        is_medicare_60_day: gr.getValue('u_is_medicare_60_day') === 'true'
      });
    }

    return out;
  },

  listPayments: function() {
    var gr = new GlideRecord(this.paymentTable);
    gr.orderByDesc('u_payment_date');
    gr.setLimit(50);
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        patient_sys_id: gr.getValue('u_patient'),
        patient_name: gr.getDisplayValue('u_patient'),
        amount: parseFloat(gr.getValue('u_amount') || 0),
        payment_date: gr.getValue('u_payment_date'),
        payment_method: gr.getValue('u_payment_method'),
        status: gr.getValue('u_status')
      });
    }

    return out;
  },

  createPlan: function(input) {
    input = input || {};
    if (!input.patient_sys_id || !input.total_balance || !input.monthly_amount) {
      return { ok: false, message: 'patient_sys_id, total_balance, and monthly_amount are required' };
    }

    var totalBalance = parseFloat(input.total_balance || 0);
    var monthlyAmount = parseFloat(input.monthly_amount || 0);
    var numberOfPayments = parseInt(input.number_of_payments || 6, 10);

    if (totalBalance <= 0 || monthlyAmount <= 0 || numberOfPayments <= 0) {
      return { ok: false, message: 'Plan values must be greater than zero' };
    }

    var nextDate = new GlideDate();
    nextDate.addDaysUTC(30);

    var gr = new GlideRecord(this.planTable);
    gr.initialize();
    gr.setValue('u_patient', input.patient_sys_id);
    gr.setValue('u_claim', input.claim_sys_id || '');
    gr.setValue('u_total_balance', totalBalance);
    gr.setValue('u_monthly_amount', monthlyAmount);
    gr.setValue('u_remaining_balance', totalBalance);
    gr.setValue('u_number_of_payments', numberOfPayments);
    gr.setValue('u_payments_made', 0);
    gr.setValue('u_next_payment_date', nextDate.getValue());
    gr.setValue('u_status', 'active');
    var sysId = gr.insert();

    return { ok: true, plan_sys_id: sysId };
  },

  summary: function() {
    var plans = this.listPlans();
    var credits = this.listCredits();
    var payments = this.listPayments();

    var activePlans = 0;
    var outstanding = 0;
    var creditBalances = 0;
    var collected = 0;

    for (var i = 0; i < plans.length; i++) {
      if (plans[i].status === 'active') {
        activePlans++;
        outstanding += plans[i].remaining_balance;
      }
    }

    for (var j = 0; j < credits.length; j++) {
      if (credits[j].refund_status === 'identified') {
        creditBalances += credits[j].amount;
      }
    }

    for (var k = 0; k < payments.length; k++) {
      collected += payments[k].amount;
    }

    return {
      active_plans: activePlans,
      total_outstanding: outstanding,
      total_collected: collected,
      total_credit_balances: creditBalances
    };
  },

  runPaymentIntelligence: function(patientSysId) {
    if (!patientSysId) {
      return { ok: false, message: 'patient_sys_id is required' };
    }

    return this.bridge.invokeEdgeFunction('ai-payment-intelligence', { patient_id: patientSysId });
  },

  type: 'x_rcm_PatientFinancialService'
};
