var React = require('react');
var Icon = require('components/icon.jsx');
var moment = require('moment');

var ScheduleList = React.createClass({
  propTypes: {
    schedules: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        startTime: React.PropTypes.string.isRequired,
        endTime: React.PropTypes.string,
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
    ];

    var values = units.filter(function(unit) {
      return unit[0] >= 1;
    }).map(function (unit) {
      return "" + unit[0] + " " + unit[1] + (unit[0] > 1 ? "s" : "");
    });

    return values[0];
  },
  toClick: null,
  moving: false,
  handleTouchStart: function(fn, args, event) {
    this.toClick = [fn, args]
  },
  handleTouchMove: function(event) {
    event.stopPropagation();

    this.moving = true
  },
  handleTouchEnd: function(event) {
    if (this.toClick && !this.moving) {
      event.stopPropagation();

      var fn = this.toClick[0];
      var args = this.toClick[1];

      fn(args);
    }
  },
  render: function() {
    var schedules = this.props.schedules.map(function(schedule) {
      return (
        <tr key={schedule.id}>
          <td className="start-time">{moment(schedule.startTime).format('MMM D, h:mm a')}</td>
          <td className="end-time">{schedule.endTime ? moment(schedule.endTime).format('MMM D, h:mm a') : "Never"}</td>
          <td className="interval">{this.prettyTimeInterval(schedule.interval)}</td>
          <td className="action">
            <Icon type="pencil-square-o" onTouchStart={this.handleTouchStart.bind(this, this.props.handleEditClick(schedule))} onClick={this.props.handleEditClick(schedule)} />
            <Icon type="minus-square-o" />
          </td>
        </tr>
      );
    }, this);
    return (
      <table onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
        <tr>
          <th className="start-time">Starts</th>
          <th className="end-time">Ends</th>
          <th className="interval">Frequency</th>
          <th className="action">
            <Icon type="plus-square-o" onTouchStart={this.handleTouchStart.bind(this, this.props.handleEditClick({}))}  onClick={this.props.handleEditClick({})} />
          </th>
        </tr>
        {schedules}
      </table>
    );
  }
});

module.exports = ScheduleList;
