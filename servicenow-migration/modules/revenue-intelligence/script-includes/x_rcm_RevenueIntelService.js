var x_rcm_RevenueIntelService = Class.create();
x_rcm_RevenueIntelService.prototype = {
  initialize: function() {
    this.claimTable = 'x_rcm_nexus_claim';
    this.payerTable = 'x_rcm_nexus_payer';
    this.denialTable = 'x_rcm_nexus_denial_workflow';
  },

  metrics: function() {
    var claims = this._claims();
    var totalCharges = 0;
    var totalPaid = 0;
    var totalDays = 0;
    var deniedCount = 0;

    for (var i = 0; i < claims.length; i++) {
      var c = claims[i];
      totalCharges += c.total_charge_amount;
      totalPaid += c.total_paid_amount;
      totalDays += c.days_in_ar;
      if (c.status === 'denied') deniedCount++;
    }

    var count = claims.length;
    var netCollectionRate = totalCharges > 0 ? (totalPaid / totalCharges) * 100 : 0;
    var fprr = count > 0 ? ((count - deniedCount) / count) * 100 : 0;
    var avgDaysAR = count > 0 ? totalDays / count : 0;

    var totalDenialAmount = 0;
    var denialGr = new GlideRecord(this.denialTable);
    denialGr.query();
    while (denialGr.next()) {
      totalDenialAmount += parseFloat(denialGr.getValue('u_denial_amount') || 0);
    }

    return {
      total_charges: totalCharges,
      total_collected: totalPaid,
      net_collection_rate: Number(netCollectionRate.toFixed(1)),
      fprr: Number(fprr.toFixed(1)),
      avg_days_ar: Number(avgDaysAR.toFixed(1)),
      total_denial_amount: totalDenialAmount,
      claim_count: count
    };
  },

  denialCategories: function() {
    var gr = new GlideRecord(this.denialTable);
    gr.query();

    var map = {};
    while (gr.next()) {
      var cat = String(gr.getValue('u_denial_category') || 'unknown');
      var amount = parseFloat(gr.getValue('u_denial_amount') || 0);
      map[cat] = (map[cat] || 0) + amount;
    }

    var out = [];
    for (var key in map) {
      if (map.hasOwnProperty(key)) {
        out.push({ name: key, value: map[key] });
      }
    }
    return out;
  },

  payerYield: function() {
    var payers = this._payers();
    var claims = this._claims();
    var out = [];

    for (var i = 0; i < payers.length; i++) {
      var p = payers[i];
      var pClaims = [];
      for (var j = 0; j < claims.length; j++) {
        if (claims[j].payer_sys_id === p.sys_id) pClaims.push(claims[j]);
      }

      if (!pClaims.length) continue;

      var charged = 0;
      var paid = 0;
      for (var k = 0; k < pClaims.length; k++) {
        charged += pClaims[k].total_charge_amount;
        paid += pClaims[k].total_paid_amount;
      }

      out.push({
        payer_name: p.name,
        claims: pClaims.length,
        charged: charged,
        collected: paid,
        yield: charged > 0 ? Number(((paid / charged) * 100).toFixed(1)) : 0
      });
    }

    return out;
  },

  monthlyTrend: function() {
    var claims = this._claims();
    var map = {};

    for (var i = 0; i < claims.length; i++) {
      var date = claims[i].service_date || '';
      var month = date ? String(date).substring(5, 7) : '00';

      if (!map[month]) {
        map[month] = { month: month, charges: 0, collected: 0 };
      }

      map[month].charges += claims[i].total_charge_amount;
      map[month].collected += claims[i].total_paid_amount;
    }

    var out = [];
    for (var key in map) {
      if (map.hasOwnProperty(key)) out.push(map[key]);
    }

    out.sort(function(a, b) {
      return parseInt(a.month, 10) - parseInt(b.month, 10);
    });

    if (out.length > 6) {
      return out.slice(out.length - 6);
    }

    return out;
  },

  simulate: function(monthlyCharges, denialRate, collectionRate) {
    var charges = parseFloat(monthlyCharges || 0);
    var dRate = parseFloat(denialRate || 0);
    var cRate = parseFloat(collectionRate || 0);

    if (charges < 0 || dRate < 0 || cRate < 0) {
      return { ok: false, message: 'Simulation values must be non-negative' };
    }

    var projected = charges * (1 - dRate / 100) * (cRate / 100);
    var leakage = charges - projected;

    return {
      ok: true,
      projected_revenue: projected,
      revenue_leakage: leakage,
      one_percent_denial_recovery: charges * 0.01 * (cRate / 100)
    };
  },

  _claims: function() {
    var gr = new GlideRecord(this.claimTable);
    gr.setLimit(500);
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        payer_sys_id: gr.getValue('u_payer'),
        status: gr.getValue('u_status'),
        total_charge_amount: parseFloat(gr.getValue('u_total_charge_amount') || 0),
        total_paid_amount: parseFloat(gr.getValue('u_total_paid_amount') || 0),
        days_in_ar: parseInt(gr.getValue('u_days_in_ar') || 0, 10),
        service_date: gr.getValue('u_service_date')
      });
    }

    return out;
  },

  _payers: function() {
    var gr = new GlideRecord(this.payerTable);
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        name: gr.getValue('u_name')
      });
    }

    return out;
  },

  type: 'x_rcm_RevenueIntelService'
};
