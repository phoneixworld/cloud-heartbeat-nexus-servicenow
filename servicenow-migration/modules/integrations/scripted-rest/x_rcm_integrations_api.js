(function process(request, response) {
  var service = new x_rcm_IntegrationConfigService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'configs';

      if (action === 'configs') {
        response.setStatus(200);
        response.setBody(service.listConfigs());
        return;
      }

      if (action === 'summary') {
        response.setStatus(200);
        response.setBody(service.summary());
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    if (method === 'POST') {
      var actionPost = request.queryParams.action || '';
      if (actionPost !== 'seed_integrations') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var result = service.seedIntegrations();
      response.setStatus(result.ok ? 200 : 500);
      response.setBody(result);
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_integrations_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
