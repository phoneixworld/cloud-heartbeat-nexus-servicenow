var x_rcm_StpService = Class.create();
x_rcm_StpService.prototype = {
  initialize: function() {
    this.runTable = 'x_rcm_nexus_stp_run';
    this.claimTable = 'x_rcm_nexus_claim';
  },

  metrics: function() {
    var runs = this._runs(500);
    var total = runs.length;
    var touchless = 0;
    var manual = 0;
    var failed = 0;
    var timeSum = 0;
    var timeCount = 0;

    for (var i = 0; i < runs.length; i++) {
      var r = runs[i];
      if (r.is_touchless && r.status === 'completed') touchless++;
      if (!r.is_touchless || r.status === 'manual_review') manual++;
      if (r.status === 'failed') failed++;
      if (r.processing_time_ms > 0) {
        timeSum += r.processing_time_ms;
        timeCount++;
      }
    }

    return {
      total_runs: total,
      touchless_runs: touchless,
      manual_review_runs: manual,
      failed_runs: failed,
      stp_rate: total > 0 ? Number(((touchless / total) * 100).toFixed(1)) : 0,
      avg_processing_time_ms: timeCount > 0 ? Math.round(timeSum / timeCount) : 0
    };
  },

  stageBreakdown: function() {
    var runs = this._runs(500);
    var map = {};

    for (var i = 0; i < runs.length; i++) {
      var stage = runs[i].pipeline_stage || 'unknown';
      if (!map[stage]) {
        map[stage] = { stage: stage, total: 0, touchless: 0 };
      }

      map[stage].total++;
      if (runs[i].is_touchless && runs[i].status === 'completed') {
        map[stage].touchless++;
      }
    }

    var out = [];
    for (var key in map) {
      if (map.hasOwnProperty(key)) {
        var row = map[key];
        row.rate = row.total > 0 ? Math.round((row.touchless / row.total) * 100) : 0;
        out.push(row);
      }
    }

    return out;
  },

  processingBreakdown: function() {
    var m = this.metrics();
    return [
      { name: 'Touchless', value: m.touchless_runs },
      { name: 'Manual Review', value: m.manual_review_runs },
      { name: 'Failed', value: m.failed_runs }
    ];
  },

  recentRuns: function(limit) {
    return this._runs(parseInt(limit || 20, 10));
  },

  manualClaims: function(limit) {
    var max = parseInt(limit || 20, 10);
    var gr = new GlideRecord(this.claimTable);
    gr.addQuery('u_status', 'IN', 'scrubbing');
    gr.addOrCondition('u_scrub_status', 'failed');
    gr.setLimit(max);
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        claim_sys_id: gr.getUniqueValue(),
        claim_number: gr.getValue('u_claim_number'),
        claim_status: gr.getValue('u_status'),
        scrub_status: gr.getValue('u_scrub_status'),
        total_charge_amount: parseFloat(gr.getValue('u_total_charge_amount') || 0)
      });
    }

    return out;
  },

  _runs: function(limit) {
    var max = limit > 0 ? limit : 20;
    var gr = new GlideRecord(this.runTable);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(max);
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        pipeline_stage: gr.getValue('u_pipeline_stage'),
        status: gr.getValue('u_status'),
        is_touchless: gr.getValue('u_is_touchless') === 'true',
        processing_time_ms: parseInt(gr.getValue('u_processing_time_ms') || 0, 10),
        failure_reason: gr.getValue('u_failure_reason'),
        created_at: gr.getValue('sys_created_on')
      });
    }

    return out;
  },

  type: 'x_rcm_StpService'
};
