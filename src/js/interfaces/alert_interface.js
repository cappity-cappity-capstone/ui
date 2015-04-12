var request = require('superagent');
var camelizeKeys = require('humps').camelizeKeys;

var AlertInterface = function(host) {
  this.host = host;
};

AlertInterface.prototype = {
  getAlerts: function(responseHandler) {
    request
      .get(this.host +  '/api/alerts')
      .end(function(res) {
        if (res.ok) {
          responseHandler(camelizeKeys(res.body));
        }
      });
  }
};

module.exports = AlertInterface;
