var x_rcm_ClaimsService = Class.create();
x_rcm_ClaimsService.prototype = {
  initialize: function() {
    this.claimTable = 'x_rcm_nexus_claim';
    this.lineItemTable = 'x_rcm_nexus_claim_line_item';
  },

  listClaims: function(filters) {
    filters = filters || {};
    var gr = new GlideRecord(this.claimTable);

    if (filters.status && filters.status !== 'all') {
      gr.addQuery('u_status', filters.status);
    }
    if (filters.payer_sys_id && filters.payer_sys_id !== 'all') {
      gr.addQuery('u_payer', filters.payer_sys_id);
    }

    gr.orderByDesc('sys_created_on');
    gr.query();

    var results = [];
    while (gr.next()) {
      var row = this._toClaimObject(gr);
      if (filters.search && !this._matchesSearch(row, filters.search)) {
        continue;
      }
      results.push(row);
    }

    return results;
  },

  createClaim: function(input) {
    var claimGr = new GlideRecord(this.claimTable);
    claimGr.initialize();
    claimGr.setValue('u_claim_number', input.claim_number || '');
    claimGr.setValue('u_status', input.claim_status || 'draft');
    claimGr.setValue('u_patient', input.patient_sys_id || '');
    claimGr.setValue('u_payer', input.payer_sys_id || '');
    claimGr.setValue('u_provider', input.provider_sys_id || '');
    claimGr.setValue('u_service_date', input.service_date || '');
    claimGr.setValue('u_total_charge_amount', input.total_charge_amount || 0);
    claimGr.setValue('u_total_paid_amount', input.total_paid_amount || 0);

    var claimSysId = claimGr.insert();

    if (input.line_items && input.line_items.length) {
      this._insertLineItems(claimSysId, input.line_items);
    }

    var out = this.getClaim(claimSysId);
    return out;
  },

  getClaim: function(sysId) {
    var gr = new GlideRecord(this.claimTable);
    if (!gr.get(sysId)) {
      return null;
    }

    var claim = this._toClaimObject(gr);
    claim.line_items = this._getLineItems(sysId);
    return claim;
  },

  calculateStats: function() {
    var gr = new GlideRecord(this.claimTable);
    gr.query();

    var total = 0;
    var denied = 0;
    var totalCharged = 0;
    var totalPaid = 0;
    var pendingAmount = 0;
    var pendingCount = 0;
    var daysInArSum = 0;
    var daysInArCount = 0;

    while (gr.next()) {
      total++;

      var status = String(gr.getValue('u_status') || '');
      var charged = parseFloat(gr.getValue('u_total_charge_amount') || 0);
      var paid = parseFloat(gr.getValue('u_total_paid_amount') || 0);
      var days = parseInt(gr.getValue('u_days_in_ar') || 0, 10);

      if (status === 'denied') denied++;
      totalCharged += charged;
      if (status === 'paid' || status === 'partial_paid') totalPaid += paid;
      if (status !== 'paid' && status !== 'void') {
        pendingAmount += (charged - paid);
        pendingCount++;
      }
      if (days > 0) {
        daysInArSum += days;
        daysInArCount++;
      }
    }

    var cleanRate = total ? ((total - denied) / total) * 100 : 0;
    var collectionRate = totalCharged ? (totalPaid / totalCharged) * 100 : 0;
    var denialRate = total ? (denied / total) * 100 : 0;
    var avgDaysAR = daysInArCount ? (daysInArSum / daysInArCount) : 0;

    return {
      total: total,
      denied: denied,
      cleanRate: cleanRate.toFixed(1),
      avgDaysAR: avgDaysAR.toFixed(1),
      collectionRate: collectionRate.toFixed(1),
      denialRate: denialRate.toFixed(1),
      pendingAmount: pendingAmount,
      pendingCount: pendingCount
    };
  },

  _insertLineItems: function(claimSysId, items) {
    for (var i = 0; i < items.length; i++) {
      var li = items[i];
      var gr = new GlideRecord(this.lineItemTable);
      gr.initialize();
      gr.setValue('u_claim', claimSysId);
      gr.setValue('u_cpt_code', li.cpt_code || '');
      gr.setValue('u_icd10_code', li.icd10_code || '');
      gr.setValue('u_units', li.units || 1);
      gr.setValue('u_charge_amount', li.charge_amount || 0);
      gr.setValue('u_allowed_amount', li.allowed_amount || 0);
      gr.setValue('u_modifier', li.modifier || '');
      gr.insert();
    }
  },

  _getLineItems: function(claimSysId) {
    var gr = new GlideRecord(this.lineItemTable);
    gr.addQuery('u_claim', claimSysId);
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        cpt_code: gr.getValue('u_cpt_code'),
        icd10_code: gr.getValue('u_icd10_code'),
        units: parseInt(gr.getValue('u_units') || 0, 10),
        charge_amount: parseFloat(gr.getValue('u_charge_amount') || 0),
        allowed_amount: parseFloat(gr.getValue('u_allowed_amount') || 0),
        modifier: gr.getValue('u_modifier')
      });
    }
    return out;
  },

  _toClaimObject: function(gr) {
    return {
      sys_id: gr.getUniqueValue(),
      claim_number: gr.getValue('u_claim_number'),
      claim_status: gr.getValue('u_status'),
      patient_sys_id: gr.getValue('u_patient'),
      payer_sys_id: gr.getValue('u_payer'),
      provider_sys_id: gr.getValue('u_provider'),
      service_date: gr.getValue('u_service_date'),
      total_charge_amount: parseFloat(gr.getValue('u_total_charge_amount') || 0),
      total_paid_amount: parseFloat(gr.getValue('u_total_paid_amount') || 0),
      days_in_ar: parseInt(gr.getValue('u_days_in_ar') || 0, 10)
    };
  },

  _matchesSearch: function(row, rawSearch) {
    var s = String(rawSearch || '').toLowerCase();
    if (!s) return true;
    return String(row.claim_number || '').toLowerCase().indexOf(s) > -1;
  },

  type: 'x_rcm_ClaimsService'
};
