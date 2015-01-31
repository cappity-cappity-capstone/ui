var request = require('superagent');

var transformResponse = require('./transform_response.js');

var DeviceInterface = {
  getDevices: function (responseHandler) {
    request.get(
      'https://gist.githubusercontent.com/Daniel0524/f840091f221fd3fd7f72/raw/722f798efea440496e60e2a285645aade95d94d7/devices',
      function (err, res) {
        if (err) throw err;
        responseHandler(transformResponse(res));
      }
    );
  }
};

module.exports = DeviceInterface
