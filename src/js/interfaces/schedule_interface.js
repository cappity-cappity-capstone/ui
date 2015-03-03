var request = require('superagent');

var ScheduleInterface = function(host) {
  this.host = host;
};

ScheduleInterface.prototype = {
  addSchedule: function(schedule, deviceId, successHandler, errorHandler) {
    request
      .put(this.host + '/schedules/' + deviceId)
      .send(JSON.stringify(schedule))
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(device);
        }
      });
  },

  getSchedules: function(responseHandler) {
    request
      .get(this.host + '/schedules')
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          responseHandler(res.body);
        }
      });
  },

  getSchedule: function(scheduleId, responseHandler) {
    request
      .get(this.host + '/schedules/' + scheduleId)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          responseHandler(res.body);
        }
      });
  },

  getDeviceSchedule: function(deviceId, responseHandler) {
    request
      .get(this.host + '/devices/' + deviceId + '/schedules')
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          responseHandler(res.body);
        }
      });
  },

  updateSchedule: function(scheduleId, schedule, successHandler, errorHandler) {
    request
      .put(this.host + '/schedules/' + scheduleId)
      .send(JSON.stringify(schedule))
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(schedule);
        }
      });
  },

  deleteschedule: function(scheduleId, successHandler, errorHandler) {
    request
      .delete(this.host + '/schedules/' + scheduleId)
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(scheduleId);
        }
      });
  }
};

module.exports = ScheduleInterface;
