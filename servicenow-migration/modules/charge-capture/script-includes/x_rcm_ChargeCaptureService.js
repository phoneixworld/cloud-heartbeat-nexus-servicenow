var x_rcm_ChargeCaptureService = Class.create();
x_rcm_ChargeCaptureService.prototype = {
  initialize: function() {
    this.encounterTable = 'x_rcm_nexus_encounter';
    this.claimTable = 'x_rcm_nexus_claim';
    this.payerTable = 'x_rcm_nexus_payer';
  },

  listEncounters: function(searchText) {
    var gr = new GlideRecord(this.encounterTable);
    gr.orderByDesc('u_admission_date');
    gr.setLimit(100);
    gr.query();

    var out = [];
    var s = String(searchText || '').toLowerCase();

    while (gr.next()) {
      var row = this._toEncounter(gr);
      if (s) {
        var key = (String(row.patient_name || '') + ' ' + String(row.patient_mrn || '')).toLowerCase();
        if (key.indexOf(s) < 0) {
          continue;
        }
      }
      out.push(row);
    }

    return out;
  },

  createEncounter: function(input) {
    input = input || {};

    if (!input.patient_sys_id || !input.admission_date) {
      return { ok: false, message: 'patient_sys_id and admission_date are required' };
    }

    var gr = new GlideRecord(this.encounterTable);
    gr.initialize();
    gr.setValue('u_patient', input.patient_sys_id);
    gr.setValue('u_visit_type', input.visit_type || 'outpatient');
    gr.setValue('u_admission_date', input.admission_date);
    gr.setValue('u_facility_name', input.facility_name || '');
    gr.setValue('u_attending_provider', input.attending_provider_sys_id || '');
    gr.setValue('u_status', 'active');
    gr.setValue('u_total_charges', parseFloat(input.total_charges || 0));
    var encounterSysId = gr.insert();

    return { ok: true, encounter_sys_id: encounterSysId };
  },

  billEncounter: function(encounterSysId) {
    if (!encounterSysId) {
      return { ok: false, message: 'encounter_sys_id is required' };
    }

    var encounter = new GlideRecord(this.encounterTable);
    if (!encounter.get(encounterSysId)) {
      return { ok: false, message: 'Encounter not found' };
    }

    if (encounter.getValue('u_status') === 'billed') {
      return { ok: false, message: 'Encounter already billed' };
    }

    var payerSysId = this._payerForPatient(encounter.getValue('u_patient'));
    if (!payerSysId) {
      return { ok: false, message: 'No payer available for patient claim generation' };
    }

    var claim = new GlideRecord(this.claimTable);
    claim.initialize();
    claim.setValue('u_claim_number', this._nextClaimNumber());
    claim.setValue('u_patient', encounter.getValue('u_patient'));
    claim.setValue('u_payer', payerSysId);
    claim.setValue('u_encounter', encounterSysId);
    claim.setValue('u_service_date', encounter.getValue('u_admission_date'));
    claim.setValue('u_claim_type', encounter.getValue('u_visit_type') === 'inpatient' ? 'institutional' : 'professional');
    claim.setValue('u_facility_name', encounter.getValue('u_facility_name'));
    claim.setValue('u_provider', encounter.getValue('u_attending_provider'));
    claim.setValue('u_total_charge_amount', parseFloat(encounter.getValue('u_total_charges') || 0));
    claim.setValue('u_status', 'draft');
    var claimSysId = claim.insert();

    encounter.setValue('u_status', 'billed');
    encounter.update();

    return {
      ok: true,
      encounter_sys_id: encounterSysId,
      claim_sys_id: claimSysId
    };
  },

  summary: function(searchText) {
    var encounters = this.listEncounters(searchText || '');
    var active = 0;
    var billed = 0;
    var totalCharges = 0;

    for (var i = 0; i < encounters.length; i++) {
      var e = encounters[i];
      if (e.status === 'active') active++;
      if (e.status === 'billed') billed++;
      totalCharges += e.total_charges;
    }

    return {
      total_encounters: encounters.length,
      active_encounters: active,
      billed_encounters: billed,
      total_charges: totalCharges
    };
  },

  _toEncounter: function(gr) {
    return {
      sys_id: gr.getUniqueValue(),
      patient_sys_id: gr.getValue('u_patient'),
      patient_name: gr.getDisplayValue('u_patient'),
      patient_mrn: gr.getValue('u_patient_mrn') || '',
      visit_type: gr.getValue('u_visit_type'),
      admission_date: gr.getValue('u_admission_date'),
      discharge_date: gr.getValue('u_discharge_date'),
      attending_provider_sys_id: gr.getValue('u_attending_provider'),
      attending_provider_name: gr.getDisplayValue('u_attending_provider'),
      total_charges: parseFloat(gr.getValue('u_total_charges') || 0),
      facility_name: gr.getValue('u_facility_name'),
      status: gr.getValue('u_status') || 'active'
    };
  },

  _payerForPatient: function(patientSysId) {
    var claim = new GlideRecord(this.claimTable);
    claim.addQuery('u_patient', patientSysId);
    claim.orderByDesc('sys_created_on');
    claim.setLimit(1);
    claim.query();

    if (claim.next() && claim.getValue('u_payer')) {
      return claim.getValue('u_payer');
    }

    var payer = new GlideRecord(this.payerTable);
    payer.addQuery('u_is_active', true);
    payer.setLimit(1);
    payer.query();
    if (payer.next()) {
      return payer.getUniqueValue();
    }

    return '';
  },

  _nextClaimNumber: function() {
    var dt = new GlideDateTime();
    return 'CLM-' + dt.getNumericValue();
  },

  type: 'x_rcm_ChargeCaptureService'
};
