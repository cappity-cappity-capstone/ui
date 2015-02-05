var request = require('superagent');

var transformResponse = require('./transform_response.js');

var DeviceInterface = {
  getDevices: function (responseHandler) {
    request.get(
      'https://api.myjson.com/bins/vwfz',
      function (err, res) {
        if (err) throw err;
        responseHandler(transformResponse(res));
      }
    );
  }
};

module.exports = DeviceInterface
