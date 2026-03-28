(function process(request, response) {
  var service = new x_rcm_DataResidencyService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'regions';

      if (action === 'regions') {
        response.setStatus(200);
        response.setBody(service.listRegions());
        return;
      }

      if (action === 'summary') {
        response.setStatus(200);
        response.setBody(service.summary());
        return;
      }

      if (action === 'data_flow_rules') {
        response.setStatus(200);
        response.setBody(service.dataFlowRules());
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    if (method === 'POST') {
      var actionPost = request.queryParams.action || '';
      if (actionPost !== 'seed_regions') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var result = service.seedRegions();
      response.setStatus(result.ok ? 200 : 500);
      response.setBody(result);
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_data_residency_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
