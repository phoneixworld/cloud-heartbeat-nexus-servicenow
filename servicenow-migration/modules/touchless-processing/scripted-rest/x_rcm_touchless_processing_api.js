(function process(request, response) {
  var service = new x_rcm_StpService();
  var method = request.getHttpMethod();

  try {
    if (method !== 'GET') {
      response.setStatus(405);
      response.setBody({ message: 'Method not allowed' });
      return;
    }

    var action = request.queryParams.action || 'metrics';

    if (action === 'metrics') {
      response.setStatus(200);
      response.setBody(service.metrics());
      return;
    }

    if (action === 'stage_breakdown') {
      response.setStatus(200);
      response.setBody(service.stageBreakdown());
      return;
    }

    if (action === 'processing_breakdown') {
      response.setStatus(200);
      response.setBody(service.processingBreakdown());
      return;
    }

    if (action === 'recent_runs') {
      response.setStatus(200);
      response.setBody(service.recentRuns(request.queryParams.limit || 20));
      return;
    }

    if (action === 'manual_claims') {
      response.setStatus(200);
      response.setBody(service.manualClaims(request.queryParams.limit || 20));
      return;
    }

    response.setStatus(400);
    response.setBody({ message: 'Invalid action' });
  } catch (ex) {
    gs.error('x_rcm_touchless_processing_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
