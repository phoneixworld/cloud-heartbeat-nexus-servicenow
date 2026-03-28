var x_rcm_PayerContractService = Class.create();
x_rcm_PayerContractService.prototype = {
  initialize: function() {
    this.contractTable = 'x_rcm_nexus_payer_contract';
    this.feeScheduleTable = 'x_rcm_nexus_fee_schedule';
    this.payerTable = 'x_rcm_nexus_payer';
  },

  listContracts: function(searchText) {
    var gr = new GlideRecord(this.contractTable);
    gr.orderByDesc('u_effective_date');
    gr.query();

    var out = [];
    var s = String(searchText || '').toLowerCase();
    while (gr.next()) {
      var row = this._toContract(gr);
      if (s) {
        var key = String(row.contract_name || '').toLowerCase() + ' ' + String(row.payer_name || '').toLowerCase();
        if (key.indexOf(s) < 0) {
          continue;
        }
      }
      out.push(row);
    }

    return out;
  },

  listFeeSchedules: function(contractSysId) {
    if (!contractSysId) return [];

    var gr = new GlideRecord(this.feeScheduleTable);
    gr.addQuery('u_contract', contractSysId);
    gr.orderBy('u_procedure_code');
    gr.query();

    var out = [];
    while (gr.next()) {
      out.push({
        sys_id: gr.getUniqueValue(),
        contract_sys_id: gr.getValue('u_contract'),
        procedure_code: gr.getValue('u_procedure_code'),
        modifier: gr.getValue('u_modifier'),
        allowed_amount: parseFloat(gr.getValue('u_allowed_amount') || 0),
        facility_rate: parseFloat(gr.getValue('u_facility_rate') || 0),
        non_facility_rate: parseFloat(gr.getValue('u_non_facility_rate') || 0),
        effective_date: gr.getValue('u_effective_date')
      });
    }

    return out;
  },

  createContract: function(input) {
    input = input || {};

    if (!input.payer_sys_id || !input.contract_name || !input.effective_date) {
      return { ok: false, message: 'payer_sys_id, contract_name, and effective_date are required' };
    }

    var gr = new GlideRecord(this.contractTable);
    gr.initialize();
    gr.setValue('u_payer', input.payer_sys_id);
    gr.setValue('u_contract_name', input.contract_name);
    gr.setValue('u_contract_type', input.contract_type || 'fee_for_service');
    gr.setValue('u_effective_date', input.effective_date);
    gr.setValue('u_timely_filing_days', parseInt(input.timely_filing_days || 90, 10));
    gr.setValue('u_is_active', true);
    var sysId = gr.insert();

    return {
      ok: true,
      contract_sys_id: sysId,
      contract_name: gr.getValue('u_contract_name')
    };
  },

  summary: function(selectedContractSysId, searchText) {
    var contracts = this.listContracts(searchText || '');
    var active = 0;
    var payerMap = {};

    for (var i = 0; i < contracts.length; i++) {
      var c = contracts[i];
      if (c.is_active) active++;
      if (c.payer_sys_id) payerMap[c.payer_sys_id] = true;
    }

    var payerCount = 0;
    for (var key in payerMap) {
      if (payerMap.hasOwnProperty(key)) payerCount++;
    }

    var feeCount = selectedContractSysId ? this.listFeeSchedules(selectedContractSysId).length : 0;

    return {
      total_contracts: contracts.length,
      active_contracts: active,
      total_payers: payerCount,
      fee_schedule_count: feeCount
    };
  },

  _toContract: function(gr) {
    var payerSysId = gr.getValue('u_payer');
    return {
      sys_id: gr.getUniqueValue(),
      payer_sys_id: payerSysId,
      payer_name: this._payerName(payerSysId),
      contract_name: gr.getValue('u_contract_name'),
      contract_type: gr.getValue('u_contract_type'),
      effective_date: gr.getValue('u_effective_date'),
      timely_filing_days: parseInt(gr.getValue('u_timely_filing_days') || 0, 10),
      is_active: gr.getValue('u_is_active') === 'true'
    };
  },

  _payerName: function(payerSysId) {
    if (!payerSysId) return '';

    var gr = new GlideRecord(this.payerTable);
    if (!gr.get(payerSysId)) return '';
    return gr.getValue('u_name') || '';
  },

  type: 'x_rcm_PayerContractService'
};
