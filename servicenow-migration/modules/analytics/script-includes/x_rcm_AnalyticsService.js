var x_rcm_AnalyticsService = Class.create();
x_rcm_AnalyticsService.prototype = {
  initialize: function() {
    this.claimTable = 'x_rcm_nexus_claim';
    this.denialTable = 'x_rcm_nexus_denial_workflow';
  },

  _claimStats: function() {
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
    var statusCounts = {};

    while (gr.next()) {
      total++;
      var status = String(gr.getValue('u_status') || 'unknown');
      var charged = parseFloat(gr.getValue('u_total_charge_amount') || 0);
      var paid = parseFloat(gr.getValue('u_total_paid_amount') || 0);
      var days = parseInt(gr.getValue('u_days_in_ar') || 0, 10);

      statusCounts[status] = (statusCounts[status] || 0) + 1;
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

    return {
      total: total,
      denied: denied,
      pendingAmount: pendingAmount,
      pendingCount: pendingCount,
      avgDaysAR: daysInArCount ? (daysInArSum / daysInArCount) : 0,
      collectionRate: totalCharged ? (totalPaid / totalCharged) * 100 : 0,
      cleanRate: total ? ((total - denied) / total) * 100 : 0,
      denialRate: total ? (denied / total) * 100 : 0,
      statusCounts: statusCounts
    };
  },

  _denialStats: function() {
    var gr = new GlideRecord(this.denialTable);
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

  overview: function() {
    var claimStats = this._claimStats();
    return {
      totalClaims: claimStats.total,
      pendingAmount: claimStats.pendingAmount,
      avgDaysAR: Number(claimStats.avgDaysAR.toFixed(1)),
      collectionRate: Number(claimStats.collectionRate.toFixed(1)),
      statusData: this._mapCounts(claimStats.statusCounts)
    };
  },

  denials: function() {
    var ds = this._denialStats();
    return {
      total: ds.total,
      totalAmount: ds.totalAmount,
      open: ds.open,
      overturnRate: ds.total ? Number(((ds.overturned / ds.total) * 100).toFixed(1)) : 0,
      categoryData: this._mapCounts(ds.byCat),
      groupCodeData: this._mapAmounts(ds.byGroup)
    };
  },

  benchmark: function() {
    var cs = this._claimStats();
    return [
      { metric: 'Clean Claim Rate', yours: Number(cs.cleanRate.toFixed(1)), benchmark: 95, unit: '%', lowerBetter: false },
      { metric: 'Days in A/R', yours: Number(cs.avgDaysAR.toFixed(1)), benchmark: 35, unit: ' days', lowerBetter: true },
      { metric: 'Collection Rate', yours: Number(cs.collectionRate.toFixed(1)), benchmark: 96, unit: '%', lowerBetter: false },
      { metric: 'Denial Rate', yours: Number(cs.denialRate.toFixed(1)), benchmark: 5, unit: '%', lowerBetter: true }
    ];
  },

  simulator: function() {
    var cs = this._claimStats();
    return {
      denialReductionRecovery: cs.pendingAmount * 0.05,
      arReductionCashFlow: cs.pendingAmount * 0.15,
      cleanClaimSavings: cs.total * 12
    };
  },

  _mapCounts: function(obj) {
    var out = [];
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        out.push({ name: k, value: obj[k] });
      }
    }
    return out;
  },

  _mapAmounts: function(obj) {
    var out = [];
    for (var k in obj) {
      if (obj.hasOwnProperty(k)) {
        out.push({ name: k, amount: obj[k] });
      }
    }
    return out;
  },

  type: 'x_rcm_AnalyticsService'
};
