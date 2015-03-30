var React = require('react');
var _ = require('underscore');
var moment = require('moment');

var Icon = require('components/icon.jsx');
var StateInterface = require('interfaces/state_interface.js');
var ScheduleInterface = require('interfaces/schedule_interface.js');
var DeviceLog = require('components/device_log.jsx');
var DeviceSchedule = require('components/device_schedule.jsx');

var DEVICE_TYPES = [
  'outlet',
  'stove',
  'gas-sensor',
  'lock'
];

var DeviceInfo = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onDeviceInfoClose: React.PropTypes.func.isRequired,
    host: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      states: [],
      tasks: []
    };
  },

  componentDidMount: function() {
    this.getStateInterface().getStates(this.props.id, function(response) {
      this.setState({states: response});
    }.bind(this));

    this.getScheduleInterface().getTasks(this.props.id, function(response) {
      this.setState({tasks: response});
    }.bind(this));
  },

  render: function() {
    return (
      <div className='device-info-container' onClick={this.handleContainerClickEvent}>
        <div className='info'>
          <div className='close-button' onClick={this.handleCloseButtonEventAction}>
            <Icon type='close'/>
          </div>
          <div className='schedule'>
            <DeviceSchedule tasks={this.state.tasks} />
          </div>
          <div className='log'>
            <DeviceLog states={this.state.states} />
          </div>
        </div>
      </div>
    );
  },

  handleContainerClickEvent: function(event) {
    event.preventDefault();
    event.stopPropagation();
  },

  handleCloseButtonEventAction: function(event) {
    this.props.onDeviceInfoClose(event);
  },

  getStateInterface: function() {
    if (!(this._stateInterface instanceof StateInterface)) {
      this._stateInterface = new StateInterface(this.props.host);
    }

    return this._stateInterface;
  },

  getScheduleInterface: function() {
    if (!(this._scheduleInterface instanceof ScheduleInterface)) {
      this._scheduleInterface = new ScheduleInterface(this.props.host);
    }

    return this._scheduleInterface;
  }
});

module.exports = DeviceInfo;
