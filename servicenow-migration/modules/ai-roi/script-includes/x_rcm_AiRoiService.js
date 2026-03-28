var x_rcm_AiRoiService = Class.create();
x_rcm_AiRoiService.prototype = {
  initialize: function() {
    this.claimTable = 'x_rcm_nexus_claim';
    this.denialTable = 'x_rcm_nexus_denial_workflow';
    this.predictionTable = 'x_rcm_nexus_ml_prediction';
    this.snapshotTable = 'x_rcm_nexus_ai_roi_snapshot';
  },

  metrics: function() {
    var claims = this._claimStats();
    var denials = this._denialStats();
    var predictions = this._predictionStats();

    var estimatedDenialsPrevented = Math.round(claims.highRiskCaught * 0.6);
    var avgClaimCharge = claims.totalClaims > 0 ? (claims.totalCharges / claims.totalClaims) : 0;
    var revenueProtectedByPrediction = estimatedDenialsPrevented * avgClaimCharge;

    var avgDenialAmount = denials.totalDenials > 0 ? (denials.denialAmount / denials.totalDenials) : 0;
    var revenueRecoveredByAppeals = denials.resolvedAppeals * avgDenialAmount;

    var roiCapabilities = [
      {
        capability: 'denial_prediction',
        label: 'Denial Prediction',
        description: 'Prevents denials before submission',
        revenueProtected: revenueProtectedByPrediction,
        revenueGenerated: 0,
        costSaved: estimatedDenialsPrevented * 75,
        timeSavedHours: estimatedDenialsPrevented * 0.5,
        accuracyTarget: 90,
        currentAccuracy: 87,
        adoptionRate: claims.totalClaims > 0 ? Math.min(100, Math.round((predictions.totalPredictions / claims.totalClaims) * 100)) : 0,
        status: 'on-track'
      },
      {
        capability: 'coding_suggestions',
        label: 'Clinical Coding AI',
        description: 'Autonomous code suggestions and CDI',
        revenueProtected: 0,
        revenueGenerated: claims.totalCharges * 0.03,
        costSaved: claims.totalClaims * 8,
        timeSavedHours: claims.totalClaims * 0.15,
        accuracyTarget: 85,
        currentAccuracy: 82,
        adoptionRate: 74,
        status: 'on-track'
      },
      {
        capability: 'appeal_generator',
        label: 'Appeal Generator',
        description: 'AI drafted appeal letters for denials',
        revenueProtected: 0,
        revenueGenerated: revenueRecoveredByAppeals,
        costSaved: denials.appealsWithLetters * 120,
        timeSavedHours: denials.appealsWithLetters * 2,
        accuracyTarget: 75,
        currentAccuracy: 71,
        adoptionRate: denials.totalDenials > 0 ? Math.min(100, Math.round((denials.appealsWithLetters / denials.totalDenials) * 100)) : 0,
        status: 'on-track'
      },
      {
        capability: 'payment_intelligence',
        label: 'Payment Intelligence',
        description: 'Patient payment likelihood and strategies',
        revenueProtected: 0,
        revenueGenerated: claims.totalPaid * 0.05,
        costSaved: claims.totalClaims * 3,
        timeSavedHours: claims.totalClaims * 0.08,
        accuracyTarget: 80,
        currentAccuracy: 78,
        adoptionRate: 65,
        status: 'on-track'
      },
      {
        capability: 'rta_prediction',
        label: 'RTA Prediction',
        description: 'Real-time vs batch routing optimization',
        revenueProtected: claims.totalCharges * 0.01,
        revenueGenerated: 0,
        costSaved: claims.totalClaims * 2,
        timeSavedHours: claims.totalClaims * 0.02,
        accuracyTarget: 85,
        currentAccuracy: 88,
        adoptionRate: 58,
        status: 'exceeding'
      },
      {
        capability: 'anomaly_detection',
        label: 'Anomaly Detection',
        description: 'Fraud and anomaly detection',
        revenueProtected: claims.totalCharges * 0.005,
        revenueGenerated: 0,
        costSaved: 15000,
        timeSavedHours: 40,
        accuracyTarget: 95,
        currentAccuracy: 92,
        adoptionRate: 100,
        status: 'on-track'
      }
    ];

    var totals = this._rollupTotals(roiCapabilities);
    var totalValue = totals.revenueProtected + totals.revenueGenerated + totals.costSaved;

    return {
      source: {
        totalClaims: claims.totalClaims,
        totalCharges: claims.totalCharges,
        totalPaid: claims.totalPaid,
        highRiskCaught: claims.highRiskCaught,
        totalDenials: denials.totalDenials,
        denialAmount: denials.denialAmount,
        appealsWithLetters: denials.appealsWithLetters,
        resolvedAppeals: denials.resolvedAppeals,
        totalPredictions: predictions.totalPredictions
      },
      roiCapabilities: roiCapabilities,
      totals: totals,
      annualProjection: {
        annualizedValue: totalValue * 12,
        annualizedHoursSaved: totals.timeSaved * 12,
        capabilitiesOnTrack: this._countOnTrack(roiCapabilities),
        capabilityCount: roiCapabilities.length,
        averageAdoptionRate: this._avgAdoption(roiCapabilities)
      }
    };
  },

  snapshot: function() {
    var payload = this.metrics();

    var gr = new GlideRecord(this.snapshotTable);
    gr.initialize();
    gr.setValue('u_total_value', payload.totals.revenueProtected + payload.totals.revenueGenerated + payload.totals.costSaved);
    gr.setValue('u_revenue_protected', payload.totals.revenueProtected);
    gr.setValue('u_revenue_generated', payload.totals.revenueGenerated);
    gr.setValue('u_cost_saved', payload.totals.costSaved);
    gr.setValue('u_time_saved_hours', payload.totals.timeSaved);
    gr.setValue('u_raw_snapshot', JSON.stringify(payload));
    var sysId = gr.insert();

    return {
      ok: true,
      snapshot_sys_id: sysId,
      metrics: payload
    };
  },

  latestSnapshot: function() {
    var gr = new GlideRecord(this.snapshotTable);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(1);
    gr.query();

    if (!gr.next()) {
      return null;
    }

    return {
      sys_id: gr.getUniqueValue(),
      total_value: parseFloat(gr.getValue('u_total_value') || 0),
      revenue_protected: parseFloat(gr.getValue('u_revenue_protected') || 0),
      revenue_generated: parseFloat(gr.getValue('u_revenue_generated') || 0),
      cost_saved: parseFloat(gr.getValue('u_cost_saved') || 0),
      time_saved_hours: parseFloat(gr.getValue('u_time_saved_hours') || 0),
      raw_snapshot: gr.getValue('u_raw_snapshot'),
      created_at: gr.getValue('sys_created_on')
    };
  },

  _claimStats: function() {
    var out = {
      totalClaims: 0,
      totalCharges: 0,
      totalPaid: 0,
      highRiskCaught: 0
    };

    var gr = new GlideRecord(this.claimTable);
    gr.setLimit(500);
    gr.query();
    while (gr.next()) {
      out.totalClaims++;
      out.totalCharges += parseFloat(gr.getValue('u_total_charge_amount') || 0);
      out.totalPaid += parseFloat(gr.getValue('u_total_paid_amount') || 0);

      var risk = (gr.getValue('u_ai_risk_level') || '').toLowerCase();
      if (risk === 'high' || risk === 'critical') {
        out.highRiskCaught++;
      }
    }

    return out;
  },

  _denialStats: function() {
    var out = {
      totalDenials: 0,
      denialAmount: 0,
      appealsWithLetters: 0,
      resolvedAppeals: 0
    };

    var gr = new GlideRecord(this.denialTable);
    gr.setLimit(500);
    gr.query();
    while (gr.next()) {
      out.totalDenials++;
      out.denialAmount += parseFloat(gr.getValue('u_denial_amount') || 0);

      if (gr.getValue('u_appeal_letter')) {
        out.appealsWithLetters++;
      }
      if (gr.getValue('u_appeal_status') === 'resolved') {
        out.resolvedAppeals++;
      }
    }

    return out;
  },

  _predictionStats: function() {
    var out = { totalPredictions: 0 };
    var gr = new GlideRecord(this.predictionTable);
    gr.setLimit(500);
    gr.query();
    while (gr.next()) {
      out.totalPredictions++;
    }
    return out;
  },

  _rollupTotals: function(capabilities) {
    var totals = {
      revenueProtected: 0,
      revenueGenerated: 0,
      costSaved: 0,
      timeSaved: 0
    };

    for (var i = 0; i < capabilities.length; i++) {
      totals.revenueProtected += capabilities[i].revenueProtected;
      totals.revenueGenerated += capabilities[i].revenueGenerated;
      totals.costSaved += capabilities[i].costSaved;
      totals.timeSaved += capabilities[i].timeSavedHours;
    }

    return totals;
  },

  _countOnTrack: function(capabilities) {
    var count = 0;
    for (var i = 0; i < capabilities.length; i++) {
      if (capabilities[i].status !== 'below') {
        count++;
      }
    }
    return count;
  },

  _avgAdoption: function(capabilities) {
    if (capabilities.length === 0) return 0;

    var sum = 0;
    for (var i = 0; i < capabilities.length; i++) {
      sum += capabilities[i].adoptionRate;
    }

    return Math.round(sum / capabilities.length);
  },

  type: 'x_rcm_AiRoiService'
};
