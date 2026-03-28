(function process(request, response) {
  var service = new x_rcm_ChargeCaptureService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'encounters';

      if (action === 'encounters') {
        response.setStatus(200);
        response.setBody(service.listEncounters(request.queryParams.search || ''));
        return;
      }

      if (action === 'summary') {
        response.setStatus(200);
        response.setBody(service.summary(request.queryParams.search || ''));
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    if (method === 'POST') {
      var actionPost = request.queryParams.action || '';
      var payload = request.body.data || {};

      if (actionPost === 'create_encounter') {
        var createResult = service.createEncounter(payload);
        response.setStatus(createResult.ok ? 201 : 422);
        response.setBody(createResult);
        return;
      }

      if (actionPost === 'bill_encounter') {
        var billResult = service.billEncounter(payload.encounter_sys_id || '');
        response.setStatus(billResult.ok ? 200 : 422);
        response.setBody(billResult);
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_charge_capture_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
