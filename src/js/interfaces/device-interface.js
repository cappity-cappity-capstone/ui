var request = require('superagent');

var transformResponse = require('./transform-response.js');

var DeviceInterface = {
  getDevices: function (responseHandler) {
    request.get(
      'https://gist.githubusercontent.com/AdamEdgett/7232a7f525fb42e5d3bb/raw/devices.json',
      function (err, res) {
        if (err) throw err;
        responseHandler(transformResponse(res));
      }
    );
  }
};

module.exports = DeviceInterface
