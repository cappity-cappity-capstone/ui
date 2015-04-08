var React = require('react');
var classNames = require('classnames');

var Icon = require('components/icon.jsx');
var DeviceLog = require('components/device_log.jsx');
var DeviceSchedule = require('components/device_schedule.jsx');

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
      activeTab: 'schedule'
    };
  },

  scheduleClasses: function() {
    return classNames({
      tab: true,
      active: this.state.activeTab === 'schedule'
    });
  },

  logClasses: function() {
    return classNames({
      tab: true,
      active: this.state.activeTab === 'log'
    });
  },

  renderActiveTab: function() {
    if (this.state.activeTab === 'schedule') {
      return (
        <div className='schedule'>
          <DeviceSchedule host={this.props.host} deviceId={this.props.id} />
        </div>
      );
    } else if (this.state.activeTab === 'log') {
      return (
        <div className='log'>
          <DeviceLog host={this.props.host} deviceId={this.props.id} />
        </div>
      );
    }
  },

  showSchedule: function(event) {
    event.stopPropagation();
    this.setState({ activeTab: 'schedule' });
  },

  scheduleClick: function() {
    this.toClick = "schedule";
  },

  showLog: function(event) {
    event.stopPropagation();
    this.setState({ activeTab: 'log' });
  },

  logClick: function() {
    this.toClick = "log";
  },

  render: function() {
    return (
      <div className='device-info-container' onClick={this.handleOutsideClick}>
        <div className='info' onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} onClick={this.handleContainerClickEvent}>
          <div className='close-button' onTouchStart={this.closeClicked} onClick={this.handleCloseButtonEventAction}>
            <Icon type='close'/>
          </div>
          <ul className="nav">
            <li className={this.scheduleClasses()} onTouchStart={this.scheduleClick} onClick={this.showSchedule}>Schedule</li>
            <li className={this.logClasses()} onTouchStart={this.logClick} onClick={this.showLog}>Log</li>
          </ul>
          <div className="info-content">
            {this.renderActiveTab()}
          </div>
        </div>
      </div>
    );
  },

  toClick: null,
  moving: false,

  handleTouchMove: function(event) {
    event.stopPropagation();
    this.moving = true;
  },

  handleTouchEnd: function(event) {
    event.stopPropagation();

    if (this.toClick && !this.moving) {
      if (this.toClick == "schedule") {
        this.showSchedule(event);
      } else if (this.toClick == "log") {
        this.showLog(event);
      } else if (this.toClick == "close") {
        this.handleCloseButtonEventAction(event);
      }
    }
  },

  handleContainerClickEvent: function(event) {
    event.preventDefault();
    event.stopPropagation();
  },

  closeClicked: function(event) {
    this.toClick = "close";
  },

  handleCloseButtonEventAction: function(event) {
    this.props.onDeviceInfoClose(event);
  },

  handleOutsideClick: function(event) {
    this.props.onDeviceInfoClose(event);
  },
});

module.exports = DeviceInfo;
