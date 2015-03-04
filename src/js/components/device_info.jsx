var React = require('react');
var _ = require('underscore');

var Icon = require('components/icon.jsx');
var StateInterface = require('interfaces/state_interface.js');

var DEVICE_TYPES = [
  'outlet',
  'stove',
  'gas-sensor',
  'lock'
];

var DeviceInfo = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    on: React.PropTypes.bool.isRequired,
    type: React.PropTypes.oneOf(DEVICE_TYPES).isRequired,
    name: React.PropTypes.string.isRequired,
    onDeviceInfoClose: React.PropTypes.func.isRequired,
    host: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      states: []
    };
  },

  componentDidMount: function() {
    this.getStateInterface().getStates(this.props.id, function(response) {
      this.setState({states: response});
    }.bind(this));
  },

  render: function() {
    var log = <li>No device changes</li>;
    if (!_.isEmpty(this.state.states)) {
      log = _.map(this.state.states, function(state) {
        var stateText = state.on ? 'On' : 'Off';
        return <li key={state.createdAt}>{state.createdAt + ': ' + stateText}</li>;
      });
    }
    return (
      <div className="device-info-container">
        <div className='info'>
          <div className='close-button' onClick={this.handleCloseButtonEventAction}>
            <Icon type='close' />
          </div>
          <h2 className='name'>{this.props.name}</h2>
          <div className='schedule'>
            <h4>Schedule</h4>
          </div>
          <div className='log'>
            <h4>Log</h4>
            <ul>
              {log}
            </ul>
          </div>
        </div>
      </div>
    );
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
});

module.exports = DeviceInfo;
