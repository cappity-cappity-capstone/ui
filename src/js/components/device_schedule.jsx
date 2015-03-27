var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var classSet = React.addons.classSet;

var Icon = require('components/icon.jsx');
var ScheduleList = require('components/schedule_list.jsx');
var StateInterface = require('interfaces/state_interface.js');
var EditSchedule = require('components/edit_schedule.jsx');

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
    return function(schedule) {
      this.setState({ editing: schedule });
    }.bind(this, schedule);
  },
  handleSaveSchedule: function(schedule) {
    return function(schedule) {
      console.log(schedule);
      this.setState({ editing: null });
    }.bind(this, schedule)
  },
  render: function() {
    var tasks = this.props.tasks.map(function(task) {
      return (
        <div key={task.id}>
          <div>{(task.state > 0.0) ? 'On' : 'Off'}</div>
          <ScheduleList
            handleEditClick={this.handleEditClick.bind(this)}
            schedules={task.schedules} />
        </div>
      );
    }, this);

    var editing;
    if (this.state.editing !== null) {
       editing = (
         <EditSchedule
           handleSaveSchedule={this.handleSaveSchedule(this.state.editing)}
           schedule={this.state.editing} />
       )
    }

    var tasksClasses = {
      'tasks-list': true,
      'slide-left': !!editing,
    }
    var taskEditClasses = {
      'tasks-edit-schedule': true,
      'slide-right': !editing
    }

    return (
      <div className="tasks-container">
        <div className="tasks">
          <div className={classSet(tasksClasses)}>{tasks}</div>
          <div className={classSet(taskEditClasses)}>{editing}</div>
        </div>
      </div>
    );
  }
});

module.exports = DeviceSchedule;
