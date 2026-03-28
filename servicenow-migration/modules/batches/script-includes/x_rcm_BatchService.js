var x_rcm_BatchService = Class.create();
x_rcm_BatchService.prototype = {
  initialize: function() {
    this.batchTable = 'x_rcm_nexus_batch';
    this.batchItemTable = 'x_rcm_nexus_batch_claim_item';
    this.claimTable = 'x_rcm_nexus_claim';
  },

  list: function() {
    var gr = new GlideRecord(this.batchTable);
    gr.orderByDesc('sys_created_on');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        batch_number: gr.getValue('u_batch_number'),
        batch_type: gr.getValue('u_batch_type'),
        clearinghouse: gr.getValue('u_clearinghouse'),
        claim_count: parseInt(gr.getValue('u_claim_count') || 0, 10),
        total_charges: parseFloat(gr.getValue('u_total_charges') || 0),
        status: gr.getValue('u_status') || 'pending',
        submitted_at: gr.getValue('u_submitted_at'),
        created_at: gr.getValue('sys_created_on')
      });
    }

    return out;
  },

  createBatch: function(input) {
    input = input || {};
    var claimIds = input.claim_sys_ids || [];

    if (!claimIds.length) {
      return { ok: false, message: 'claim_sys_ids is required' };
    }

    var claims = this._loadClaims(claimIds);
    if (!claims.length) {
      return { ok: false, message: 'No valid claims found for claim_sys_ids' };
    }

    var totalCharges = 0;
    for (var i = 0; i < claims.length; i++) {
      totalCharges += claims[i].total_charge_amount;
    }

    var batchGr = new GlideRecord(this.batchTable);
    batchGr.initialize();
    batchGr.setValue('u_batch_number', this._nextBatchNumber());
    batchGr.setValue('u_batch_type', input.batch_type || '837P');
    batchGr.setValue('u_clearinghouse', input.clearinghouse || 'default');
    batchGr.setValue('u_claim_count', claims.length);
    batchGr.setValue('u_total_charges', totalCharges);
    batchGr.setValue('u_status', 'pending');
    var batchSysId = batchGr.insert();

    this._insertBatchItems(batchSysId, claims);

    return {
      ok: true,
      batch_sys_id: batchSysId,
      batch_number: batchGr.getValue('u_batch_number'),
      claim_count: claims.length,
      total_charges: totalCharges
    };
  },

  summary: function() {
    var batches = this.list();
    var totalClaims = 0;
    var totalCharges = 0;
    var accepted = 0;
    var pending = 0;

    for (var i = 0; i < batches.length; i++) {
      var b = batches[i];
      totalClaims += b.claim_count;
      totalCharges += b.total_charges;
      if (b.status === 'accepted') accepted++;
      if (b.status === 'pending' || b.status === 'submitted') pending++;
    }

    return {
      total_batches: batches.length,
      total_claims: totalClaims,
      total_charges: totalCharges,
      accepted: accepted,
      pending: pending
    };
  },

  _loadClaims: function(claimIds) {
    var valid = {};
    for (var i = 0; i < claimIds.length; i++) {
      var id = String(claimIds[i] || '');
      if (id) valid[id] = true;
    }

    var gr = new GlideRecord(this.claimTable);
    gr.addQuery('sys_id', 'IN', Object.keys(valid).join(','));
    gr.query();

    var out = [];
    while (gr.next()) {
      var status = String(gr.getValue('u_status') || '');
      if (status === 'paid' || status === 'void' || status === 'denied') {
        continue;
      }
      out.push({
        sys_id: gr.getUniqueValue(),
        claim_number: gr.getValue('u_claim_number'),
        total_charge_amount: parseFloat(gr.getValue('u_total_charge_amount') || 0)
      });
    }

    return out;
  },

  _insertBatchItems: function(batchSysId, claims) {
    for (var i = 0; i < claims.length; i++) {
      var item = new GlideRecord(this.batchItemTable);
      item.initialize();
      item.setValue('u_batch', batchSysId);
      item.setValue('u_claim', claims[i].sys_id);
      item.setValue('u_line_number', i + 1);
      item.insert();
    }
  },

  _nextBatchNumber: function() {
    var dt = new GlideDateTime();
    var suffix = String(dt.getNumericValue()).substr(-8);
    return 'BAT-' + suffix;
  },

  type: 'x_rcm_BatchService'
};
