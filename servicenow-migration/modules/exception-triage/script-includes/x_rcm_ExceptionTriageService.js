var x_rcm_ExceptionTriageService = Class.create();
x_rcm_ExceptionTriageService.prototype = {
  initialize: function() {
    this.claimTable = 'x_rcm_nexus_claim';
  },

  triage: function() {
    var gr = new GlideRecord(this.claimTable);
    gr.addQuery('u_status', 'IN', 'denied,pending,scrubbing,submitted,appealed');
    gr.orderByDesc('u_days_in_ar');
    gr.setLimit(100);
    gr.query();

    var out = [];
    while (gr.next()) {
      var scored = this._score(gr);
      out.push(scored);
    }

    out.sort(function(a, b) {
      return b.priority_score - a.priority_score;
    });

    return out;
  },

  summary: function() {
    var claims = this.triage();
    var critical = 0;
    var high = 0;
    var medium = 0;
    var revenueAtRisk = 0;

    for (var i = 0; i < claims.length; i++) {
      var c = claims[i];
      if (c.priority_score >= 75) critical++;
      if (c.priority_score >= 50 && c.priority_score < 75) high++;
      if (c.priority_score >= 25 && c.priority_score < 50) medium++;
      if (c.priority_score >= 50) {
        revenueAtRisk += c.total_charge_amount;
      }
    }

    return {
      total_exceptions: claims.length,
      critical: critical,
      high_priority: high,
      medium: medium,
      revenue_at_risk: revenueAtRisk
    };
  },

  _score: function(gr) {
    var score = 0;
    var reasons = [];
    var action = 'Review';

    var amount = parseFloat(gr.getValue('u_total_charge_amount') || 0);
    var days = parseInt(gr.getValue('u_days_in_ar') || 0, 10);
    var status = String(gr.getValue('u_status') || '');
    var riskScore = parseFloat(gr.getValue('u_ai_risk_score') || 0);
    var filingDeadline = gr.getValue('u_timely_filing_deadline');

    if (amount > 5000) {
      score += 30;
      reasons.push('High value');
    } else if (amount > 1000) {
      score += 15;
      reasons.push('Medium value');
    }

    if (days > 60) {
      score += 35;
      reasons.push('Aged >60d');
      action = 'Urgent follow-up';
    } else if (days > 30) {
      score += 20;
      reasons.push('Aged >30d');
    }

    if (status === 'denied') {
      score += 25;
      reasons.push('Denied');
      action = 'Appeal/Correct';
    }

    if (status === 'appealed') {
      score += 15;
      reasons.push('In appeal');
      action = 'Monitor appeal';
    }

    if (riskScore > 70) {
      score += 20;
      reasons.push('High AI risk');
    }

    if (filingDeadline) {
      var daysLeft = this._daysUntil(filingDeadline);
      if (daysLeft < 7) {
        score += 40;
        reasons.push('Filing ' + daysLeft + 'd left!');
        action = 'URGENT: Submit immediately';
      } else if (daysLeft < 30) {
        score += 15;
        reasons.push('Filing ' + daysLeft + 'd left');
      }
    }

    score = Math.min(score, 100);

    return {
      claim_sys_id: gr.getUniqueValue(),
      claim_number: gr.getValue('u_claim_number'),
      patient_name: gr.getDisplayValue('u_patient'),
      payer_name: gr.getDisplayValue('u_payer'),
      total_charge_amount: amount,
      days_in_ar: days,
      claim_status: status,
      ai_risk_score: riskScore,
      ai_risk_level: gr.getValue('u_ai_risk_level') || 'low',
      priority_score: score,
      priority_reason: reasons.join(' · '),
      recommended_action: action
    };
  },

  _daysUntil: function(dateStr) {
    var now = new GlideDateTime();
    var target = new GlideDateTime(dateStr + ' 00:00:00');
    var ms = target.getNumericValue() - now.getNumericValue();
    return Math.floor(ms / 86400000);
  },

  type: 'x_rcm_ExceptionTriageService'
};
