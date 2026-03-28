(function process(request, response) {
  var service = new x_rcm_SelfHealingService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'rules';

      if (action === 'rules') {
        response.setStatus(200);
        response.setBody(service.listRules());
        return;
      }

      if (action === 'executions') {
        response.setStatus(200);
        response.setBody(service.listExecutions(request.queryParams.limit || 50));
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

      if (actionPost === 'seed_rules') {
        var seedResult = service.seedRules();
        response.setStatus(seedResult.ok ? 200 : 500);
        response.setBody(seedResult);
        return;
      }

      if (actionPost === 'toggle_rule') {
        var toggleResult = service.toggleRule(payload.rule_sys_id || '', payload.is_active === true);
        response.setStatus(toggleResult.ok ? 200 : 422);
        response.setBody(toggleResult);
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_self_healing_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
