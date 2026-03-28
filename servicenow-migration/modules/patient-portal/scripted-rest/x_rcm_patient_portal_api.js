(function process(request, response) {
  var service = new x_rcm_PatientPortalService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'patients';

      if (action === 'patients') {
        response.setStatus(200);
        response.setBody(service.listPatients());
        return;
      }

      if (action === 'dashboard') {
        var patientSysId = request.queryParams.patient_sys_id || '';
        var data = service.dashboard(patientSysId);
        if (!data.ok) {
          response.setStatus(data.message === 'Patient not found' ? 404 : 422);
          response.setBody(data);
          return;
        }

        response.setStatus(200);
        response.setBody(data);
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    if (method === 'POST') {
      var actionPost = request.queryParams.action || '';
      var payload = request.body.data || {};

      if (actionPost === 'send_message') {
        var sent = service.sendMessage(payload);
        response.setStatus(sent.ok ? 201 : 422);
        response.setBody(sent);
        return;
      }

      if (actionPost === 'mark_message_read') {
        var marked = service.markMessageRead(payload.message_sys_id || '');
        response.setStatus(marked.ok ? 200 : 404);
        response.setBody(marked);
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_patient_portal_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
