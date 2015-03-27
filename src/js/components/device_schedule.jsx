var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var classSet = React.addons.classSet;

var Icon = require('components/icon.jsx');
var ScheduleList = require('components/schedule_list.jsx');
var StateInterface = require('interfaces/state_interface.js');

var DeviceSchedule = React.createClass({
  propTypes: {
    tasks: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        state: React.PropTypes.number.isRequired,
        schedules: React.PropTypes.array.isRequired
      })
    )
  },
  getInitialState: function() {
    return {
      editing: null
    }
  },
  handleEditClick: function(schedule) {
    this.setState({ editing: schedule });
  },
  saveSchedule: function() {
    this.setState({ editing: null });
  },
  renderEditing: function() {
    if (this.state.editing !== null) {
      return <div onClick={this.saveSchedule}>{this.state.editing.id}</div>
    }
  },
  render: function() {
    var tasks = this.props.tasks.map(function(task) {
      return (
        <div key={task.id}>
          <div>{(task.state > 0.0) ? 'On' : 'Off'}</div>
          <ScheduleList handleEditContext={this} handleEditClick={this.handleEditClick} schedules={task.schedules} />
        </div>
      );
    }, this);

    var editing = this.state.editing !== null;

    var tasksClasses = {
      'tasks-list': true,
      'slide-left': editing,
    }
    var taskEditClasses = {
      'tasks-edit-schedule': true,
      'slide-right': !editing
    }

    return (
      <div className="tasks-container">
        <div className="tasks">
          <div className={classSet(tasksClasses)}>{tasks}</div>
          <div className={classSet(taskEditClasses)}>{this.renderEditing()}</div>
        </div>
      </div>
    );
  }
});

module.exports = DeviceSchedule;
