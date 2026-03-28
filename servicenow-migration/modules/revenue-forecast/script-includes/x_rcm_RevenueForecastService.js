var x_rcm_RevenueForecastService = Class.create();
x_rcm_RevenueForecastService.prototype = {
  initialize: function() {
    this.table = 'x_rcm_nexus_revenue_forecast';
    this.bridge = new x_rcm_SupabaseBridge();
  },

  generate: function(period) {
    var payload = {
      period: period || '90_days'
    };

    var result = this.bridge.invokeEdgeFunction('ai-revenue-forecast', payload);
    if (!result.ok) {
      return result;
    }

    this._saveForecast(result.body);
    return result;
  },

  lastForecast: function() {
    var gr = new GlideRecord(this.table);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(1);
    gr.query();

    if (!gr.next()) {
      return null;
    }

    return {
      sys_id: gr.getUniqueValue(),
      period: gr.getValue('u_period'),
      expected_30_day_revenue: parseFloat(gr.getValue('u_expected_30_day_revenue') || 0),
      expected_90_day_revenue: parseFloat(gr.getValue('u_expected_90_day_revenue') || 0),
      overall_health: gr.getValue('u_overall_health'),
      raw_forecast: gr.getValue('u_raw_forecast'),
      created_at: gr.getValue('sys_created_on')
    };
  },

  _saveForecast: function(rawBody) {
    var parsed;
    try {
      parsed = JSON.parse(rawBody || '{}');
    } catch (e) {
      parsed = {};
    }

    var forecast = parsed.forecast || {};
    var kma = forecast.key_metrics_assessment || {};

    var gr = new GlideRecord(this.table);
    gr.initialize();
    gr.setValue('u_period', '90_days');
    gr.setValue('u_expected_30_day_revenue', (((forecast.forecast_30_day || {}).expected_revenue) || 0));
    gr.setValue('u_expected_90_day_revenue', (((forecast.forecast_90_day || {}).expected_revenue) || 0));
    gr.setValue('u_overall_health', kma.overall_health || 'unknown');
    gr.setValue('u_raw_forecast', JSON.stringify(forecast));
    gr.insert();
  },

  type: 'x_rcm_RevenueForecastService'
};
