(function process(request, response) {
  var service = new x_rcm_ZeroTrustService();
  var method = request.getHttpMethod();

  try {
    if (method !== 'GET') {
      response.setStatus(405);
      response.setBody({ message: 'Method not allowed' });
      return;
    }

    var action = request.queryParams.action || 'overview';

    if (action === 'overview') {
      response.setStatus(200);
      response.setBody(service.overview());
      return;
    }

    if (action === 'compliance_matrix') {
      response.setStatus(200);
      response.setBody(service.complianceMatrix());
      return;
    }

    if (action === 'mfa_methods') {
      response.setStatus(200);
      response.setBody(service.mfaMethods());
      return;
    }

    if (action === 'encryption_posture') {
      response.setStatus(200);
      response.setBody(service.encryptionPosture());
      return;
    }

    response.setStatus(400);
    response.setBody({ message: 'Invalid action' });
  } catch (ex) {
    gs.error('x_rcm_zero_trust_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
