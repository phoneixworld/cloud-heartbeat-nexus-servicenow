var x_rcm_RtaService = Class.create();
x_rcm_RtaService.prototype = {
  initialize: function() {
    this.configTable = 'x_rcm_nexus_payer_rta_config';
    this.txnTable = 'x_rcm_nexus_rta_txn';
    this.claimTable = 'x_rcm_nexus_claim';
    this.auditTable = 'x_rcm_nexus_claim_audit_log';
  },

  getConfig: function() {
    var gr = new GlideRecord(this.configTable);
    gr.orderBy('u_payer');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        payer_sys_id: gr.getValue('u_payer'),
        rta_enabled: gr.getValue('u_rta_enabled') === 'true',
        endpoint: gr.getValue('u_endpoint')
      });
    }
    return out;
  },

  getTransactions: function(claimSysId) {
    var gr = new GlideRecord(this.txnTable);
    if (claimSysId) gr.addQuery('u_claim', claimSysId);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(50);
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        claim_sys_id: gr.getValue('u_claim'),
        payer_sys_id: gr.getValue('u_payer'),
        response_status: gr.getValue('u_response_status'),
        plan_pays: parseFloat(gr.getValue('u_plan_pays') || 0),
        patient_responsibility: parseFloat(gr.getValue('u_patient_responsibility') || 0),
        response_time_ms: parseInt(gr.getValue('u_response_time_ms') || 0, 10)
      });
    }
    return out;
  },

  submit: function(claimSysId) {
    var claim = new GlideRecord(this.claimTable);
    if (!claim.get(claimSysId)) {
      return { ok: false, message: 'Claim not found' };
    }

    var cfg = this._getPayerConfig(claim.getValue('u_payer'));
    if (!cfg || !cfg.rta_enabled) {
      return { ok: false, message: 'Payer does not support Real-Time Adjudication' };
    }

    var charged = parseFloat(claim.getValue('u_total_charge_amount') || 0);
    var approved = Math.random() > 0.15;
    var totalAllowed = approved ? Math.round(charged * (0.85 + Math.random() * 0.1) * 100) / 100 : 0;
    var copay = approved ? 25 : 0;
    var coinsurance = approved ? Math.round(totalAllowed * 0.2 * 100) / 100 : 0;
    var patientResp = copay + coinsurance;
    var planPays = approved ? Math.round((totalAllowed - patientResp) * 100) / 100 : 0;
    var responseTimeMs = Math.floor(Math.random() * 800) + 400;

    var txnId = this._insertTransaction({
      claim_sys_id: claimSysId,
      payer_sys_id: claim.getValue('u_payer'),
      response_status: approved ? 'approved' : 'pended',
      total_allowed: totalAllowed,
      patient_responsibility: patientResp,
      plan_pays: planPays,
      response_time_ms: responseTimeMs,
      transaction_id: 'RTA-' + new GlideDateTime().getNumericValue()
    });

    if (approved) {
      claim.setValue('u_rta_status', 'approved');
      claim.setValue('u_rta_eligible', true);
      claim.setValue('u_total_paid_amount', planPays);
      claim.setValue('u_patient_responsibility', patientResp);
      claim.setValue('u_status', 'paid');
    } else {
      claim.setValue('u_rta_status', 'pended');
      claim.setValue('u_rta_eligible', true);
    }
    claim.update();

    this._insertAudit(claimSysId, approved, txnId, responseTimeMs, planPays);

    return {
      ok: true,
      transaction_sys_id: txnId,
      approved: approved,
      plan_pays: planPays,
      patient_responsibility: patientResp
    };
  },

  _getPayerConfig: function(payerSysId) {
    var gr = new GlideRecord(this.configTable);
    gr.addQuery('u_payer', payerSysId);
    gr.addQuery('u_rta_enabled', true);
    gr.setLimit(1);
    gr.query();

    if (!gr.next()) return null;

    return {
      sys_id: gr.getUniqueValue(),
      rta_enabled: true,
      endpoint: gr.getValue('u_endpoint')
    };
  },

  _insertTransaction: function(txn) {
    var gr = new GlideRecord(this.txnTable);
    gr.initialize();
    gr.setValue('u_claim', txn.claim_sys_id);
    gr.setValue('u_payer', txn.payer_sys_id);
    gr.setValue('u_transaction_id', txn.transaction_id);
    gr.setValue('u_response_status', txn.response_status);
    gr.setValue('u_total_allowed', txn.total_allowed);
    gr.setValue('u_patient_responsibility', txn.patient_responsibility);
    gr.setValue('u_plan_pays', txn.plan_pays);
    gr.setValue('u_response_time_ms', txn.response_time_ms);
    return gr.insert();
  },

  _insertAudit: function(claimSysId, approved, txnId, responseTimeMs, planPays) {
    var gr = new GlideRecord(this.auditTable);
    gr.initialize();
    gr.setValue('u_claim', claimSysId);
    gr.setValue('u_action', 'RTA ' + (approved ? 'approved' : 'pended') + ' - ' + txnId);
    gr.setValue('u_action_category', 'rta_submission');
    gr.setValue('u_new_value', JSON.stringify({
      response_status: approved ? 'approved' : 'pended',
      plan_pays: planPays,
      response_time_ms: responseTimeMs
    }));
    gr.insert();
  },

  type: 'x_rcm_RtaService'
};
