var React = require('react');
var _ = require('underscore');
var moment = require('moment');

var Icon = require('components/icon.jsx');
var StateInterface = require('interfaces/state_interface.js');

var DeviceSchedule = React.createClass({
  render: function() {
    var tasks = this.props.tasks.map(function(task) {
      return (
        <div>
          <div>{(task.state > 0.0) ? 'On' : 'Off'}</div>
        </div>
      );
    });
    return (
      <div>
        {tasks}
      </div>
    );
  }
});

module.exports = DeviceSchedule;
