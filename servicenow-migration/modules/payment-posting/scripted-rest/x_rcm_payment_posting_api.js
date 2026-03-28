(function process(request, response) {
  var service = new x_rcm_PaymentPostingService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'payments';

      if (action === 'payments') {
        response.setStatus(200);
        response.setBody(service.listPayments(request.queryParams.search || ''));
        return;
      }

      if (action === 'unpaid_claims') {
        response.setStatus(200);
        response.setBody(service.listUnpaidClaims());
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
      var actionPost = request.queryParams.action || 'post_payment';
      if (actionPost !== 'post_payment') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var payload = request.body.data || {};
      var result = service.postPayment(payload);
      response.setStatus(result.ok ? 200 : 422);
      response.setBody(result);
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_payment_posting_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
