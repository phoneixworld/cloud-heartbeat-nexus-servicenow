(function process(request, response) {
  var service = new x_rcm_ExceptionTriageService();
  var method = request.getHttpMethod();

  try {
    if (method !== 'GET') {
      response.setStatus(405);
      response.setBody({ message: 'Method not allowed' });
      return;
    }

    var action = request.queryParams.action || 'triage';

    if (action === 'triage') {
      response.setStatus(200);
      response.setBody(service.triage());
      return;
    }

    if (action === 'summary') {
      response.setStatus(200);
      response.setBody(service.summary());
      return;
    }

    response.setStatus(400);
    response.setBody({ message: 'Invalid action' });
  } catch (ex) {
    gs.error('x_rcm_exception_triage_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
