var React = require('react');
var Icon = require('components/icon.jsx');

var EditSchedule = React.createClass({
  getStartTime: function() {
    if (this.props.schedule.startTime !== null) {
      return this.props.schedule.startTime.format("MMM D, h:mm a");
    }
  },
  getEndTime: function() {
    if (this.props.schedule.endTime !== null) {
      return this.props.schedule.endTime.format("MMM D, h:mm a");
    }
  },
  render: function() {
    return (
      <div>
        <div className="column">
          Starts:
        </div>
        <div className="column">
          <input type="text" value={this.getStartTime()} />
        </div>
        <div className="column">
          Ends:
        </div>
        <div className="column">
          <input type="text" value={this.getEndTime()} />
        </div>
        <div className="column">
          Frequency:
        </div>
        <div className="column">
          <input type="text" value={this.props.schedule.interval} />
        </div>
        <div className="column">
          <button onClick={this.props.handleSaveSchedule}>Save!</button>
        </div>
      </div>
    );
  }
});

module.exports = EditSchedule
