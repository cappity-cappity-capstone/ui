var React = require('react');
var _ = require('underscore');

var Icon = require('components/icon.jsx');
var StateInterface = require('interfaces/state_interface.js');

var DeviceLog = React.createClass({
  propTypes: {
    deviceId: React.PropTypes.string.isRequired,
    host: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return { states: [], timeout: null };
  },
  componentDidMount: function() {
    this.reload();
    this.setState({ timeout: window.setTimeout(this.reload, 30000) });
  },
  componentWillUnmount: function() {
    if (this.state.timeout) {
      window.clearTimeout(this.state.timeout);
    }
  },
  reload: function() {
    this.getStateInterface().getStates(this.props.deviceId, function(response) {
      this.setState({states: response, timeout: window.setTimeout(this.reload, 30000) });
    }.bind(this));
  },
  render: function() {
    var log = <span>No device changes</span>;
    if (!_.isEmpty(this.state.states)) {
      var logEntries = _.map(this.state.states, function(state) {
        var stateText;
        if (state.state > 0.0) {
          stateText = <Icon style={{color: "green"}} type="toggle-on" />;
        } else {
          stateText = <Icon style={{color: "red"}} type="toggle-off" />;
        }
        var dateTimeString = state.createdAt.format('MMM D, h:mm a');
        var sourceText;
        switch (state.source) {
          case 'manual_override': sourceText = 'Web UI'; break;
          case 'scheduled': sourceText = 'Scheduled'; break;
          case 'parent_left': sourceText = 'No phone around'; break;
          default: sourceText = 'Unknown'; break;
        }
        return (
          <tr key={state.id}>
            <td className="time">{dateTimeString}</td>
            <td className="state">{stateText}</td>
            <td className="source">{sourceText}</td>
          </tr>
        );
      });

      log = (
        <table>
          <thead>
            <tr>
              <th className="time">Time</th>
              <th className="state">State</th>
              <th className="source">Source</th>
            </tr>
          </thead>
          <tbody>
            {logEntries}
          </tbody>
        </table>
      );
    }
    return log;
  },

  getStateInterface: function() {
    if (!(this._stateInterface instanceof StateInterface)) {
      this._stateInterface = new StateInterface(this.props.host);
    }

    return this._stateInterface;
  }
});

module.exports = DeviceLog;
