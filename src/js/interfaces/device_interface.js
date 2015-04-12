var request = require('superagent');
var _ = require('underscore');

var DeviceInterface = function(host) {
  this.host = host;
};

DeviceInterface.prototype = {
  getDevices: function(responseHandler) {
    request
      .get(this.host +  '/api/devices')
      .end(function(res) {
        if (res.ok) {
          var devices = [];
          _.each(res.body, function(device) {
            var device_formated = {};
            device_formated.name = device.device.name;
            device_formated.id = device.device.device_id;
            device_formated.type = device.device.device_type;
            if (device_formated.type == "gas_valve") {
              device_formated.type = "stove";
            }
            if (device.state  && device.state.state > 0) {
              device_formated.on = true;
            } else {
              device_formated.on = false;
            }
            devices.push(device_formated);
          }, devices);
          responseHandler(devices);
        } else {
          console.log("Uh oh!");
        }
      });
  },

  getDevice: function(deviceId, responseHandler) {
    request
      .get(this.host + '/api/devices/' + deviceId)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          responseHandler(res.body);
        }
      });
  },

  updateDevice: function(deviceId, device, successHandler, errorHandler) {
    request
      .put(this.host + '/api/devices/' + deviceId)
      .send(JSON.stringify(device))
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(device);
        }
      });
  },

  deleteDevice: function(deviceId, successHandler, errorHandler) {
    request
      .delete(this.host + '/api/devices/' + deviceId)
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(deviceId);
        }
      });
  },
};

module.exports = DeviceInterface;
