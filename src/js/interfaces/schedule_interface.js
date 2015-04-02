var request = require('superagent');
var camelizeKeys = require('humps').camelizeKeys;
var decamelizeKeys = require('humps').decamelizeKeys;
var moment = require('moment');

var ScheduleInterface = function(host) {
  this.host = host;
};

ScheduleInterface.prototype = {
  getTasks: function(deviceId, responseHandler) {
    request
      .get(this.host + '/api/devices/' + deviceId + '/tasks')
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          var tasks = camelizeKeys(JSON.parse(res.text));
          tasks.forEach(function(task) {
            task.state = parseFloat(task.state);
          });
          responseHandler(tasks);
        }
      });
  },
  pushSchedule: function(schedule, successHandler, errorHandler) {
    var r;
    if (schedule.id) {
      r = request.put(this.host + '/api/schedules/' + schedule.id)
    } else {
      r = request.post(this.host + '/api/schedules/' + schedule.taskId)
    }
    r.send(JSON.stringify(decamelizeKeys(schedule)))
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(res.body);
        }
      });
  },

  addSchedule: function(schedule, deviceId, successHandler, errorHandler) {
    request
      .put(this.host + '/api/schedules/' + deviceId)
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
      .get(this.host + '/api/schedules')
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
      .get(this.host + '/api/schedules/' + scheduleId)
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
      .get(this.host + '/api/devices/' + deviceId + '/schedules')
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
      .put(this.host + '/api/schedules/' + scheduleId)
      .send(JSON.stringify(schedule))
      .end(function(err, res) {
        if (err) {
          errorHandler(err);
        } else {
          successHandler(schedule);
        }
      });
  },

  deleteSchedule: function(scheduleId, successHandler, errorHandler) {
    request
      .delete(this.host + '/api/schedules/' + scheduleId)
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
