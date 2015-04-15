var React = require('react');
var moment = require('moment');

var Icon = require('components/icon.jsx');
var TimePicker = require('components/time_picker.jsx');

var WEEK = 604800,
    DAY = 86400,
    HOUR = 3600,
    MINUTE = 60;


var EditSchedule = React.createClass({
  getInitialState: function() {
    var intervalCoefficient,
        intervalBase,
        repeat = true,
        interval = this.props.schedule.interval;

    if (interval !== null && interval !== undefined) {
      if (interval >= WEEK) {
        intervalBase = WEEK;
      } else if (interval >= DAY) {
        intervalBase = DAY;
      } else if (interval >= HOUR) {
        intervalBase = HOUR;
      } else if (interval >= MINUTE) {
        intervalBase = MINUTE;
      } else if (interval < 0) {
        repeat = false;
      } else {
        intervalBase = DAY;
      }

      intervalCoefficient = interval / intervalBase;
    } else {
      intervalCoefficient = 1;
      intervalBase = DAY;
    }

    var startTime = moment(this.props.schedule.startTime) || moment();
    var endTime = this.props.schedule.endTime;
    var ends = (endTime !== undefined && endTime !== null);
    if (ends) {
      endTime = moment(endTime);
    }

    return {
      error: null,
      repeat: repeat,
      intervalCoefficient: intervalCoefficient,
      intervalBase: intervalBase,
      startTime: startTime,
      ends: ends,
      endTime: endTime
    };
  },
  setRepeat: function(event) {
    var repeat = event.target.value;
    this.setState({ repeat: repeat === 'yes' });
  },
  setIntervalCoefficient: function(event) {
    var intervalCoefficient = event.target.value;
    this.setState({ intervalCoefficient: intervalCoefficient });
  },
  setIntervalBase: function(event) {
    var intervalBase = parseInt(event.target.value, 10);
    this.setState({ intervalBase: intervalBase });
  },
  setEnds: function(event) {
    var endTime = this.state.endTime;
    if (endTime === undefined || endTime === null) {
      endTime = moment();
    }
    this.setState({ ends: (event.target.value === 'yes'), endTime: endTime });
  },
  setStartTime: function(dateTime) {
    this.setState({ startTime: dateTime });
  },
  setEndTime: function(dateTime) {
    this.setState({ endTime: dateTime });
  },
  pluralizeBase: function(word) {
    if (this.state.intervalCoefficient != 1) {
      return "" + word + "s";
    } else {
      return word;
    }
  },

  saveSchedule: function() {
    var newSchedule = {
      id: this.props.schedule.id,
      taskId: this.props.task.id,
      startTime: this.state.startTime.clone()
    };

    var intervalCoefficient = parseFloat(intervalCoefficient);

    if (this.state.repeat) {
      if (isNaN(intervalCoefficient)) {
        this.setState({ error: 'Please set a numerical repeat number' });
        return;
      } else {
        newSchedule.interval = this.state.intervalBase * parseFloat(this.state.intervalCoefficient);
      }
    } else {
      newSchedule.interval = -1;
    }

    if (this.state.ends) {
      newSchedule.endTime = this.state.endTime.clone();
    }

    this.props.handleSaveSchedule(newSchedule, function(err) {
      this.setState({ error: err });
    }.bind(this));
  },
  closeError: function() {
    this.setState({ error: null });
  },

  renderErrors: function() {
    if (this.state.error) {
      return (
        <div className="error">
          {this.state.error}
          <Icon onClick={this.closeError} type="times" style={{ float: 'right' }} />
        </div>
      );
    }
  },

  renderAction: function() {
    if (this.props.task.state > 0.0) {
      return (<tr><td className="left">Do what?</td><td className="right">Turn on</td></tr>);
    } else {
      return (<tr><td className="left">Do what?</td><td className="right">Turn off</td></tr>);
    }
  },
  renderRepeat: function() {
    return (
      <tr>
        <td className="left">Repeats?</td>
        <td className="right">
          <div className="custom-select">
            <select value={(this.state.repeat) ? 'yes' : 'no'} onChange={this.setRepeat}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </td>
      </tr>
    );
  },
  renderInterval: function() {
    if (this.state.repeat) {
      return (
        <tr>
          <td className="left">
            How often?
          </td>
          <td className="right">
            <input className="interval" value={this.state.intervalCoefficient} onChange={this.setIntervalCoefficient} />
            {' '}
            <div className="custom-select">
              <select value={this.state.intervalBase} onChange={this.setIntervalBase}>
                <option value="604800">{this.pluralizeBase("week")}</option>
                <option value="86400">{this.pluralizeBase("day")}</option>
                <option value="3600">{this.pluralizeBase("hour")}</option>
                <option value="60">{this.pluralizeBase("minute")}</option>
              </select>
            </div>
          </td>
        </tr>
      );
    }
  },
  renderStartTime: function() {
    return (
      <tr>
        <td className="left">Starting on</td>
        <td className="right"><TimePicker onChange={this.setStartTime} dateTime={this.state.startTime.startOf('minute')} /></td>
      </tr>
    );
  },
  renderEndTime: function() {
    if (this.state.ends) {
      return (
        <tr key="endTime">
          <td className="left">Ending on</td>
          <td className="right"><TimePicker onChange={this.setEndTime} dateTime={this.state.endTime.startOf('minute')} /></td>
        </tr>
      );
    }
  },
  renderEnds: function() {
    if (this.state.repeat) {
      return [
        (
          <tr key="ends">
            <td className="left">Ends?</td>
            <td className="right">
              <div className="custom-select">
                <select value={(this.state.ends) ? 'yes' : 'no'} onChange={this.setEnds}>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </select>
              </div>
            </td>
          </tr>
        ),
        this.renderEndTime()
      ];
    }
  },
  render: function() {
    return (
      <div className="edit-schedule">
        <span className="back" onClick={this.props.handleCancel}>
          <Icon type="arrow-left"/>
        </span>
        {this.renderErrors()}
        <table className="details">
          <tbody>
            {this.renderAction()}
            {this.renderRepeat()}
            {this.renderInterval()}
            {this.renderStartTime()}
            {this.renderEnds()}
          </tbody>
        </table>
        <button onClick={this.saveSchedule}>Save!</button>
      </div>
    );
  }
});

module.exports = EditSchedule;
