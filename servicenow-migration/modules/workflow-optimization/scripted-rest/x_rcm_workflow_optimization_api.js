(function process(request, response) {
  var service = new x_rcm_WorkflowOptimizationService();
  var method = request.getHttpMethod();

  try {
    if (method === 'POST') {
      var actionPost = request.queryParams.action || 'optimize';
      if (actionPost !== 'optimize') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var result = service.optimize();
      response.setStatus(result.ok ? 200 : 502);
      response.setBody(result);
      return;
    }

    if (method === 'GET') {
      var action = request.queryParams.action || 'last_worklist';
      if (action !== 'last_worklist') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var worklist = service.lastWorklist();
      response.setStatus(worklist ? 200 : 404);
      response.setBody(worklist || { message: 'No worklist found' });
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_workflow_optimization_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
