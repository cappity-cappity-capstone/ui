var React = require('react/addons');
var classNames = require('classnames');
var Icon = require('components/icon.jsx');
var moment = require('moment');

function isNodeInRoot(node, root) {
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}

var TimePickerDate = React.createClass({
  getInitialState: function() {
    return {
      dateTime: moment(this.props.dateTime).clone()
    };
  },
  changeMonth: function(direction) {
    var newDateTime = moment(this.state.dateTime).clone().add(direction, 'month');
    this.setState({
      dateTime: newDateTime
    });
  },
  renderDays: function() {
    var cells = [];
    var html = [];

    var year = this.state.dateTime.year();
    var month = this.state.dateTime.month();
    var day = this.state.dateTime.date();
    var prevMonth = this.state.dateTime.clone().subtract(1, 'month');
    var days = prevMonth.daysInMonth();
    prevMonth.date(days).startOf('week');
    nextMonth = moment(prevMonth).clone().add(42, 'day');

    while (prevMonth.isBefore(nextMonth)) {
      var classes = { day: true };
      if (prevMonth.year() < year || (prevMonth.year() === year && prevMonth.month() < month)) {
        classes.faded = true;
      } else if (prevMonth.year() > year || (prevMonth.year() === year && prevMonth.month() > month)) {
        classes.faded = true;
      }

      if (prevMonth.isSame(this.props.dateTime, 'day')) {
        classes.selected = true;
      }

      if (prevMonth.isSame(moment(), 'day')) {
        classes.today = true;
      }

      var key = (prevMonth.month() + "-" + prevMonth.date());
      var fn = null;
      if (prevMonth.isSame(this.state.dateTime, 'month') && prevMonth.isSame(this.state.dateTime, 'year')) {
         fn = this.props.alterDate(prevMonth.clone());
      }

      cells.push(<td key={key} className={classNames(classes)} onClick={fn}>{prevMonth.date()}</td>);

      if (prevMonth.weekday() === moment().endOf('week').weekday()) {
        row = <tr key={prevMonth.month() + '-' + prevMonth.date()}>{cells}</tr>;
        html.push(row);
        cells = [];
      }
      prevMonth.add(1, 'day');
    }

    return html;
  },
  render: function() {
    return (
      <table className="date">
        <tbody>
          <tr>
            <td>
              <Icon type="chevron-left" onClick={this.changeMonth.bind(this, -1)} />
            </td>
            <td colSpan="5">{this.state.dateTime.format('MMMM')}</td>
            <td>
              <Icon type="chevron-right" onClick={this.changeMonth.bind(this, 1)} />
            </td>
          </tr>
          <tr>
            <td>S</td>
            <td>M</td>
            <td>T</td>
            <td>W</td>
            <td>T</td>
            <td>F</td>
            <td>S</td>
          </tr>
          {this.renderDays()}
          <tr>
            <td className="swap-button" colSpan="7" onClick={this.props.swap}>Time</td>
          </tr>
        </tbody>
      </table>
    );
  }
});

var TimePickerTime = React.createClass({
  getHour: function() {
    return this.props.dateTime.format('h');
  },
  getMinute: function() {
    return this.props.dateTime.format('mm');
  },
  getPeriod: function() {
    return this.props.dateTime.format('a');
  },

  togglePeriod: function() {
    if (this.props.dateTime.hours() >= 12) {
      this.props.alterTime(-12, 'hour')();
    } else {
      this.props.alterTime(12, 'hour')();
    }
  },

  render: function() {
    return (
      <table className="time">
        <tr>
          <td className="hour" onClick={this.props.alterTime(1, 'hour')}><Icon type="chevron-up" /></td>
          <td className="semicolon"></td>
          <td className="minute" onClick={this.props.alterTime(1, 'minute')}><Icon type="chevron-up" /></td>
          <td className="timeperiod"></td>
        </tr>
        <tr>
          <td className="hour">{this.getHour()}</td>
          <td className="semicolon">:</td>
          <td className="minute">{this.getMinute()}</td>
          <td className="timeperiod">
            <button onClick={this.togglePeriod}>{this.getPeriod()}</button>
          </td>
        </tr>
        <tr>
          <td className="hour" onClick={this.props.alterTime(-1, 'hour')}><Icon type="chevron-down" /></td>
          <td className="semicolon"></td>
          <td className="minute" onClick={this.props.alterTime(-1, 'minute')}><Icon type="chevron-down" /></td>
          <td className="timeperiod"></td>
        </tr>
        <tr>
          <td className="swap-button" colSpan="4" onClick={this.props.swap}>Date</td>
        </tr>
      </table>
    );
  }
});

var TimePicker = React.createClass({
  getDefaultProps: function() {
    return {
      inputFormat: 'MMM D, h:mm a'
    };
  },
  getInitialState: function() {
    return {
      isHidden: true,
      showDate: true
    };
  },

  componentDidMount: function() {
    document.addEventListener('click', this.hideIfNecessary, false);
  },
  componentWillUnmount: function() {
    document.removeEventListener('click', this.hideIfNecessary, false);
  },

  getDateTime: function() {
    return this.props.dateTime.format(this.props.inputFormat);
  },

  alterTime: function(amount, type) {
    return function(amount, type) {
      this.props.onChange(this.props.dateTime.add(amount, type));
    }.bind(this, amount, type);
  },

  alterDate: function(dateTime) {
    return function(dateTime) {
      var newDateTime = this.props.dateTime.clone();
      newDateTime.date(dateTime.date());
      newDateTime.month(dateTime.month());
      newDateTime.year(dateTime.year());
      this.props.onChange(newDateTime);
    }.bind(this, dateTime);
  },

  showOther: function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    this.setState({ showDate: !this.state.showDate });
  },

  hideIfNecessary: function(event) {
    if (!isNodeInRoot(event.target, React.findDOMNode(this))) {
      this.hideDropdown();
    }
  },
  hideDropdown: function() {
    this.setState({ isHidden: true });
  },
  showDropdown: function(event) {
    this.setState({ isHidden: false });
  },
  render: function() {
    var dropdownClasses = classNames({
      dropdown: true,
      hidden: this.state.isHidden
    });

    var mode;
    if (this.state.showDate) {
      mode = <TimePickerDate dateTime={this.props.dateTime} swap={this.showOther} alterDate={this.alterDate}/>;
    } else {
      mode = <TimePickerTime dateTime={this.props.dateTime} swap={this.showOther} alterTime={this.alterTime} />;
    }

    return (
      <div className="time-picker-container" onClick={this.showDropdown}>
        <input className="time" type="text" value={this.getDateTime()} readOnly={true} />
        <div className={dropdownClasses}>
          {mode}
        </div>
      </div>
    );
  }
});

module.exports = TimePicker;
