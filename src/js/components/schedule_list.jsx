var React = require('react');
var Icon = require('components/icon.jsx');

var ScheduleList = React.createClass({
  propTypes: {
    schedules: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        startTime: React.PropTypes.object.isRequired,
        endTime: React.PropTypes.object,
        interval: React.PropTypes.number.isRequired,
      })
    )
  },
  prettyTimeInterval: function(interval) {
    var units = [
      [interval / (365 * 24 * 60 * 60), "year"],
      [interval / (30 * 24 * 60 * 60), "month"],
      [interval / (7 * 24 * 60 * 60), "week"],
      [interval / (24 * 60 * 60), "day"],
      [interval / (60 * 60), "hour"],
      [interval / (60), "minute"],
      [interval, "seconds"]
    ]

    var values = units.filter(function(unit) {
      return unit[0] >= 1
    }).map(function (unit) {
      return "" + unit[0] + " " + unit[1] + (unit[0] > 1 ? "s" : "")
    });

    return values[0];
  },
  render: function() {
    var schedules = this.props.schedules.map(function(schedule) {
      return (
        <tr key={schedule.id}>
          <td className="start-time">{schedule.startTime.format('MMM D, h:mm a')}</td>
          <td className="end-time">{schedule.endTime ? schedule.endTime.format('MMM D, h:mm a') : "Never"}</td>
          <td className="interval">{this.prettyTimeInterval(schedule.interval)}</td>
          <td className="action">
            <Icon type="pencil-square-o" onClick={this.props.handleEditClick.bind(this.props.handleEditContext, schedule)} />
            <Icon type="minus-square-o" />
          </td>
        </tr>
      );
    }, this);
    return (
      <table>
        <tr>
          <th className="start-time">Starts</th>
          <th className="end-time">Ends</th>
          <th className="interval">Frequency</th>
          <th className="action"><Icon type="plus-square-o" /></th>
        </tr>
        {schedules}
      </table>
    );
  }
});

module.exports = ScheduleList;
