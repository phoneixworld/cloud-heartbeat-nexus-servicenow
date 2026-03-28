var x_rcm_SupabaseBridge = Class.create();
x_rcm_SupabaseBridge.prototype = {
  initialize: function() {
    this.connectionAlias = 'x_rcm_nexus.supabase_default';
  },

  invokeEdgeFunction: function(functionName, payload) {
    var rm = new sn_ws.RESTMessageV2();
    rm.setHttpMethod('post');
    rm.setEndpoint(this._buildFunctionEndpoint(functionName));
    rm.setRequestHeader('Content-Type', 'application/json');
    rm.setRequestHeader('apikey', this._getApiKey());
    rm.setRequestHeader('Authorization', 'Bearer ' + this._getApiKey());
    rm.setRequestBody(JSON.stringify(payload || {}));

    try {
      var response = rm.execute();
      var status = response.getStatusCode();
      var body = response.getBody();

      if (status < 200 || status >= 300) {
        gs.error('x_rcm_SupabaseBridge.invokeEdgeFunction failed: ' + functionName + ' status=' + status + ' body=' + body);
        return {
          ok: false,
          status: status,
          body: body
        };
      }

      return {
        ok: true,
        status: status,
        body: body
      };
    } catch (ex) {
      gs.error('x_rcm_SupabaseBridge.invokeEdgeFunction exception: ' + ex.message);
      return {
        ok: false,
        status: 500,
        body: ex.message
      };
    }
  },

  _buildFunctionEndpoint: function(functionName) {
    var baseUrl = gs.getProperty('x_rcm_nexus.supabase_url', '');
    return baseUrl + '/functions/v1/' + functionName;
  },

  _getApiKey: function() {
    return gs.getProperty('x_rcm_nexus.supabase_service_key', '');
  },

  type: 'x_rcm_SupabaseBridge'
};
