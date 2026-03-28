(function process(request, response) {
  var service = new x_rcm_RevenueIntelService();
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

    if (action === 'denial_categories') {
      response.setStatus(200);
      response.setBody(service.denialCategories());
      return;
    }

    if (action === 'payer_yield') {
      response.setStatus(200);
      response.setBody(service.payerYield());
      return;
    }

    if (action === 'monthly_trend') {
      response.setStatus(200);
      response.setBody(service.monthlyTrend());
      return;
    }

    if (action === 'simulate') {
      var sim = service.simulate(
        request.queryParams.monthly_charges || 0,
        request.queryParams.denial_rate || 0,
        request.queryParams.collection_rate || 0
      );
      response.setStatus(sim.ok ? 200 : 422);
      response.setBody(sim);
      return;
    }

    response.setStatus(400);
    response.setBody({ message: 'Invalid action' });
  } catch (ex) {
    gs.error('x_rcm_revenue_intelligence_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
