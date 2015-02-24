var request = require('superagent');
var camelizeKeys = require('humps').camelizeKeys;

var API_HOST = 'http://localhost:4567';

var StateInterface = {
  setState: function(deviceId, deviceState, successHandler, errorHandler) {
    var body = { state: deviceState };

    request
      .post( API_HOST + '/devices/' + deviceId + '/state')
      .send(body)
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(body);
        }
      });
  },

  getState: function(deviceId, responseHandler) {
    request.get(
      'https://gist.githubusercontent.com/AdamEdgett/71845ff7846e5e1d4c51/raw/' + deviceId + '.json',
      function (err, res) {
        if (err) throw err;
        responseHandler(res.body);
      }
    );
  },

  getStates: function(deviceId, responseHandler) {
    request.get(
      'https://gist.githubusercontent.com/AdamEdgett/e236f7a3a5ea7ed8ddee/raw/' + deviceId + '.json',
      function (err, res) {
        if (err) throw err;
        responseHandler(camelizeKeys(JSON.parse(res.text)).states);
      }
    );
  }
};

module.exports = StateInterface;
