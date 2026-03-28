(function process(request, response) {
  var service = new x_rcm_WorkloadService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'items';

      if (action === 'queues') {
        response.setStatus(200);
        response.setBody(service.listQueues());
        return;
      }

      if (action === 'items') {
        var status = request.queryParams.status || '';
        response.setStatus(200);
        response.setBody(service.listItems(status));
        return;
      }

      if (action === 'summary') {
        var statusFilter = request.queryParams.status || '';
        response.setStatus(200);
        response.setBody(service.summary(statusFilter));
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    if (method === 'POST') {
      var actionPost = request.queryParams.action || '';
      var payload = request.body.data || {};

      if (actionPost === 'assign') {
        var assignResult = service.assignItem(payload.item_sys_id || '', payload.assigned_to || '');
        response.setStatus(assignResult.ok ? 200 : 422);
        response.setBody(assignResult);
        return;
      }

      if (actionPost === 'complete') {
        var completeResult = service.completeItem(payload.item_sys_id || '', payload.completion_notes || '');
        response.setStatus(completeResult.ok ? 200 : 422);
        response.setBody(completeResult);
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_workloads_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
