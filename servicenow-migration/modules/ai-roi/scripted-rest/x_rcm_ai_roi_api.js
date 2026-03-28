(function process(request, response) {
  var service = new x_rcm_AiRoiService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'metrics';

      if (action === 'metrics') {
        response.setStatus(200);
        response.setBody(service.metrics());
        return;
      }

      if (action === 'latest_snapshot') {
        var latest = service.latestSnapshot();
        response.setStatus(latest ? 200 : 404);
        response.setBody(latest || { message: 'No snapshot found' });
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    if (method === 'POST') {
      var actionPost = request.queryParams.action || '';
      if (actionPost !== 'snapshot') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var snap = service.snapshot();
      response.setStatus(snap.ok ? 201 : 500);
      response.setBody(snap);
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_ai_roi_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
