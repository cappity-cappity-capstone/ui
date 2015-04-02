var React = require('react');
var _ = require('underscore');

var Icon = require('components/icon.jsx');

var DeviceLog = React.createClass({
  propTypes: {
    states: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        state: React.PropTypes.number,
        source: React.PropTypes.string,
        createdAt: React.PropTypes.object
      })
    )
  },
  render: function() {
    var log = <span>No device changes</span>;
    if (!_.isEmpty(this.props.states)) {
      var logEntries = _.map(this.props.states, function(state) {
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
          <tr>
            <th className="time">Time</th>
            <th className="state">State</th>
            <th className="source">Source</th>
          </tr>
          {logEntries}
        </table>
      );
    }
    return (
      <div>
        <h4>Log</h4>
        {log}
      </div>
    );
  }
});

module.exports = DeviceLog;