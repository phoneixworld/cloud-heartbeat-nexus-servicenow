(function process(request, response) {
  var service = new x_rcm_BatchService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'list';

      if (action === 'list') {
        response.setStatus(200);
        response.setBody(service.list());
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
      var actionPost = request.queryParams.action || 'create_batch';
      if (actionPost !== 'create_batch') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var payload = request.body.data || {};
      var result = service.createBatch(payload);
      response.setStatus(result.ok ? 201 : 422);
      response.setBody(result);
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_batches_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
