var request = require('superagent');

var transformResponse = require('./transform_response.js');

var DeviceInterface = {
  getDevices: function(responseHandler) {
    request.get(
      'https://api.myjson.com/bins/vwfz',
      function (err, res) {
        if (err) throw err;
        responseHandler(transformResponse(res));
      }
    );
  },

  setDeviceState: function(deviceId, deviceState, successHandler, errorHandler) {
    setTimeout(function(){
      var response = {state: deviceState}
      successHandler(response);
    }, 2000);

/*    request.post(*/
      //'http://mockurl.com',
      //function(err, res) {
        //if (err) {
          //errorHandler(err);
        //} else {
          //successHandler(res);
        //}
      //}
    /*)*/
  }
};

module.exports = DeviceInterface
