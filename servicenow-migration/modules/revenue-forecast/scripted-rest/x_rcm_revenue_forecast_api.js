(function process(request, response) {
  var service = new x_rcm_RevenueForecastService();
  var method = request.getHttpMethod();

  try {
    if (method === 'POST') {
      var actionPost = request.queryParams.action || 'generate';
      if (actionPost !== 'generate') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var payload = request.body.data || {};
      var result = service.generate(payload.period || '90_days');
      response.setStatus(result.ok ? 200 : 502);
      response.setBody(result);
      return;
    }

    if (method === 'GET') {
      var action = request.queryParams.action || 'last_forecast';
      if (action !== 'last_forecast') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var forecast = service.lastForecast();
      response.setStatus(forecast ? 200 : 404);
      response.setBody(forecast || { message: 'No forecast found' });
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_revenue_forecast_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
