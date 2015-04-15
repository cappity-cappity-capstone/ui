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
      .end(function(res) {
        if (res.ok) {
          var tasks = camelizeKeys(JSON.parse(res.text));
          tasks.forEach(function(task) {
            task.state = parseFloat(task.state);
          });
          responseHandler(tasks);
        } else {
          console.log(res.body)
        }
      });
  },
  pushSchedule: function(schedule, successHandler, errorHandler) {
    var r;
    if (schedule.id) {
      r = request.put(this.host + '/api/schedules/' + schedule.id);
    } else {
      r = request.post(this.host + '/api/schedules/' + schedule.taskId);
    }
    r.send(JSON.stringify(decamelizeKeys(schedule)))
      .end(function(res) {
        if (res.ok) {
          successHandler(res.body);
        } else {
          errorHandler(res.body);
        }
      });
  },

  addSchedule: function(schedule, deviceId, successHandler, errorHandler) {
    request
      .put(this.host + '/api/schedules/' + deviceId)
      .send(JSON.stringify(schedule))
      .end(function(res) {
        if (res.ok) {
          successHandler(device);
        } else {
          errorHandler(res.body);
        }
      });
  },

  getSchedules: function(responseHandler) {
    request
      .get(this.host + '/api/schedules')
      .end(function(res) {
        if (res.ok) {
          responseHandler(res.body);
        }
      });
  },

  getSchedule: function(scheduleId, responseHandler) {
    request
      .get(this.host + '/api/schedules/' + scheduleId)
      .end(function(res) {
        if (res.ok) {
          responseHandler(res.body);
        }
      });
  },

  getDeviceSchedule: function(deviceId, responseHandler) {
    request
      .get(this.host + '/api/devices/' + deviceId + '/schedules')
      .end(function(res) {
        if (res.ok) {
          responseHandler(res.body);
        }
      });
  },

  updateSchedule: function(scheduleId, schedule, successHandler, errorHandler) {
    request
      .put(this.host + '/api/schedules/' + scheduleId)
      .send(JSON.stringify(schedule))
      .end(function(res) {
        if (res.ok) {
          successHandler(schedule);
        } else {
          errorHandler(res.body);
        }
      });
  },

  deleteSchedule: function(scheduleId, successHandler, errorHandler) {
    request
      .del(this.host + '/api/schedules/' + scheduleId)
      .end(function(res) {
        if (res.ok) {
          successHandler(scheduleId);
        } else {
          errorHandler(res.body);
        }
      });
  }
};

module.exports = ScheduleInterface;
