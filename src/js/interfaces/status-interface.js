var request = require('superagent');

var transformResponse = require('./transform-response.js');

var StatusInterface = {
  getStatuses: function (deviceId, responseHandler) {
    request.get(
      'https://gist.githubusercontent.com/AdamEdgett/e236f7a3a5ea7ed8ddee/raw/' + deviceId + '.json',
      function (err, res) {
        if (err) throw err;
        responseHandler(transformResponse(res));
      }
    );
  },

  getStatus: function (deviceId, responseHandler) {
    request.get(
      'https://gist.githubusercontent.com/AdamEdgett/71845ff7846e5e1d4c51/raw/' + deviceId + '.json',
      function (err, res) {
        if (err) throw err;
        responseHandler(transformResponse(res));
      }
    );
  }
};

module.exports = StatusInterface
