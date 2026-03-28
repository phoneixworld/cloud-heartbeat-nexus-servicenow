(function process(request, response) {
  var service = new x_rcm_AnomalyService();
  var method = request.getHttpMethod();

  try {
    if (method === 'POST') {
      var actionPost = request.queryParams.action || 'run_scan';
      if (actionPost !== 'run_scan') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var payload = request.body.data || {};
      var result = service.runScan(payload.scan_type || 'full');
      response.setStatus(result.ok ? 200 : 502);
      response.setBody(result);
      return;
    }

    if (method === 'GET') {
      var action = request.queryParams.action || 'last_report';
      if (action !== 'last_report') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var report = service.lastReport();
      response.setStatus(report ? 200 : 404);
      response.setBody(report || { message: 'No report found' });
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_anomaly_detection_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
