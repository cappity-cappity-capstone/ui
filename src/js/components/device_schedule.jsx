var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var classNames = require('classnames');

var ScheduleInterface = require('interfaces/schedule_interface.js');

var Icon = require('components/icon.jsx');
var ScheduleList = require('components/schedule_list.jsx');
var EditSchedule = require('components/edit_schedule.jsx');

var DeviceSchedule = React.createClass({
  propTypes: {
    deviceId: React.PropTypes.string.isRequired,
    host: React.PropTypes.string.isRequired
  },
  getInitialState: function() {
    return {
      editing: null,
      tasks: []
    };
  },
  componentDidMount: function() {
    this.reload();
  },
  reload: function() {
    this.getScheduleInterface().getTasks(this.props.deviceId, function(response) {
      this.setState({tasks: response});
    }.bind(this));
  },
  handleEditClick: function(task, schedule) {
    return function(task, schedule) {
      this.setState({ editing: { task: task, schedule: schedule } });
    }.bind(this, task, schedule);
  },
  handleDoneEditing: function() {
    this.setState({ editing: null });
  },
  handleSaveSchedule: function(schedule) {
    schedule.startTime = schedule.startTime.format();
    if (schedule.endTime) schedule.endTime = schedule.endTime.format();

    this.getScheduleInterface().pushSchedule(schedule, function(response) {
      this.reload();
    }.bind(this), function(err) {
      console.log(err);
    });
    this.setState({ editing: null });
  },
  handleDeleteSchedule: function(schedule) {
    return function(schedule) {
      this.getScheduleInterface().deleteSchedule(schedule.id, function(response) {
        this.reload();
      }.bind(this), function(err) {
        console.log(err);
      });
    }.bind(this, schedule);
  },

  getScheduleInterface: function() {
    if (!(this._scheduleInterface instanceof ScheduleInterface)) {
      this._scheduleInterface = new ScheduleInterface(this.props.host);
    }

    return this._scheduleInterface;
  },

  render: function() {
    var tasks = this.state.tasks.map(function(task) {
      return (
        <div key={task.id}>
          <div>{(task.state > 0.0) ? 'On' : 'Off'}</div>
          <ScheduleList
            handleEditClick={this.handleEditClick.bind(this, task)}
            handleDeleteSchedule={this.handleDeleteSchedule}
            schedules={task.schedules} />
        </div>
      );
    }, this);

    var editing;
    if (this.state.editing !== null) {
       editing = (
         <EditSchedule
           handleCancel={this.handleDoneEditing}
           handleSaveSchedule={this.handleSaveSchedule}
           {...this.state.editing} />
       );
    }

    var tasksClasses = {
      'tasks-list': true,
      'focus': !editing,
    };
    var taskEditClasses = {
      'tasks-edit-schedule': true,
      'focus': !!editing
    };

    return (
      <div className="tasks-container">
        <div className="tasks">
          <div className={classNames(tasksClasses)}>{tasks}</div>
          <div className={classNames(taskEditClasses)}>{editing}</div>
        </div>
      </div>
    );
  }
});

module.exports = DeviceSchedule;
