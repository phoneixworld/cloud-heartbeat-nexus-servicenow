var x_rcm_SelfHealingService = Class.create();
x_rcm_SelfHealingService.prototype = {
  initialize: function() {
    this.ruleTable = 'x_rcm_nexus_automation_rule';
    this.execTable = 'x_rcm_nexus_automation_execution';
  },

  listRules: function() {
    var gr = new GlideRecord(this.ruleTable);
    gr.orderByDesc('sys_created_on');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        rule_name: gr.getValue('u_rule_name'),
        rule_type: gr.getValue('u_rule_type'),
        trigger_condition: gr.getValue('u_trigger_condition'),
        action_config: gr.getValue('u_action_config'),
        is_active: gr.getValue('u_is_active') === 'true',
        success_count: parseInt(gr.getValue('u_success_count') || 0, 10),
        failure_count: parseInt(gr.getValue('u_failure_count') || 0, 10)
      });
    }

    return out;
  },

  listExecutions: function(limit) {
    var max = parseInt(limit || 50, 10);
    if (max <= 0) max = 50;

    var gr = new GlideRecord(this.execTable);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(max);
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        rule_sys_id: gr.getValue('u_rule'),
        rule_name: gr.getDisplayValue('u_rule'),
        status: gr.getValue('u_status'),
        execution_time_ms: parseInt(gr.getValue('u_execution_time_ms') || 0, 10),
        error_message: gr.getValue('u_error_message'),
        created_at: gr.getValue('sys_created_on')
      });
    }

    return out;
  },

  seedRules: function() {
    var existing = new GlideRecord(this.ruleTable);
    existing.setLimit(1);
    existing.query();
    if (existing.next()) {
      return { ok: true, seeded: 0, message: 'Rules already exist' };
    }

    var seeded = 0;
    var rules = this._defaultRules();
    for (var i = 0; i < rules.length; i++) {
      var r = new GlideRecord(this.ruleTable);
      r.initialize();
      r.setValue('u_rule_name', rules[i].rule_name);
      r.setValue('u_rule_type', rules[i].rule_type);
      r.setValue('u_trigger_condition', JSON.stringify(rules[i].trigger_condition));
      r.setValue('u_action_config', JSON.stringify(rules[i].action_config));
      r.setValue('u_is_active', rules[i].is_active);
      r.setValue('u_success_count', rules[i].success_count);
      r.setValue('u_failure_count', rules[i].failure_count);
      r.insert();
      seeded++;
    }

    return { ok: true, seeded: seeded };
  },

  toggleRule: function(ruleSysId, isActive) {
    if (!ruleSysId) {
      return { ok: false, message: 'rule_sys_id is required' };
    }

    var gr = new GlideRecord(this.ruleTable);
    if (!gr.get(ruleSysId)) {
      return { ok: false, message: 'Rule not found' };
    }

    gr.setValue('u_is_active', isActive === true);
    gr.update();

    return { ok: true };
  },

  summary: function() {
    var rules = this.listRules();
    var active = 0;
    var success = 0;
    var failure = 0;

    for (var i = 0; i < rules.length; i++) {
      if (rules[i].is_active) active++;
      success += rules[i].success_count;
      failure += rules[i].failure_count;
    }

    var rate = success + failure > 0 ? (success / (success + failure)) * 100 : 0;

    return {
      total_rules: rules.length,
      active_rules: active,
      total_success: success,
      total_failure: failure,
      healing_rate: Number(rate.toFixed(1))
    };
  },

  _defaultRules: function() {
    return [
      {
        rule_name: 'Auto-Correct Missing Modifier',
        rule_type: 'auto_correct',
        trigger_condition: { event: 'scrub_error', rule_code: 'MOD_MISSING' },
        action_config: { action: 'add_modifier', modifier: '25' },
        is_active: true,
        success_count: 142,
        failure_count: 8
      },
      {
        rule_name: 'Auto-Resubmit Timeout Claims',
        rule_type: 'auto_resubmit',
        trigger_condition: { event: 'submission_timeout', max_retries: 3 },
        action_config: { action: 'resubmit', delay_minutes: 30 },
        is_active: true,
        success_count: 67,
        failure_count: 3
      },
      {
        rule_name: 'Auto-Appeal CO-4 Denials',
        rule_type: 'auto_appeal',
        trigger_condition: { event: 'denial', carc_code: 'CO-4' },
        action_config: { action: 'generate_appeal', template: 'missing_info' },
        is_active: true,
        success_count: 28,
        failure_count: 12
      },
      {
        rule_name: 'Auto-Post ERA Payments',
        rule_type: 'auto_post',
        trigger_condition: { event: 'era_received', variance_threshold: 5 },
        action_config: { action: 'auto_post', max_variance_pct: 5 },
        is_active: true,
        success_count: 890,
        failure_count: 15
      }
    ];
  },

  type: 'x_rcm_SelfHealingService'
};
