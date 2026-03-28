(function process(request, response) {
  var service = new x_rcm_AiOpsService();
  var method = request.getHttpMethod();

  try {
    if (method !== 'GET') {
      response.setStatus(405);
      response.setBody({ message: 'Method not allowed' });
      return;
    }

    var action = request.queryParams.action || 'dashboard';

    if (action === 'overview') {
      response.setStatus(200);
      response.setBody(service.getOverview());
      return;
    }

    if (action === 'feedback') {
      response.setStatus(200);
      response.setBody(service.getFeedbackStats());
      return;
    }

    if (action === 'dashboard') {
      response.setStatus(200);
      response.setBody({
        overview: service.getOverview(),
        feedback: service.getFeedbackStats()
      });
      return;
    }

    response.setStatus(400);
    response.setBody({ message: 'Invalid action' });
  } catch (ex) {
    gs.error('x_rcm_ai_operations_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
