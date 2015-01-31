var React = require('react');
React.initializeTouchEvents(true);
var DEVICE_TYPES = [
  'outlet',
  'stove',
  'gas-sensor',
  'lock'
];

var STATUS_COPY = {
  'outlet': {
    'on': 'on',
    'off': 'off'
  },

  'stove': {
    'on': 'on',
    'off': 'off'
  },

  'gas-sensor': {
    'on': 'on',
    'off': 'off'
  },

  'lock': {
    'on': 'locked',
    'off': 'unlocked'
  }
};

var Device = React.createClass({
  getInitialState: function() {
    var state = this.props.on ? 'on' : 'off';
    return {
      deviceState: state
    };
  },

  propTypes: {
    id: React.PropTypes.number.isRequired,
    on: React.PropTypes.bool.isRequired,
    type: React.PropTypes.oneOf(DEVICE_TYPES).isRequired,
    name: React.PropTypes.string.isRequired
  },

  render: function() {
    var status = STATUS_COPY[this.props.type][this.state.deviceState];
    var controlClass = this.props.showControls ? "control" : "";
    return (
      <div className="device">
        <div className="device-name">{this.props.name}</div>
          <div className={this.state.deviceState + " device-outer-circle " + controlClass} onTouchEnd={this.handleModuleOpenTouch}>
            <div className="device-inner-circle">
              <div className="device-icon-background"></div>
              <div className="device-control-circle">
                <div className="device-control-circle-crossbar"></div>
              </div>
              <div className="device-control-status">
                <span>{status}</span>
              </div>
              <div className="device-control-on" onClick={this.handleOnClick}>
                <div className="device-control-button-container">
                  <div className="fill"></div>
                  <span>On</span>
                </div>
              </div>
              <div className="device-control-off" onClick={this.handleOffClick}>
                <div className="device-control-button-container">
                  <div className="fill"></div>
                  <span>Off</span>
                </div>
              </div>
              <div className="device-info" onClick={this.handleInfoClick}>
                <i className="icon-info"></i>
              </div>
              <div className="device-icon-container">
                <i className={"device-icon icon-" + this.props.type + "_" + this.state.deviceState} onTouchEnd={this.handleModuleCloseTouch}></i>
              </div>
            </div>
          </div>
        </div>
    );
  },

  handleOnClick: function() {
    this.setState({deviceState: "on"});
  },

  handleOffClick: function() {
    this.setState({deviceState: "off"});
  },

  handleInfoClick: function() {
    this.setState({deviceState: "info"});
  },

  //opens the controls for a module
  handleModuleOpenTouch: function(event) {
    event.stopPropagation();
    this.props.showControls = true;
    this.render();
  },

  //closes the controls for a module
  handleModuleCloseTouch: function(event) {
    event.stopPropagation();
    this.props.showControls = true;
    this.render();
  }
});

module.exports = Device;
