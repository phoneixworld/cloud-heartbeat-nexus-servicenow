var x_rcm_DataResidencyService = Class.create();
x_rcm_DataResidencyService.prototype = {
  initialize: function() {
    this.table = 'x_rcm_nexus_data_residency_cfg';
  },

  listRegions: function() {
    var gr = new GlideRecord(this.table);
    gr.orderByDesc('u_is_primary');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        region_name: gr.getValue('u_region_name'),
        region_code: gr.getValue('u_region_code'),
        country_code: gr.getValue('u_country_code'),
        regulation: gr.getValue('u_regulation'),
        data_types: gr.getValue('u_data_types'),
        encryption_standard: gr.getValue('u_encryption_standard'),
        is_primary: gr.getValue('u_is_primary') === 'true',
        status: gr.getValue('u_status')
      });
    }

    return out;
  },

  seedRegions: function() {
    var check = new GlideRecord(this.table);
    check.setLimit(1);
    check.query();
    if (check.next()) {
      return { ok: true, seeded: 0, message: 'Regions already configured' };
    }

    var regions = this._defaults();
    var seeded = 0;
    for (var i = 0; i < regions.length; i++) {
      var r = new GlideRecord(this.table);
      r.initialize();
      r.setValue('u_region_name', regions[i].region_name);
      r.setValue('u_region_code', regions[i].region_code);
      r.setValue('u_country_code', regions[i].country_code);
      r.setValue('u_regulation', regions[i].regulation);
      r.setValue('u_data_types', JSON.stringify(regions[i].data_types));
      r.setValue('u_encryption_standard', regions[i].encryption_standard);
      r.setValue('u_is_primary', regions[i].is_primary);
      r.setValue('u_status', regions[i].status);
      r.insert();
      seeded++;
    }

    return { ok: true, seeded: seeded };
  },

  summary: function() {
    var regions = this.listRegions();
    var active = 0;
    var standby = 0;
    var primary = '';

    for (var i = 0; i < regions.length; i++) {
      if (regions[i].status === 'active') active++;
      if (regions[i].status === 'standby') standby++;
      if (regions[i].is_primary) primary = regions[i].region_code;
    }

    return {
      total_regions: regions.length,
      active_regions: active,
      standby_regions: standby,
      primary_region_code: primary
    };
  },

  dataFlowRules: function() {
    return [
      { rule: 'PHI data must remain in HIPAA-compliant regions (US)', status: 'enforced' },
      { rule: 'EU patient PII stored only in GDPR-compliant regions', status: 'enforced' },
      { rule: 'Audit logs replicated to primary + 1 backup region', status: 'enforced' },
      { rule: 'Cross-region transfers require encryption in transit (TLS 1.3)', status: 'enforced' },
      { rule: 'Data deletion requests propagated to all regions within 72h', status: 'configured' },
      { rule: 'Backup retention: 30 days active, 90 days archive', status: 'configured' }
    ];
  },

  _defaults: function() {
    return [
      { region_name: 'US East (Virginia)', region_code: 'us-east-1', country_code: 'US', regulation: 'HIPAA', data_types: ['phi', 'pii', 'financial', 'audit'], encryption_standard: 'AES-256', is_primary: true, status: 'active' },
      { region_name: 'US West (Oregon)', region_code: 'us-west-2', country_code: 'US', regulation: 'HIPAA', data_types: ['phi', 'pii', 'financial'], encryption_standard: 'AES-256', is_primary: false, status: 'active' },
      { region_name: 'EU West (Ireland)', region_code: 'eu-west-1', country_code: 'IE', regulation: 'GDPR', data_types: ['pii', 'financial'], encryption_standard: 'AES-256-GCM', is_primary: false, status: 'active' },
      { region_name: 'EU Central (Frankfurt)', region_code: 'eu-central-1', country_code: 'DE', regulation: 'GDPR', data_types: ['pii', 'financial', 'audit'], encryption_standard: 'AES-256-GCM', is_primary: false, status: 'standby' },
      { region_name: 'Asia Pacific (Singapore)', region_code: 'ap-southeast-1', country_code: 'SG', regulation: 'PDPA', data_types: ['pii', 'financial'], encryption_standard: 'AES-256', is_primary: false, status: 'standby' },
      { region_name: 'Middle East (Bahrain)', region_code: 'me-south-1', country_code: 'BH', regulation: 'PDPL', data_types: ['pii', 'financial'], encryption_standard: 'AES-256', is_primary: false, status: 'planned' },
      { region_name: 'UK (London)', region_code: 'eu-west-2', country_code: 'GB', regulation: 'UK-GDPR', data_types: ['pii', 'financial'], encryption_standard: 'AES-256-GCM', is_primary: false, status: 'planned' },
      { region_name: 'Australia (Sydney)', region_code: 'ap-southeast-2', country_code: 'AU', regulation: 'Privacy Act', data_types: ['pii'], encryption_standard: 'AES-256', is_primary: false, status: 'planned' }
    ];
  },

  type: 'x_rcm_DataResidencyService'
};
