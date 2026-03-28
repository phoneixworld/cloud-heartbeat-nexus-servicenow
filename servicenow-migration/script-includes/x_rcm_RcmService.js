var x_rcm_RcmService = Class.create();
x_rcm_RcmService.prototype = {
  initialize: function() {
    this.claimTable = 'x_rcm_nexus_claim';
    this.denialTable = 'x_rcm_nexus_denial_workflow';
    this.bridge = new x_rcm_SupabaseBridge();
  },

  getClaim: function(sysId) {
    var gr = new GlideRecord(this.claimTable);
    if (!gr.get(sysId)) {
      return null;
    }

    return {
      sys_id: gr.getUniqueValue(),
      number: gr.getValue('u_claim_number'),
      status: gr.getValue('u_status'),
      total_charge_amount: gr.getValue('u_total_charge_amount'),
      total_paid_amount: gr.getValue('u_total_paid_amount')
    };
  },

  createClaim: function(input) {
    var gr = new GlideRecord(this.claimTable);
    gr.initialize();
    gr.setValue('u_claim_number', input.claim_number || '');
    gr.setValue('u_status', input.claim_status || 'new');
    gr.setValue('u_total_charge_amount', input.total_charge_amount || 0);
    gr.setValue('u_total_paid_amount', input.total_paid_amount || 0);
    gr.setValue('u_patient', input.patient_sys_id || '');
    gr.setValue('u_payer', input.payer_sys_id || '');

    var sysId = gr.insert();
    return this.getClaim(sysId);
  },

  runScrubForClaim: function(claimSysId) {
    var claim = this.getClaim(claimSysId);
    if (!claim) {
      return {
        ok: false,
        message: 'Claim not found'
      };
    }

    var payload = {
      claim_id: claim.sys_id,
      claim_number: claim.number,
      total_charge_amount: claim.total_charge_amount
    };

    return this.bridge.invokeEdgeFunction('scrub-claim', payload);
  },

  predictDenialRisk: function(claimSysId) {
    var claim = this.getClaim(claimSysId);
    if (!claim) {
      return {
        ok: false,
        message: 'Claim not found'
      };
    }

    var payload = {
      claim_id: claim.sys_id,
      claim_status: claim.status,
      total_charge_amount: claim.total_charge_amount
    };

    return this.bridge.invokeEdgeFunction('ai-denial-prediction', payload);
  },

  type: 'x_rcm_RcmService'
};
