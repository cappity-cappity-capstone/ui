var React = require('react');
var Icon = require('components/icon.jsx');
var moment = require('moment');

var WEEK = 604800,
    DAY = 86400,
    HOUR = 3600,
    MINUTE = 60;


var EditSchedule = React.createClass({
  getInitialState: function() {
    var intervalCoefficient,
        intervalBase,
        occurence = 'every',
        interval = this.props.schedule.interval;

    if (interval !== null) {
      if (interval > WEEK) {
        intervalBase = WEEK;
      } else if (interval > DAY) {
        intervalBase = DAY;
      } else if (interval > HOUR) {
        intervalBase = HOUR;
      } else if (interval > MINUTE) {
        intervalBase = MINUTE;
      } else if (interval < 0) {
        occurence = 'just-once';
      } else {
        intervalBase = DAY;
      }

      intervalCoefficient = interval / intervalBase;
    } else {
      intervalCoefficient = 1;
      intervalBase = DAY;
    }

    var startTime = this.props.schedule.startTime || moment();
    var endTime = this.props.schedule.endTime;
    var longevity = (endTime !== null) ? 'until' : 'forever';

    return {
      occurence: occurence,
      intervalCoefficient: intervalCoefficient,
      intervalBase: intervalBase,
      startTime: startTime,
      longevity: longevity,
      endTime: endTime
    }
  },
  setOccurence: function(event) {
    var occurence = event.target.value;
    this.setState({ occurence: occurence });
  },
  setIntervalCoefficient: function(event) {
    var intervalCoefficient = parseFloat(event.target.value);
    this.setState({ intervalCoefficient: intervalCoefficient });
  },
  setIntervalBase: function(event) {
    var intervalBase = parseInt(event.target.value, 10);
    this.setState({ intervalBase: intervalBase });
  },
  setLongevity: function(event) {
    var longevity = event.target.value;
    var endTime = this.state.endTime;
    if (endTime === null) {
      endTime = moment();
    }
    this.setState({ longevity: longevity, endTime: endTime });
  },
  getStartDate: function() {
    return this.state.startTime.format('MMMM D');
  },
  getStartTime: function() {
    return this.state.startTime.format('h:mm a');
  },
  getEndDate: function() {
    return this.state.endTime.format('MMMM D');
  },
  getEndTime: function() {
    return this.state.endTime.format('h:mm a');
  },
  pluralizeBase: function(word) {
    if (this.state.intervalCoefficient != 1) {
      return "" + word + "s";
    } else {
      return word;
    }
  },
  renderAction: function() {
    if (this.props.task.state > 0.0) {
      return (<p>Turn on</p>);
    } else {
      return (<p>Turn off</p>);
    }
  },
  renderOccurence: function() {
    return (
      <p>
        <select value={this.state.occurence} onChange={this.setOccurence}>
          <option value="every">every</option>
          <option value="just-once">just once</option>
        </select>
      </p>
    );
  },
  renderInterval: function() {
    if (this.state.occurence == 'every') {
      return (
        <span>
          <p>
            <input className="interval" value={this.state.intervalCoefficient} onChange={this.setIntervalCoefficient} />
            {' '}
            <select value={this.state.intervalBase} onChange={this.setIntervalBase}>
              <option value="604800">{this.pluralizeBase("week")}</option>
              <option value="86400">{this.pluralizeBase("day")}</option>
              <option value="3600">{this.pluralizeBase("hour")}</option>
              <option value="60">{this.pluralizeBase("minute")}</option>
            </select>
          </p>
          <p>
            beginning on
          </p>
        </span>
      );
    } else {
      return (<p>on</p>);
    }
  },
  renderStartTime: function() {
    return (
      <p>
        <input className="date" type="text" value={this.getStartDate()} />
        {' at '}
        <input className="time" type="text" value={this.getStartTime()} />
      </p>
    );
  },
  renderEndTime: function() {
    if (this.state.longevity === 'until') {
      return (
        <p>
          <input className="date" type="text" value={this.getEndDate()} />
          {' at '}
          <input className="time" type="text" value={this.getEndTime()} />
        </p>
      );
    }
  },
  renderLongevity: function() {
    if (this.state.occurence === 'every') {
      return (
        <span>
          <p>
            <select value={this.state.longevity} onChange={this.setLongevity}>
              <option value='until'>until</option>
              <option value='forever'>forever</option>
            </select>
          </p>
          {this.renderEndTime()}
        </span>
      );
    }
  },
  render: function() {
    return (
      <div className="edit-schedule">
        <span className="back" onClick={this.props.handleCancel}>
          <Icon type="arrow-left"/>
        </span>
        {this.renderAction()}
        {this.renderOccurence()}
        {this.renderInterval()}
        {this.renderStartTime()}
        {this.renderLongevity()}
        <button>Save!</button>
      </div>
    );
  }
});

module.exports = EditSchedule
