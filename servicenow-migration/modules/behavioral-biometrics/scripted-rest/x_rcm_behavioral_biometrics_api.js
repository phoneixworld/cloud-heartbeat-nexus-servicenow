(function process(request, response) {
  var service = new x_rcm_BehavioralService();
  var method = request.getHttpMethod();

  try {
    if (method !== 'GET') {
      response.setStatus(405);
      response.setBody({ message: 'Method not allowed' });
      return;
    }

    var action = request.queryParams.action || 'metrics';

    if (action === 'session_events') {
      response.setStatus(200);
      response.setBody(service.sessionEvents(request.queryParams.limit || 200));
      return;
    }

    if (action === 'metrics') {
      response.setStatus(200);
      response.setBody(service.metrics());
      return;
    }

    if (action === 'risk_trend') {
      response.setStatus(200);
      response.setBody(service.riskTrend());
      return;
    }

    if (action === 'ip_analysis') {
      response.setStatus(200);
      response.setBody(service.ipAnalysis());
      return;
    }

    if (action === 'recent_audit') {
      response.setStatus(200);
      response.setBody(service.recentAudit(request.queryParams.limit || 20));
      return;
    }

    response.setStatus(400);
    response.setBody({ message: 'Invalid action' });
  } catch (ex) {
    gs.error('x_rcm_behavioral_biometrics_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
