var x_rcm_AnomalyService = Class.create();
x_rcm_AnomalyService.prototype = {
  initialize: function() {
    this.resultTable = 'x_rcm_nexus_anomaly_result';
    this.bridge = new x_rcm_SupabaseBridge();
  },

  runScan: function(scanType) {
    var payload = {
      scan_type: scanType || 'full'
    };

    var result = this.bridge.invokeEdgeFunction('ai-anomaly-detection', payload);
    if (!result.ok) {
      return result;
    }

    this._saveResult(result.body);
    return result;
  },

  lastReport: function() {
    var gr = new GlideRecord(this.resultTable);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(1);
    gr.query();

    if (!gr.next()) {
      return null;
    }

    return {
      sys_id: gr.getUniqueValue(),
      overall_risk_score: parseFloat(gr.getValue('u_overall_risk_score') || 0),
      anomaly_count: parseInt(gr.getValue('u_anomaly_count') || 0, 10),
      summary: gr.getValue('u_summary'),
      recommendations: gr.getValue('u_recommendations'),
      raw_report: gr.getValue('u_raw_report'),
      created_at: gr.getValue('sys_created_on')
    };
  },

  _saveResult: function(rawBody) {
    var parsed;
    try {
      parsed = JSON.parse(rawBody || '{}');
    } catch (e) {
      parsed = {};
    }

    var report = parsed.report || {};
    var gr = new GlideRecord(this.resultTable);
    gr.initialize();
    gr.setValue('u_overall_risk_score', parseFloat(report.overall_risk_score || 0));
    gr.setValue('u_anomaly_count', (report.anomalies || []).length || 0);
    gr.setValue('u_summary', report.summary || '');
    gr.setValue('u_recommendations', JSON.stringify(report.recommendations || []));
    gr.setValue('u_raw_report', JSON.stringify(report));
    gr.insert();
  },

  type: 'x_rcm_AnomalyService'
};
