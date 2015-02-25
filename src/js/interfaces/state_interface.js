var request = require('superagent');
var camelizeKeys = require('humps').camelizeKeys;

var API_HOST = 'http://ccs.cappitycappitycapstone.com/api';

var StateInterface = {
  setState: function(deviceId, deviceState, successHandler, errorHandler) {
    var body = { "state": (deviceState ? "1.0" : "0") , "source": "manual_override"};

    request
      .post( API_HOST + '/devices/' + deviceId + '/state')
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
      API_HOST +  '/devices/' + deviceId + '/state',
      function (err, res) {
        if (err) throw err;
        responseHandler(res.body);
      }
    );
  },

  getStates: function(deviceId, responseHandler) {
    request.get(
      API_HOST +  '/devices',
      function (err, res) {
        if (err) throw err;
        responseHandler(camelizeKeys(JSON.parse(res.text)).states);
      }
    );
  }
};

module.exports = StateInterface;
