var request = require('superagent');

var API_HOST = 'http://localhost:4567';

var ScheduleInterface = {
  addSchedule: function(schedule, deviceId, successHandler, errorHandler) {
    request
      .put(API_HOST + '/schedules/' + deviceId)
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
      .get(API_HOST + '/schedules')
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
      .get(API_HOST + '/schedules/' + scheduleId)
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
      .get(API_HOST + '/devices/' + deviceId + '/schedules')
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
      .put(API_HOST + '/schedules/' + scheduleId)
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
      .delete(API_HOST + '/schedules/' + scheduleId)
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
