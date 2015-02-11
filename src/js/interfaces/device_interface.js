var request = require('superagent');

var API_HOST = 'http://localhost:4567';

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

  getDevices: function(responseHandler) {
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
