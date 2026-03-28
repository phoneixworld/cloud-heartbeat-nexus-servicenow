(function process(request, response) {
  var service = new x_rcm_AnalyticsService();
  var method = request.getHttpMethod();

  try {
    if (method !== 'GET') {
      response.setStatus(405);
      response.setBody({ message: 'Method not allowed' });
      return;
    }

    var action = request.queryParams.action || 'overview';

    if (action === 'overview') {
      response.setStatus(200);
      response.setBody(service.overview());
      return;
    }

    if (action === 'denials') {
      response.setStatus(200);
      response.setBody(service.denials());
      return;
    }

    if (action === 'benchmark') {
      response.setStatus(200);
      response.setBody(service.benchmark());
      return;
    }

    if (action === 'simulator') {
      response.setStatus(200);
      response.setBody(service.simulator());
      return;
    }

    response.setStatus(400);
    response.setBody({ message: 'Invalid action' });
  } catch (ex) {
    gs.error('x_rcm_analytics_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
