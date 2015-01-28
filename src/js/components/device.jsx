var React = require('react')

const DEVICE_TYPES = [
  'outlet',
  'gas-valve',
  'gas-sensor',
  'lock'
];

var Device = React.createClass({
  propTypes: {
    on: React.PropTypes.bool.isRequired,
    type: React.PropTypes.oneOf(DEVICE_TYPES).isRequired,
    name: React.PropTypes.string.isRequired
  },

  render: function() {
    const state = this.props.on ? 'on' : 'off';
    return (
      <div className="device">
        <div className="device-name">{this.props.name}</div>
          <div className={state + " device-outer-circle"}>
            <div className="device-inner-outline">
              <div className="device-icon-container">
                <i className={"device-icon icon-" + this.props.type + "_" + state}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Device;
