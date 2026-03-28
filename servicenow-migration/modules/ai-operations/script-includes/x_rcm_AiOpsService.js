var x_rcm_AiOpsService = Class.create();
x_rcm_AiOpsService.prototype = {
  initialize: function() {
    this.usageTable = 'x_rcm_nexus_ai_usage_log';
    this.feedbackTable = 'x_rcm_nexus_ai_feedback';
    this.capabilities = [
      { capability: 'denial_prediction', label: 'Denial Prediction', edgeFunction: 'ai-denial-prediction' },
      { capability: 'coding_suggestions', label: 'Clinical Coding', edgeFunction: 'ai-coding-suggestions' },
      { capability: 'payment_intelligence', label: 'Payment Intelligence', edgeFunction: 'ai-payment-intelligence' },
      { capability: 'appeal_generator', label: 'Appeal Generator', edgeFunction: 'ai-appeal-generator' },
      { capability: 'rta_prediction', label: 'RTA Prediction', edgeFunction: 'ai-rta-prediction' },
      { capability: 'anomaly_detection', label: 'Anomaly Detection', edgeFunction: 'ai-anomaly-detection' },
      { capability: 'revenue_forecast', label: 'Revenue Forecast', edgeFunction: 'ai-revenue-forecast' },
      { capability: 'workflow_optimization', label: 'Workflow AI', edgeFunction: 'ai-workflow-optimization' },
      { capability: 'rcm_copilot', label: 'RCM Copilot', edgeFunction: 'ai-rcm-copilot' },
      { capability: 'scrub_claim', label: 'Claim Scrubbing', edgeFunction: 'scrub-claim' }
    ];
  },

  getOverview: function() {
    var logs = this._allUsageLogs();
    var capabilities = [];

    for (var i = 0; i < this.capabilities.length; i++) {
      var meta = this.capabilities[i];
      var capLogs = this._forCapability(logs, meta.capability);
      var successCount = 0;
      var latencyTotal = 0;
      var latencyCount = 0;
      var errorCount = 0;
      var estimatedCost = 0;

      for (var j = 0; j < capLogs.length; j++) {
        var row = capLogs[j];
        if (row.status === 'success') successCount++;
        if (row.status === 'error') errorCount++;
        if (row.latency_ms > 0) {
          latencyTotal += row.latency_ms;
          latencyCount++;
        }
        estimatedCost += row.estimated_cost;
      }

      capabilities.push({
        capability: meta.capability,
        label: meta.label,
        edgeFunction: meta.edgeFunction,
        totalCalls: capLogs.length,
        successRate: capLogs.length > 0 ? (successCount / capLogs.length) * 100 : 100,
        avgLatency: latencyCount > 0 ? Math.round(latencyTotal / latencyCount) : 0,
        errorCount: errorCount,
        estimatedCost: estimatedCost,
        lastCallAt: capLogs.length > 0 ? capLogs[0].created_at : null
      });
    }

    var totalCalls = logs.length;
    var totalSuccess = 0;
    var totalLatency = 0;
    var totalLatencyCount = 0;
    var totalCost = 0;

    for (var k = 0; k < logs.length; k++) {
      if (logs[k].status === 'success') totalSuccess++;
      if (logs[k].latency_ms > 0) {
        totalLatency += logs[k].latency_ms;
        totalLatencyCount++;
      }
      totalCost += logs[k].estimated_cost;
    }

    return {
      capabilities: capabilities,
      totalCalls: totalCalls,
      overallSuccessRate: totalCalls > 0 ? (totalSuccess / totalCalls) * 100 : 100,
      totalCost: totalCost,
      avgLatency: totalLatencyCount > 0 ? Math.round(totalLatency / totalLatencyCount) : 0,
      recentErrors: this._recentErrors()
    };
  },

  getFeedbackStats: function() {
    var feedback = this._allFeedback();
    var byCapability = {};

    for (var i = 0; i < this.capabilities.length; i++) {
      byCapability[this.capabilities[i].capability] = {
        positive: 0,
        negative: 0,
        correct: 0,
        total: 0
      };
    }

    var positive = 0;
    var outcomes = 0;
    var outcomesCorrect = 0;

    for (var j = 0; j < feedback.length; j++) {
      var item = feedback[j];
      var capability = item.ai_capability || 'unknown';

      if (!byCapability[capability]) {
        byCapability[capability] = { positive: 0, negative: 0, correct: 0, total: 0 };
      }

      byCapability[capability].total++;
      if (item.rating === 'positive') {
        byCapability[capability].positive++;
        positive++;
      }
      if (item.rating === 'negative') {
        byCapability[capability].negative++;
      }

      if (item.prediction_was_correct !== null && item.prediction_was_correct !== '') {
        outcomes++;
        if (item.prediction_was_correct === true || item.prediction_was_correct === 'true' || item.prediction_was_correct === 1) {
          byCapability[capability].correct++;
          outcomesCorrect++;
        }
      }
    }

    return {
      totalFeedback: feedback.length,
      positiveRate: feedback.length > 0 ? (positive / feedback.length) * 100 : 0,
      accuracyRate: outcomes > 0 ? (outcomesCorrect / outcomes) * 100 : 0,
      byCapability: byCapability
    };
  },

  _allUsageLogs: function() {
    var out = [];
    var gr = new GlideRecord(this.usageTable);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(1000);
    gr.query();

    while (gr.next()) {
      out.push({
        capability: gr.getValue('u_capability') || '',
        status: gr.getValue('u_status') || '',
        latency_ms: parseInt(gr.getValue('u_latency_ms') || 0, 10),
        estimated_cost: parseFloat(gr.getValue('u_estimated_cost') || 0),
        error_message: gr.getValue('u_error_message') || '',
        created_at: gr.getValue('sys_created_on')
      });
    }

    return out;
  },

  _forCapability: function(logs, capability) {
    var out = [];
    for (var i = 0; i < logs.length; i++) {
      if (logs[i].capability === capability) {
        out.push(logs[i]);
      }
    }
    return out;
  },

  _recentErrors: function() {
    var out = [];
    var gr = new GlideRecord(this.usageTable);
    gr.addQuery('u_status', 'error');
    gr.addNotNullQuery('u_error_message');
    gr.orderByDesc('sys_created_on');
    gr.setLimit(10);
    gr.query();

    while (gr.next()) {
      out.push({
        capability: gr.getValue('u_capability') || '',
        error_message: gr.getValue('u_error_message') || '',
        created_at: gr.getValue('sys_created_on')
      });
    }

    return out;
  },

  _allFeedback: function() {
    var out = [];
    var gr = new GlideRecord(this.feedbackTable);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(500);
    gr.query();

    while (gr.next()) {
      out.push({
        ai_capability: gr.getValue('u_ai_capability') || '',
        rating: gr.getValue('u_rating') || '',
        prediction_was_correct: gr.getValue('u_prediction_was_correct')
      });
    }

    return out;
  },

  type: 'x_rcm_AiOpsService'
};
