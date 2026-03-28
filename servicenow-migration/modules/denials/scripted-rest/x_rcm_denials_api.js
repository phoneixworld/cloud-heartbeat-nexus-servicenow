(function process(request, response) {
  var service = new x_rcm_DenialService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'list';

      if (action === 'stats') {
        response.setStatus(200);
        response.setBody(service.stats());
        return;
      }

      var filters = {
        status: request.queryParams.status,
        category: request.queryParams.category
      };

      response.setStatus(200);
      response.setBody(service.list(filters));
      return;
    }

    if (method === 'PATCH' || method === 'PUT') {
      var sysId = (request.pathParams && request.pathParams.sys_id) ? request.pathParams.sys_id : '';
      if (!sysId) {
        response.setStatus(400);
        response.setBody({ message: 'sys_id path parameter is required' });
        return;
      }

      var payload = request.body.data || {};
      var result = service.updateWorkflow(sysId, payload);

      if (!result.ok) {
        response.setStatus(404);
        response.setBody(result);
        return;
      }

      response.setStatus(200);
      response.setBody({ ok: true });
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_denials_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
