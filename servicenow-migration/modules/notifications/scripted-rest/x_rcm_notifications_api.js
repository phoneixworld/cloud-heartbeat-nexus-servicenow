(function process(request, response) {
  var service = new x_rcm_NotificationService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'list';

      if (action === 'list') {
        var filter = request.queryParams.filter || 'all';
        response.setStatus(200);
        response.setBody(service.list(filter));
        return;
      }

      if (action === 'summary') {
        response.setStatus(200);
        response.setBody(service.summary());
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    if (method === 'POST') {
      var actionPost = request.queryParams.action || '';
      var payload = request.body.data || {};

      if (actionPost === 'mark_read') {
        var markResult = service.markRead(payload.notification_sys_id || '');
        response.setStatus(markResult.ok ? 200 : 404);
        response.setBody(markResult);
        return;
      }

      if (actionPost === 'mark_all_read') {
        var markAllResult = service.markAllRead(payload.user_sys_id || '');
        response.setStatus(markAllResult.ok ? 200 : 500);
        response.setBody(markAllResult);
        return;
      }

      if (actionPost === 'seed_demo') {
        var seedResult = service.seedDemo();
        response.setStatus(seedResult.ok ? 200 : 500);
        response.setBody(seedResult);
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_notifications_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
