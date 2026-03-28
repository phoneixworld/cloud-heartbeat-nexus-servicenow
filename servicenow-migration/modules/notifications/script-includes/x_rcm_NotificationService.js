var x_rcm_NotificationService = Class.create();
x_rcm_NotificationService.prototype = {
  initialize: function() {
    this.table = 'x_rcm_nexus_notification_feed';
  },

  list: function(filter) {
    filter = filter || 'all';

    var gr = new GlideRecord(this.table);
    this._applyFilter(gr, filter);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(50);
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        user_sys_id: gr.getValue('u_user') || '',
        title: gr.getValue('u_title') || '',
        message: gr.getValue('u_message') || '',
        category: gr.getValue('u_category') || 'system',
        severity: gr.getValue('u_severity') || 'info',
        entity_type: gr.getValue('u_entity_type') || '',
        entity_id: gr.getValue('u_entity_id') || '',
        action_url: gr.getValue('u_action_url') || '',
        is_read: gr.getValue('u_is_read') === 'true',
        read_at: gr.getValue('u_read_at') || '',
        created_at: gr.getValue('sys_created_on')
      });
    }

    return out;
  },

  summary: function() {
    var list = this.list('all');
    var unread = 0;
    var critical = 0;
    var warning = 0;

    for (var i = 0; i < list.length; i++) {
      if (!list[i].is_read) unread++;
      if (!list[i].is_read && list[i].severity === 'critical') critical++;
      if (!list[i].is_read && list[i].severity === 'warning') warning++;
    }

    return {
      total: list.length,
      unread: unread,
      critical: critical,
      warning: warning
    };
  },

  markRead: function(sysId) {
    if (!sysId) {
      return { ok: false, message: 'notification_sys_id is required' };
    }

    var gr = new GlideRecord(this.table);
    if (!gr.get(sysId)) {
      return { ok: false, message: 'Notification not found' };
    }

    gr.setValue('u_is_read', true);
    gr.setValue('u_read_at', new GlideDateTime().getValue());
    gr.update();

    return { ok: true, notification_sys_id: sysId };
  },

  markAllRead: function(userSysId) {
    var userId = userSysId || gs.getUserID();
    var gr = new GlideRecord(this.table);
    if (userId) {
      gr.addQuery('u_user', userId);
    }
    gr.addQuery('u_is_read', false);
    gr.query();

    var count = 0;
    while (gr.next()) {
      gr.setValue('u_is_read', true);
      gr.setValue('u_read_at', new GlideDateTime().getValue());
      gr.update();
      count++;
    }

    return { ok: true, marked: count };
  },

  seedDemo: function() {
    var existing = new GlideRecord(this.table);
    existing.setLimit(1);
    existing.query();
    if (existing.next()) {
      return { ok: true, seeded: 0, message: 'Notifications already exist' };
    }

    var rows = this._demoRows();
    var seeded = 0;

    for (var i = 0; i < rows.length; i++) {
      var gr = new GlideRecord(this.table);
      gr.initialize();
      gr.setValue('u_user', rows[i].user_sys_id || '');
      gr.setValue('u_title', rows[i].title);
      gr.setValue('u_message', rows[i].message);
      gr.setValue('u_category', rows[i].category);
      gr.setValue('u_severity', rows[i].severity);
      gr.setValue('u_entity_type', rows[i].entity_type || '');
      gr.setValue('u_entity_id', rows[i].entity_id || '');
      gr.setValue('u_action_url', rows[i].action_url || '');
      gr.setValue('u_is_read', rows[i].is_read || false);
      gr.insert();
      seeded++;
    }

    return { ok: true, seeded: seeded };
  },

  _applyFilter: function(gr, filter) {
    if (filter === 'unread') {
      gr.addQuery('u_is_read', false);
      return;
    }

    if (filter === 'critical') {
      gr.addQuery('u_severity', 'critical');
      return;
    }

    if (filter === 'claims') {
      var qc = gr.addQuery('u_category', 'claim');
      qc.addOrCondition('u_category', 'denial');
      return;
    }

    if (filter === 'ai') {
      gr.addQuery('u_category', 'ai');
      return;
    }

    if (filter === 'deadlines') {
      gr.addQuery('u_category', 'deadline');
      return;
    }
  },

  _demoRows: function() {
    return [
      {
        title: 'Critical denial spike detected',
        message: 'Denials increased 14% in the last 24 hours for commercial claims.',
        category: 'denial',
        severity: 'critical',
        action_url: '/denials',
        is_read: false
      },
      {
        title: 'Appeal deadline approaching',
        message: '12 appeals will breach filing limits in the next 48 hours.',
        category: 'deadline',
        severity: 'warning',
        action_url: '/denials',
        is_read: false
      },
      {
        title: 'AI anomaly scan completed',
        message: 'No high-risk anomalies were detected in latest scan.',
        category: 'ai',
        severity: 'success',
        action_url: '/anomaly-detection',
        is_read: false
      },
      {
        title: 'System maintenance notice',
        message: 'Payer contract refresh will run tonight at 11:00 PM local time.',
        category: 'system',
        severity: 'info',
        action_url: '/integrations',
        is_read: true
      }
    ];
  },

  type: 'x_rcm_NotificationService'
};
