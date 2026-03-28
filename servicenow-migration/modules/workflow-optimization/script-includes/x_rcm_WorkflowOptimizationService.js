var x_rcm_WorkflowOptimizationService = Class.create();
x_rcm_WorkflowOptimizationService.prototype = {
  initialize: function() {
    this.table = 'x_rcm_nexus_workflow_recommendation';
    this.bridge = new x_rcm_SupabaseBridge();
  },

  optimize: function() {
    var result = this.bridge.invokeEdgeFunction('ai-workflow-optimization', {});
    if (!result.ok) {
      return result;
    }

    this._saveWorklist(result.body);
    return result;
  },

  lastWorklist: function() {
    var gr = new GlideRecord(this.table);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(1);
    gr.query();

    if (!gr.next()) {
      return null;
    }

    return {
      sys_id: gr.getUniqueValue(),
      total_tasks: parseInt(gr.getValue('u_total_tasks') || 0, 10),
      critical_tasks: parseInt(gr.getValue('u_critical_tasks') || 0, 10),
      revenue_at_risk: parseFloat(gr.getValue('u_revenue_at_risk') || 0),
      workload_level: gr.getValue('u_workload_level'),
      raw_worklist: gr.getValue('u_raw_worklist'),
      created_at: gr.getValue('sys_created_on')
    };
  },

  _saveWorklist: function(rawBody) {
    var parsed;
    try {
      parsed = JSON.parse(rawBody || '{}');
    } catch (e) {
      parsed = {};
    }

    var wl = parsed.worklist || {};
    var ds = wl.daily_summary || {};
    var sr = wl.staffing_recommendation || {};

    var gr = new GlideRecord(this.table);
    gr.initialize();
    gr.setValue('u_total_tasks', ds.total_tasks || 0);
    gr.setValue('u_critical_tasks', ds.critical_tasks || 0);
    gr.setValue('u_revenue_at_risk', ds.total_revenue_at_risk || 0);
    gr.setValue('u_workload_level', sr.workload_level || 'normal');
    gr.setValue('u_raw_worklist', JSON.stringify(wl));
    gr.insert();
  },

  type: 'x_rcm_WorkflowOptimizationService'
};
