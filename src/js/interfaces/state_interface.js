var request = require('superagent');
var camelizeKeys = require('humps').camelizeKeys;

var StateInterface = function(host) {
  this.host = host;
};

StateInterface.prototype = {
  setState: function(deviceId, deviceState, successHandler, errorHandler) {
    var body = { "state": (deviceState ? "1.0" : "0") , "source": "manual_override"};

    request
      .post( this.host + '/api/devices/' + deviceId + '/state')
      .send(body)
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          res.body.state = res.body.state != "0.0";
          successHandler(res.body);
        }
      });
  },

  getState: function(deviceId, responseHandler, list) {
    request.get(
      this.host +  '/api/devices/' + deviceId + '/state',
      function (err, res) {
        if (err) throw err;
        responseHandler(res.body);
      }
    );
  },

  getStates: function(deviceId, responseHandler) {
    request.get(
      this.host +  '/api/devices',
      function (err, res) {
        if (err) throw err;
        responseHandler(camelizeKeys(JSON.parse(res.text)).states);
      }
    );
  }
};

module.exports = StateInterface;
