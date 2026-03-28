(function process(request, response) {
  var service = new x_rcm_ClaimsService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'list';
      if (action === 'stats') {
        response.setStatus(200);
        response.setBody(service.calculateStats());
        return;
      }

      if (request.pathParams && request.pathParams.sys_id) {
        var one = service.getClaim(request.pathParams.sys_id);
        if (!one) {
          response.setStatus(404);
          response.setBody({ message: 'Claim not found' });
          return;
        }
        response.setStatus(200);
        response.setBody(one);
        return;
      }

      var filters = {
        status: request.queryParams.status,
        payer_sys_id: request.queryParams.payer_sys_id,
        search: request.queryParams.search
      };
      response.setStatus(200);
      response.setBody(service.listClaims(filters));
      return;
    }

    if (method === 'POST') {
      var payload = request.body.data || {};
      var created = service.createClaim(payload);
      response.setStatus(201);
      response.setBody(created);
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_claims_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
