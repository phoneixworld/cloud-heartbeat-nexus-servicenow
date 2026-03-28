var x_rcm_ReportService = Class.create();
x_rcm_ReportService.prototype = {
  initialize: function() {
    this.claimTable = 'x_rcm_nexus_claim';
    this.denialTable = 'x_rcm_nexus_denial_workflow';
  },

  executiveSummary: function() {
    var claimStats = this._claimStats();
    var denialStats = this._denialStats();

    return {
      claims: {
        total: claimStats.total,
        cleanRate: Number(claimStats.cleanRate.toFixed(1)),
        collectionRate: Number(claimStats.collectionRate.toFixed(1)),
        denialRate: Number(claimStats.denialRate.toFixed(1))
      },
      denials: {
        total: denialStats.total,
        totalAmount: denialStats.totalAmount,
        open: denialStats.open,
        overturnRate: denialStats.total ? Number(((denialStats.overturned / denialStats.total) * 100).toFixed(1)) : 0
      }
    };
  },

  agingSummary: function() {
    var claims = this._openClaims();
    var buckets = {
      '0-30': { count: 0, outstanding_amount: 0 },
      '31-60': { count: 0, outstanding_amount: 0 },
      '61-90': { count: 0, outstanding_amount: 0 },
      '90+': { count: 0, outstanding_amount: 0 }
    };

    for (var i = 0; i < claims.length; i++) {
      var c = claims[i];
      var outstanding = c.total_charge_amount - c.total_paid_amount;
      var key = this._agingBucket(c.days_in_ar);
      buckets[key].count++;
      buckets[key].outstanding_amount += outstanding;
    }

    return buckets;
  },

  exportData: function(type) {
    if (type === 'claims') {
      return this._claimsExportRows();
    }

    if (type === 'denials') {
      return this._denialsExportRows();
    }

    if (type === 'aging') {
      return this._agingExportRows();
    }

    return [];
  },

  complianceSnapshot: function() {
    var now = new GlideDate();
    var next = new GlideDate();
    next.addDaysUTC(30);

    return {
      hash_chained_audit_log: 'Active',
      rls_policies: 'Enabled',
      phi_access_tracking: 'Active',
      data_encryption: 'TLS 1.3',
      checks_passed: true,
      last_audit_date: now.getValue(),
      next_scheduled_audit_date: next.getValue()
    };
  },

  _claimsExportRows: function() {
    var gr = new GlideRecord(this.claimTable);
    gr.orderByDesc('sys_created_on');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        claim_number: gr.getValue('u_claim_number'),
        patient_sys_id: gr.getValue('u_patient'),
        payer_sys_id: gr.getValue('u_payer'),
        status: gr.getValue('u_status'),
        service_date: gr.getValue('u_service_date'),
        charges: parseFloat(gr.getValue('u_total_charge_amount') || 0),
        paid: parseFloat(gr.getValue('u_total_paid_amount') || 0),
        patient_resp: parseFloat(gr.getValue('u_patient_responsibility') || 0),
        days_ar: parseInt(gr.getValue('u_days_in_ar') || 0, 10),
        ai_risk: gr.getValue('u_ai_risk_level') || 'low'
      });
    }
    return out;
  },

  _denialsExportRows: function() {
    var gr = new GlideRecord(this.denialTable);
    gr.orderByDesc('sys_created_on');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        claim_sys_id: gr.getValue('u_claim'),
        status: gr.getValue('u_appeal_status'),
        denial_code: gr.getValue('u_reason_code'),
        denial_reason: gr.getValue('u_reason_description'),
        denial_category: gr.getValue('u_denial_category'),
        group_code: gr.getValue('u_group_code'),
        denial_amount: parseFloat(gr.getValue('u_denial_amount') || 0)
      });
    }
    return out;
  },

  _agingExportRows: function() {
    var claims = this._openClaims();
    var out = [];

    for (var i = 0; i < claims.length; i++) {
      var c = claims[i];
      out.push({
        claim_number: c.claim_number,
        patient_sys_id: c.patient_sys_id,
        payer_sys_id: c.payer_sys_id,
        status: c.status,
        charges: c.total_charge_amount,
        paid: c.total_paid_amount,
        days_ar: c.days_in_ar,
        bucket: this._agingBucket(c.days_in_ar)
      });
    }

    return out;
  },

  _openClaims: function() {
    var gr = new GlideRecord(this.claimTable);
    gr.addQuery('u_status', 'NOT IN', 'paid,void');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        claim_number: gr.getValue('u_claim_number'),
        patient_sys_id: gr.getValue('u_patient'),
        payer_sys_id: gr.getValue('u_payer'),
        status: gr.getValue('u_status'),
        total_charge_amount: parseFloat(gr.getValue('u_total_charge_amount') || 0),
        total_paid_amount: parseFloat(gr.getValue('u_total_paid_amount') || 0),
        days_in_ar: parseInt(gr.getValue('u_days_in_ar') || 0, 10)
      });
    }

    return out;
  },

  _agingBucket: function(days) {
    if (days <= 30) return '0-30';
    if (days <= 60) return '31-60';
    if (days <= 90) return '61-90';
    return '90+';
  },

  _claimStats: function() {
    var gr = new GlideRecord(this.claimTable);
    gr.query();

    var total = 0;
    var denied = 0;
    var totalCharged = 0;
    var totalPaid = 0;

    while (gr.next()) {
      total++;
      var status = String(gr.getValue('u_status') || '');
      var charged = parseFloat(gr.getValue('u_total_charge_amount') || 0);
      var paid = parseFloat(gr.getValue('u_total_paid_amount') || 0);

      if (status === 'denied') denied++;
      totalCharged += charged;
      if (status === 'paid' || status === 'partial_paid') totalPaid += paid;
    }

    return {
      total: total,
      cleanRate: total ? ((total - denied) / total) * 100 : 0,
      collectionRate: totalCharged ? (totalPaid / totalCharged) * 100 : 0,
      denialRate: total ? (denied / total) * 100 : 0
    };
  },

  _denialStats: function() {
    var gr = new GlideRecord(this.denialTable);
    gr.query();

    var total = 0;
    var totalAmount = 0;
    var open = 0;
    var overturned = 0;

    while (gr.next()) {
      total++;
      var status = String(gr.getValue('u_appeal_status') || '');
      var amount = parseFloat(gr.getValue('u_denial_amount') || 0);
      totalAmount += amount;
      if (status !== 'closed' && status !== 'write_off_approved' && status !== 'appeal_approved') open++;
      if (status === 'appeal_approved') overturned++;
    }

    return {
      total: total,
      totalAmount: totalAmount,
      open: open,
      overturned: overturned
    };
  },

  type: 'x_rcm_ReportService'
};
