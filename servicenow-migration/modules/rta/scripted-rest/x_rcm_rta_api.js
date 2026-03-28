(function process(request, response) {
  var service = new x_rcm_RtaService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'config';

      if (action === 'config') {
        response.setStatus(200);
        response.setBody(service.getConfig());
        return;
      }

      if (action === 'transactions') {
        response.setStatus(200);
        response.setBody(service.getTransactions(request.queryParams.claim_sys_id || ''));
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    if (method === 'POST') {
      var actionPost = request.queryParams.action || 'submit';
      var payload = request.body.data || {};

      if (actionPost !== 'submit') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var claimSysId = payload.claim_sys_id || '';
      if (!claimSysId) {
        response.setStatus(400);
        response.setBody({ message: 'claim_sys_id is required' });
        return;
      }

      var submitResult = service.submit(claimSysId);
      if (!submitResult.ok) {
        response.setStatus(422);
        response.setBody(submitResult);
        return;
      }

      response.setStatus(200);
      response.setBody(submitResult);
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_rta_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
