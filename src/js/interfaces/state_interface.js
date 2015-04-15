var request = require('superagent');
var camelizeKeys = require('humps').camelizeKeys;
var moment = require('moment');

var StateInterface = function(host) {
  this.host = host;
};

StateInterface.prototype = {
  setState: function(deviceId, deviceState, successHandler, errorHandler) {
    var body = { "state": (deviceState ? "1.0" : "0") , "source": "manual_override"};

    request
      .post( this.host + '/api/devices/' + deviceId + '/state')
      .send(body)
      .end(function(res) {
        if (res.ok) {
          res.body.state = res.body.state != "0.0";
          successHandler(res.body);
        } else {
          errorHandler(res.body);
        }
      });
  },

  getState: function(deviceId, responseHandler, list) {
    request.get(
      this.host +  '/api/devices/' + deviceId + '/state',
      function (res) {
        if (res.ok) {
          responseHandler(res.body);
        }
      }
    );
  },

  getStates: function(deviceId, responseHandler) {
    request.get(
      this.host +  '/api/devices/' + deviceId + '/states',
      function (res) {
        if (res.ok) {
          var states = camelizeKeys(JSON.parse(res.text));
          states.forEach(function(state) {
            state.state = parseFloat(state.state);
            state.createdAt = moment(state.createdAt);
          });
          responseHandler(states);
        }
      }
    );
  }
};

module.exports = StateInterface;
