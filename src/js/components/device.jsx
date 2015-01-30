var React = require('react');

var DEVICE_TYPES = [
  'outlet',
  'gas-valve',
  'gas-sensor',
  'lock'
];

var Device = React.createClass({
  propTypes: {
    id: React.PropTypes.number.isRequired,
    on: React.PropTypes.bool.isRequired,
    type: React.PropTypes.oneOf(DEVICE_TYPES).isRequired,
    name: React.PropTypes.string.isRequired
  },

  render: function() {
    var state = this.props.on ? 'on' : 'off';
    return (
      <div className="device">
        <div className="device-name">{this.props.name}</div>
          <div className={state + " device-outer-circle"}>
            <div className="device-inner-outline">
              <div className="device-icon-background"></div>
              <div className="device-control-circle">
                <div className="device-control-circle-crossbar"></div>
              </div>
              <div className="device-control-status">
                <span>{state}</span>
              </div>
              <div className="device-control-on">
                <div className="fill"></div>
                <span>On</span>
              </div>
              <div className="device-control-off">
                <div className="fill"></div>
                <span>Off</span>
              </div>
              <div className="device-info">
                <i className="icon-info"></i>
              </div>
              <div className="device-icon-container">
                <i className={"device-icon icon-" + this.props.type + "_" + state}></i>
              </div>
            </div>
          </div>
        </div>
    );
  }
});

module.exports = Device;
