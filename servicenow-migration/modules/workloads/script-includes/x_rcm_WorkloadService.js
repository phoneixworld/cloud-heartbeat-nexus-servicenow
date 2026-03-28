var x_rcm_WorkloadService = Class.create();
x_rcm_WorkloadService.prototype = {
  initialize: function() {
    this.queueTable = 'x_rcm_nexus_work_queue';
    this.itemTable = 'x_rcm_nexus_work_item';
  },

  listQueues: function() {
    var gr = new GlideRecord(this.queueTable);
    gr.orderBy('u_priority');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        queue_name: gr.getValue('u_queue_name'),
        description: gr.getValue('u_description'),
        queue_type: gr.getValue('u_queue_type'),
        priority: parseInt(gr.getValue('u_priority') || 5, 10),
        auto_assign: gr.getValue('u_auto_assign') === 'true',
        max_items_per_user: parseInt(gr.getValue('u_max_items_per_user') || 0, 10),
        escalation_hours: parseInt(gr.getValue('u_escalation_hours') || 0, 10),
        is_active: gr.getValue('u_is_active') === 'true'
      });
    }

    return out;
  },

  listItems: function(statusFilter) {
    var gr = new GlideRecord(this.itemTable);
    if (statusFilter) {
      gr.addQuery('u_status', statusFilter);
    }
    gr.orderBy('u_priority');
    gr.orderBy('sys_created_on');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push(this._toItem(gr));
    }

    return out;
  },

  assignItem: function(itemSysId, assignedTo) {
    if (!itemSysId || !assignedTo) {
      return { ok: false, message: 'item_sys_id and assigned_to are required' };
    }

    var gr = new GlideRecord(this.itemTable);
    if (!gr.get(itemSysId)) {
      return { ok: false, message: 'Workload item not found' };
    }

    gr.setValue('u_assigned_to', assignedTo);
    gr.setValue('u_assigned_at', gs.nowDateTime());
    gr.setValue('u_status', 'assigned');
    gr.update();

    return { ok: true, item: this._toItem(gr) };
  },

  completeItem: function(itemSysId, completionNotes) {
    if (!itemSysId) {
      return { ok: false, message: 'item_sys_id is required' };
    }

    var gr = new GlideRecord(this.itemTable);
    if (!gr.get(itemSysId)) {
      return { ok: false, message: 'Workload item not found' };
    }

    gr.setValue('u_status', 'completed');
    gr.setValue('u_completed_at', gs.nowDateTime());
    gr.setValue('u_completion_notes', completionNotes || '');
    gr.update();

    return { ok: true, item: this._toItem(gr) };
  },

  summary: function(statusFilter) {
    var items = this.listItems(statusFilter || '');
    var open = 0;
    var inProgress = 0;
    var completed = 0;
    var escalated = 0;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.status === 'open') open++;
      if (item.status === 'assigned' || item.status === 'in_progress') inProgress++;
      if (item.status === 'completed') completed++;
      if (item.escalated) escalated++;
    }

    return {
      total_items: items.length,
      open_items: open,
      in_progress_items: inProgress,
      completed_items: completed,
      escalated_items: escalated
    };
  },

  _toItem: function(gr) {
    return {
      sys_id: gr.getUniqueValue(),
      queue_sys_id: gr.getValue('u_queue'),
      entity_type: gr.getValue('u_entity_type'),
      entity_sys_id: gr.getValue('u_entity_sys_id'),
      priority: parseInt(gr.getValue('u_priority') || 5, 10),
      status: gr.getValue('u_status') || 'open',
      assigned_to: gr.getValue('u_assigned_to'),
      assigned_at: gr.getValue('u_assigned_at'),
      due_date: gr.getValue('u_due_date'),
      escalated: gr.getValue('u_escalated') === 'true',
      completion_notes: gr.getValue('u_completion_notes'),
      completed_at: gr.getValue('u_completed_at'),
      created_at: gr.getValue('sys_created_on')
    };
  },

  type: 'x_rcm_WorkloadService'
};
