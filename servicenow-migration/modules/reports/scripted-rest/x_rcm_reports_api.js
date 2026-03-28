(function process(request, response) {
  var service = new x_rcm_ReportService();
  var method = request.getHttpMethod();

  try {
    if (method !== 'GET') {
      response.setStatus(405);
      response.setBody({ message: 'Method not allowed' });
      return;
    }

    var action = request.queryParams.action || 'executive_summary';

    if (action === 'executive_summary') {
      response.setStatus(200);
      response.setBody(service.executiveSummary());
      return;
    }

    if (action === 'aging_summary') {
      response.setStatus(200);
      response.setBody(service.agingSummary());
      return;
    }

    if (action === 'exports') {
      var type = request.queryParams.type || 'claims';
      response.setStatus(200);
      response.setBody(service.exportData(type));
      return;
    }

    if (action === 'compliance_snapshot') {
      response.setStatus(200);
      response.setBody(service.complianceSnapshot());
      return;
    }

    response.setStatus(400);
    response.setBody({ message: 'Invalid action' });
  } catch (ex) {
    gs.error('x_rcm_reports_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
