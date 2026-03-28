var x_rcm_DenialService = Class.create();
x_rcm_DenialService.prototype = {
  initialize: function() {
    this.table = 'x_rcm_nexus_denial_workflow';
  },

  list: function(filters) {
    filters = filters || {};
    var gr = new GlideRecord(this.table);

    if (filters.status && filters.status !== 'all') {
      gr.addQuery('u_appeal_status', filters.status);
    }
    if (filters.category && filters.category !== 'all') {
      gr.addQuery('u_denial_category', filters.category);
    }

    gr.orderByDesc('sys_created_on');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push(this._toObj(gr));
    }
    return out;
  },

  updateWorkflow: function(sysId, updates) {
    var gr = new GlideRecord(this.table);
    if (!gr.get(sysId)) {
      return { ok: false, message: 'Denial workflow not found' };
    }

    if (updates.appeal_status) gr.setValue('u_appeal_status', updates.appeal_status);
    if (updates.owner_sys_id) gr.setValue('u_owner', updates.owner_sys_id);
    if (updates.appeal_letter) gr.setValue('u_appeal_letter', updates.appeal_letter);
    if (updates.work_notes) gr.setValue('u_work_notes', updates.work_notes);
    gr.update();

    return { ok: true };
  },

  stats: function() {
    var gr = new GlideRecord(this.table);
    gr.query();

    var total = 0;
    var totalAmount = 0;
    var open = 0;
    var appealed = 0;
    var overturned = 0;
    var writeOffs = 0;
    var byCat = {};
    var byGroup = {};

    while (gr.next()) {
      total++;
      var status = String(gr.getValue('u_appeal_status') || '');
      var category = String(gr.getValue('u_denial_category') || 'unknown');
      var group = String(gr.getValue('u_group_code') || 'unknown');
      var amount = parseFloat(gr.getValue('u_denial_amount') || 0);

      totalAmount += amount;
      if (status !== 'closed' && status !== 'write_off_approved' && status !== 'appeal_approved') open++;
      if (status === 'appeal_drafted' || status === 'appeal_submitted') appealed++;
      if (status === 'appeal_approved') overturned++;
      if (status === 'write_off_approved') writeOffs++;

      byCat[category] = (byCat[category] || 0) + 1;
      byGroup[group] = (byGroup[group] || 0) + amount;
    }

    return {
      total: total,
      totalAmount: totalAmount,
      open: open,
      appealed: appealed,
      overturned: overturned,
      writeOffs: writeOffs,
      byCat: byCat,
      byGroup: byGroup
    };
  },

  _toObj: function(gr) {
    return {
      sys_id: gr.getUniqueValue(),
      claim_sys_id: gr.getValue('u_claim'),
      denial_category: gr.getValue('u_denial_category'),
      appeal_status: gr.getValue('u_appeal_status'),
      group_code: gr.getValue('u_group_code'),
      denial_amount: parseFloat(gr.getValue('u_denial_amount') || 0)
    };
  },

  type: 'x_rcm_DenialService'
};
