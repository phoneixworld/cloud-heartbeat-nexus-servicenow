(function process(request, response) {
  var service = new x_rcm_PatientFinancialService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'plans';

      if (action === 'plans') {
        response.setStatus(200);
        response.setBody(service.listPlans());
        return;
      }

      if (action === 'credits') {
        response.setStatus(200);
        response.setBody(service.listCredits());
        return;
      }

      if (action === 'payments') {
        response.setStatus(200);
        response.setBody(service.listPayments());
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

      if (actionPost === 'create_plan') {
        var createResult = service.createPlan(payload);
        response.setStatus(createResult.ok ? 201 : 422);
        response.setBody(createResult);
        return;
      }

      if (actionPost === 'payment_intelligence') {
        var aiResult = service.runPaymentIntelligence(payload.patient_sys_id || '');
        response.setStatus(aiResult.ok ? 200 : 422);
        response.setBody(aiResult);
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_patient_financial_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
