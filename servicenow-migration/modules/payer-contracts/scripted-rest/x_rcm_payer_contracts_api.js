(function process(request, response) {
  var service = new x_rcm_PayerContractService();
  var method = request.getHttpMethod();

  try {
    if (method === 'GET') {
      var action = request.queryParams.action || 'contracts';

      if (action === 'contracts') {
        response.setStatus(200);
        response.setBody(service.listContracts(request.queryParams.search || ''));
        return;
      }

      if (action === 'fee_schedules') {
        var contractId = request.queryParams.contract_sys_id || '';
        response.setStatus(200);
        response.setBody(service.listFeeSchedules(contractId));
        return;
      }

      if (action === 'summary') {
        response.setStatus(200);
        response.setBody(service.summary(
          request.queryParams.selected_contract_sys_id || '',
          request.queryParams.search || ''
        ));
        return;
      }

      response.setStatus(400);
      response.setBody({ message: 'Invalid action' });
      return;
    }

    if (method === 'POST') {
      var actionPost = request.queryParams.action || 'create_contract';
      if (actionPost !== 'create_contract') {
        response.setStatus(400);
        response.setBody({ message: 'Invalid action' });
        return;
      }

      var payload = request.body.data || {};
      var result = service.createContract(payload);
      response.setStatus(result.ok ? 201 : 422);
      response.setBody(result);
      return;
    }

    response.setStatus(405);
    response.setBody({ message: 'Method not allowed' });
  } catch (ex) {
    gs.error('x_rcm_payer_contracts_api error: ' + ex.message);
    response.setStatus(500);
    response.setBody({ message: ex.message });
  }
})(request, response);
