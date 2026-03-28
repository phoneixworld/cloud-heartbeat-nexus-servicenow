var x_rcm_ScrubService = Class.create();
x_rcm_ScrubService.prototype = {
  initialize: function() {
    this.ruleTable = 'x_rcm_nexus_scrub_rule';
    this.resultTable = 'x_rcm_nexus_scrub_result';
    this.bridge = new x_rcm_SupabaseBridge();
  },

  listRules: function(includeInactive) {
    var gr = new GlideRecord(this.ruleTable);
    if (!includeInactive) {
      gr.addQuery('u_is_active', true);
    }
    gr.orderBy('u_severity');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        rule_name: gr.getValue('u_rule_name'),
        category: gr.getValue('u_category'),
        severity: gr.getValue('u_severity'),
        is_active: gr.getValue('u_is_active') === 'true'
      });
    }
    return out;
  },

  listResults: function(claimSysId) {
    var gr = new GlideRecord(this.resultTable);
    if (claimSysId) gr.addQuery('u_claim', claimSysId);
    gr.orderByDesc('sys_created_on');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        claim_sys_id: gr.getValue('u_claim'),
        scrub_rule_sys_id: gr.getValue('u_scrub_rule'),
        severity: gr.getValue('u_severity'),
        resolved: gr.getValue('u_resolved') === 'true',
        auto_corrected: gr.getValue('u_auto_corrected') === 'true',
        resolution_notes: gr.getValue('u_resolution_notes')
      });
    }
    return out;
  },

  resolveResult: function(resultSysId, notes) {
    var gr = new GlideRecord(this.resultTable);
    if (!gr.get(resultSysId)) {
      return { ok: false, message: 'Scrub result not found' };
    }

    gr.setValue('u_resolved', true);
    gr.setValue('u_resolved_at', gs.nowDateTime());
    gr.setValue('u_resolution_notes', notes || '');
    gr.update();

    return { ok: true };
  },

  runScrub: function(claimSysId) {
    var payload = { claim_id: claimSysId };
    return this.bridge.invokeEdgeFunction('scrub-claim', payload);
  },

  runBulkScrub: function(claimSysIds) {
    var out = [];
    for (var i = 0; i < claimSysIds.length; i++) {
      var claimId = claimSysIds[i];
      var r = this.runScrub(claimId);
      out.push({ claim_id: claimId, ok: r.ok, status: r.status, body: r.body });
    }
    return out;
  },

  stats: function() {
    var gr = new GlideRecord(this.resultTable);
    gr.query();

    var total = 0;
    var errors = 0;
    var warnings = 0;
    var resolved = 0;
    var autoCorrected = 0;
    var claims = {};

    while (gr.next()) {
      total++;
      var sev = String(gr.getValue('u_severity') || '');
      if (sev === 'error') errors++;
      if (sev === 'warning') warnings++;
      if (gr.getValue('u_resolved') === 'true') resolved++;
      if (gr.getValue('u_auto_corrected') === 'true') autoCorrected++;
      claims[String(gr.getValue('u_claim'))] = true;
    }

    var uniqueClaims = 0;
    for (var key in claims) {
      if (claims.hasOwnProperty(key)) uniqueClaims++;
    }

    return {
      total: total,
      errors: errors,
      warnings: warnings,
      resolved: resolved,
      autoCorrected: autoCorrected,
      uniqueClaims: uniqueClaims
    };
  },

  type: 'x_rcm_ScrubService'
};
