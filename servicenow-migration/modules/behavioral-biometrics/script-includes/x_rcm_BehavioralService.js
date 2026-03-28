var x_rcm_BehavioralService = Class.create();
x_rcm_BehavioralService.prototype = {
  initialize: function() {
    this.sessionTable = 'x_rcm_nexus_session_event';
    this.auditTable = 'x_rcm_nexus_claim_audit_log';
  },

  sessionEvents: function(limit) {
    var max = parseInt(limit || 200, 10);
    if (max <= 0) max = 200;

    var gr = new GlideRecord(this.sessionTable);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(max);
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        user_sys_id: gr.getValue('u_user'),
        is_anomalous: gr.getValue('u_is_anomalous') === 'true',
        risk_score: parseFloat(gr.getValue('u_risk_score') || 0),
        created_at: gr.getValue('sys_created_on')
      });
    }

    return out;
  },

  metrics: function() {
    var sessions = this.sessionEvents(500);
    var audit = this._audit(200);

    var users = {};
    var anomalies = 0;
    var riskSum = 0;

    for (var i = 0; i < sessions.length; i++) {
      if (sessions[i].user_sys_id) users[sessions[i].user_sys_id] = true;
      if (sessions[i].is_anomalous) anomalies++;
      riskSum += sessions[i].risk_score;
    }

    var uniqueUsers = 0;
    for (var userId in users) {
      if (users.hasOwnProperty(userId)) uniqueUsers++;
    }

    var phiAccesses = 0;
    for (var j = 0; j < audit.length; j++) {
      if (audit[j].phi_accessed) phiAccesses++;
    }

    return {
      total_sessions: sessions.length,
      anomalies: anomalies,
      unique_users: uniqueUsers,
      phi_accesses: phiAccesses,
      avg_risk_score: sessions.length ? Number((riskSum / sessions.length).toFixed(1)) : 0
    };
  },

  riskTrend: function() {
    var audit = this._audit(500);
    var hourMap = {};

    for (var i = 0; i < audit.length; i++) {
      var ts = audit[i].created_at || '';
      var hour = ts ? String(ts).substring(0, 13) : 'unknown';
      if (!hourMap[hour]) hourMap[hour] = { hour: hour, total: 0, risky: 0 };
      hourMap[hour].total++;
      if (audit[i].phi_accessed) hourMap[hour].risky++;
    }

    var out = [];
    for (var key in hourMap) {
      if (hourMap.hasOwnProperty(key)) out.push(hourMap[key]);
    }

    out.sort(function(a, b) {
      return String(a.hour).localeCompare(String(b.hour));
    });

    if (out.length > 12) return out.slice(out.length - 12);
    return out;
  },

  ipAnalysis: function() {
    var audit = this._audit(500);
    var ipMap = {};

    for (var i = 0; i < audit.length; i++) {
      var ip = audit[i].ip_address || '';
      if (!ip) continue;
      ipMap[ip] = (ipMap[ip] || 0) + 1;
    }

    var out = [];
    for (var key in ipMap) {
      if (ipMap.hasOwnProperty(key)) {
        out.push({ ip: key, count: ipMap[key] });
      }
    }

    out.sort(function(a, b) {
      return b.count - a.count;
    });

    if (out.length > 10) return out.slice(0, 10);
    return out;
  },

  recentAudit: function(limit) {
    return this._audit(parseInt(limit || 20, 10));
  },

  _audit: function(limit) {
    var max = limit > 0 ? limit : 200;
    var gr = new GlideRecord(this.auditTable);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(max);
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        user_sys_id: gr.getValue('u_user'),
        action: gr.getValue('u_action'),
        phi_accessed: gr.getValue('u_phi_accessed') === 'true',
        ip_address: gr.getValue('u_ip_address'),
        created_at: gr.getValue('sys_created_on')
      });
    }

    return out;
  },

  type: 'x_rcm_BehavioralService'
};
