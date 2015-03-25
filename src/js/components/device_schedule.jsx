var React = require('react');
var _ = require('underscore');
var moment = require('moment');

var Icon = require('components/icon.jsx');
var StateInterface = require('interfaces/state_interface.js');

var DeviceSchedule = React.createClass({
  prettyTimeInterval: function(interval) {
    var timeDiff = moment(interval);
    var units = [
      [timeDiff / (365 * 24 * 60 * 60), "year"],
      [timeDiff / (30 * 24 * 60 * 60), "month"],
      [timeDiff / (7 * 24 * 60 * 60), "week"],
      [timeDiff / (24 * 60 * 60), "day"],
      [timeDiff / (60 * 60), "hour"],
      [timeDiff / (60), "minute"],
      [timeDiff, "seconds"]
    ]

    var values = _.map(_.filter(units, function(unit) {
      return unit[0] >= 1
    }), function (unit) {
      return "" + unit[0] + " " + unit[1] + (unit[0] > 1 ? "s" : "")
    });

    return "every " + values[0];
  },
  renderSchedules: function(schedules) {
    var dom = schedules.map(function(schedule) {
      return (
        <tr>
          <td className="start-time">{schedule.startTime.format('MMM D, h:mm a')}</td>
          <td className="end-time">{schedule.endTime ? schedule.endTime.format('MMM D, h:mm a') : "Never"}</td>
          <td className="interval">{this.prettyTimeInterval(schedule.interval)}</td>
          <td className="action"><Icon type="pencil-square-o" /></td>
        </tr>
      );
    }, this);
    return (
      <table>
        <tr>
          <th className="start-time">Start time</th>
          <th className="end-time">End Time</th>
          <th className="interval">Interval</th>
          <th className="action"><Icon type="plus-square-o" /></th>
        </tr>
        {dom}
      </table>
    );
  },
  render: function() {
    var tasks = this.props.tasks.map(function(task) {
      return (
        <div>
          <div>{(task.state > 0.0) ? 'On' : 'Off'}</div>
          {this.renderSchedules(task.schedules)}
        </div>
      );
    }, this);
    return (
      <div>
        {tasks}
      </div>
    );
  }
});

module.exports = DeviceSchedule;
