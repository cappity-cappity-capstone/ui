var request = require('superagent');
var _ = require('underscore');
var StateInterface = require('interfaces/state_interface.js');
var API_HOST = 'http://ccs.cappitycappitycapstone.com/api';

var DeviceInterface = {
  addDevice: function(device, successHandler, errorHandler) {
    request
      .put(API_HOST + '/devices')
      .send(JSON.stringify(device))
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(device);
        }
      });
  },

  getDevicesStatic: function(responseHandler) {
    request
    .get('https://api.myjson.com/bins/vwfz')
    .end(function(err, res) {
      if (err) {
        throw err;
      } else {
        responseHandler(res.body);
      }
    });
  },

  getDevices: function(responseHandler) {
    request
      .get(API_HOST +  '/devices')
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          //we have do do this right now because there isn't a call that gets us all devices
          //and their statuses because why would anybody want to know that
          // id: 1,
          // name: "Outlet",
          // type: "outlet",
          // on: true
          var devices = [];
          _.each(res.body, function(device) {
            var device_formated = {}
            device_formated.name = device.device.name;
            device_formated.id = device.device.id;
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
        }
      });
  },

  getDevice: function(deviceId, responseHandler) {
    request
      .get(API_HOST + '/devices/' + deviceId)
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
      .put(API_HOST + '/devices/' + deviceId)
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
      .delete(API_HOST + '/devices/' + deviceId)
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(deviceId);
        }
      });
  },

  checkinDevice: function(deviceId, successHandler, errorHandler) {
    request
      .put(API_HOST + '/devices/' + deviceId)
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(deviceId);
        }
      });
  }
};

module.exports = DeviceInterface;
