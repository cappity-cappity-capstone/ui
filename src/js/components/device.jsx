var React = require('react');

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
    // naming it initialX clearly indicates that the only purpose
    // of the passed down prop is to initialize something internally
    var state = this.props.on ? 'on' : 'off';
    return {device_state: state};
  },

  propTypes: {
    id: React.PropTypes.number.isRequired,
    on: React.PropTypes.bool.isRequired,
    type: React.PropTypes.oneOf(DEVICE_TYPES).isRequired,
    name: React.PropTypes.string.isRequired
  },

  render: function() {
    var status = STATUS_COPY[this.props.type][this.state.device_state];

    return (
      <div className="device">
        <div className="device-name">{this.props.name}</div>
          <div className={this.state.device_state + " device-outer-circle"}>
            <div className="device-inner-circle">
              <div className="device-icon-background"></div>
              <div className="device-control-circle">
                <div className="device-control-circle-crossbar"></div>
              </div>
              <div className="device-control-status">
                <span>{status}</span>
              </div>
              <div className="device-control-on" onClick={this.handleOnClick}>
                <div className="fill"></div>
                <span>On</span>
              </div>
              <div className="device-control-off" onClick={this.handleOffClick}>
                <div className="fill"></div>
                <span>Off</span>
              </div>
              <div className="device-info" onClick={this.handleInfoClick}>
                <i className="icon-info"></i>
              </div>
              <div className="device-icon-container">
                <i className={"device-icon icon-" + this.props.type + "_" + this.state.device_state}></i>
              </div>
            </div>
          </div>
        </div>
    );
  },

  handleOnClick: function() {
    this.setState({device_state: "on"});
  },

  handleOffClick: function() {
    this.setState({device_state: "off"});
  },

  handleInfoClick: function() {
    this.setState({device_state: "info"});
  }
});

module.exports = Device;
