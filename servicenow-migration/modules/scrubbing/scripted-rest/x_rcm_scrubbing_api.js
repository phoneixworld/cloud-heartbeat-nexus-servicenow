(function process(request, response) {
  var service = new x_rcm_ScrubService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'rules';

      if (action === 'rules') {
        var includeInactive = String(request.queryParams.include_inactive || 'true') !== 'false';
        response.setStatus(200);
        response.setBody(service.listRules(includeInactive));
        return;
      }

      if (action === 'results') {
        response.setStatus(200);
        response.setBody(service.listResults(request.queryParams.claim_sys_id || ''));
        return;
      }

      if (action === 'stats') {
        response.setStatus(200);
        response.setBody(service.stats());
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    if (method === 'POST') {
      var actionPost = request.queryParams.action || '';
      var payloadPost = request.body.data || {};

      if (actionPost === 'run') {
        var claimSysId = payloadPost.claim_sys_id || '';
        if (!claimSysId) {
          response.setStatus(400);
          response.setBody({ message: 'claim_sys_id is required' });
          return;
        }

        var runResult = service.runScrub(claimSysId);
        response.setStatus(runResult.ok ? 200 : 502);
        response.setBody(runResult);
        return;
      }

      if (actionPost === 'run_bulk') {
        var claimIds = payloadPost.claim_sys_ids || [];
        if (!claimIds.length) {
          response.setStatus(400);
          response.setBody({ message: 'claim_sys_ids array is required' });
          return;
        }

        response.setStatus(200);
        response.setBody(service.runBulkScrub(claimIds));
        return;
      }

      if (actionPost === 'resolve') {
        var resultSysId = payloadPost.result_sys_id || '';
        if (!resultSysId) {
          response.setStatus(400);
          response.setBody({ message: 'result_sys_id is required' });
          return;
        }

        var resolveResult = service.resolveResult(resultSysId, payloadPost.resolution_notes || '');
        response.setStatus(resolveResult.ok ? 200 : 404);
        response.setBody(resolveResult);
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_scrubbing_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
