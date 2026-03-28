var x_rcm_IntegrationConfigService = Class.create();
x_rcm_IntegrationConfigService.prototype = {
  initialize: function() {
    this.table = 'x_rcm_nexus_integration_config';
  },

  listConfigs: function() {
    var gr = new GlideRecord(this.table);
    gr.orderBy('u_integration_type');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        integration_name: gr.getValue('u_integration_name'),
        integration_type: gr.getValue('u_integration_type'),
        vendor: gr.getValue('u_vendor'),
        status: gr.getValue('u_status'),
        connection_method: gr.getValue('u_connection_method'),
        endpoint_url: gr.getValue('u_endpoint_url'),
        sync_frequency: gr.getValue('u_sync_frequency'),
        records_synced: parseInt(gr.getValue('u_records_synced') || 0, 10)
      });
    }

    return out;
  },

  seedIntegrations: function() {
    var existing = new GlideRecord(this.table);
    existing.setLimit(1);
    existing.query();
    if (existing.next()) {
      return { ok: true, seeded: 0, message: 'Integration configs already exist' };
    }

    var defaults = this._defaults();
    var seeded = 0;
    for (var i = 0; i < defaults.length; i++) {
      var row = new GlideRecord(this.table);
      row.initialize();
      row.setValue('u_integration_name', defaults[i].integration_name);
      row.setValue('u_integration_type', defaults[i].integration_type);
      row.setValue('u_vendor', defaults[i].vendor);
      row.setValue('u_status', defaults[i].status);
      row.setValue('u_connection_method', defaults[i].connection_method);
      row.setValue('u_endpoint_url', defaults[i].endpoint_url || '');
      row.setValue('u_sync_frequency', defaults[i].sync_frequency);
      row.setValue('u_records_synced', defaults[i].records_synced || 0);
      row.insert();
      seeded++;
    }

    return { ok: true, seeded: seeded };
  },

  summary: function() {
    var list = this.listConfigs();
    var active = 0;
    var totalSynced = 0;
    var byType = {};

    for (var i = 0; i < list.length; i++) {
      if (list[i].status === 'active') active++;
      totalSynced += list[i].records_synced;
      var t = list[i].integration_type || 'unknown';
      byType[t] = (byType[t] || 0) + 1;
    }

    return {
      total_integrations: list.length,
      active_integrations: active,
      total_records_synced: totalSynced,
      by_type: byType
    };
  },

  _defaults: function() {
    return [
      { integration_name: 'Epic EHR', integration_type: 'ehr', vendor: 'Epic Systems', status: 'active', connection_method: 'fhir', endpoint_url: 'https://fhir.epic.com/r4', sync_frequency: 'realtime', records_synced: 12450 },
      { integration_name: 'Cerner/Oracle Health', integration_type: 'ehr', vendor: 'Oracle', status: 'active', connection_method: 'fhir', endpoint_url: 'https://fhir.cerner.com/r4', sync_frequency: 'realtime', records_synced: 8320 },
      { integration_name: 'Allscripts Veradigm', integration_type: 'ehr', vendor: 'Veradigm', status: 'inactive', connection_method: 'hl7', sync_frequency: 'hourly', records_synced: 0 },
      { integration_name: 'Availity Clearinghouse', integration_type: 'clearinghouse', vendor: 'Availity', status: 'active', connection_method: 'edi', endpoint_url: 'https://api.availity.com/v1', sync_frequency: 'realtime', records_synced: 45200 },
      { integration_name: 'Change Healthcare', integration_type: 'clearinghouse', vendor: 'Change Healthcare', status: 'active', connection_method: 'edi', endpoint_url: 'https://api.changehealthcare.com', sync_frequency: 'daily', records_synced: 22100 },
      { integration_name: 'Trizetto Gateway', integration_type: 'clearinghouse', vendor: 'Trizetto', status: 'inactive', connection_method: 'sftp', sync_frequency: 'daily', records_synced: 0 },
      { integration_name: 'Medicare DDE Portal', integration_type: 'payer_portal', vendor: 'CMS', status: 'active', connection_method: 'api', endpoint_url: 'https://portal.cms.gov', sync_frequency: 'daily', records_synced: 5600 },
      { integration_name: 'BCBS Provider Portal', integration_type: 'payer_portal', vendor: 'BCBS', status: 'active', connection_method: 'api', sync_frequency: 'daily', records_synced: 3200 },
      { integration_name: 'Stripe Payments', integration_type: 'payment_network', vendor: 'Stripe', status: 'active', connection_method: 'api', endpoint_url: 'https://api.stripe.com/v1', sync_frequency: 'realtime', records_synced: 1890 },
      { integration_name: 'InstaMed', integration_type: 'payment_network', vendor: 'J.P. Morgan', status: 'inactive', connection_method: 'api', sync_frequency: 'realtime', records_synced: 0 },
      { integration_name: 'Quest Diagnostics', integration_type: 'lab', vendor: 'Quest', status: 'active', connection_method: 'hl7', sync_frequency: 'hourly', records_synced: 6700 },
      { integration_name: 'LabCorp', integration_type: 'lab', vendor: 'LabCorp', status: 'inactive', connection_method: 'fhir', sync_frequency: 'hourly', records_synced: 0 }
    ];
  },

  type: 'x_rcm_IntegrationConfigService'
};
