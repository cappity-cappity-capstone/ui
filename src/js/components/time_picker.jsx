var React = require('react/addons');
var classSet = React.addons.classSet;
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
  render: function() {
    return (
      <table>
        <tr>
          <td colSpan="7">Month</td>
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
        <tr>
          <td className="swap-button" colSpan="7" onClick={this.props.swap}>Time</td>
        </tr>
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
      this.props.alterDateTime(-12, 'hour')();
    } else {
      this.props.alterDateTime(12, 'hour')();
    }
  },

  render: function() {
    return (
      <table>
        <tr>
          <td className="hour" onClick={this.props.alterDateTime(1, 'hour')}><Icon type="chevron-up" /></td>
          <td className="semicolon"></td>
          <td className="minute" onClick={this.props.alterDateTime(1, 'minute')}><Icon type="chevron-up" /></td>
          <td className="timezone"></td>
        </tr>
        <tr>
          <td className="hour">{this.getHour()}</td>
          <td className="semicolon">:</td>
          <td className="minute">{this.getMinute()}</td>
          <td className="timezone">
            <button onClick={this.togglePeriod}>{this.getPeriod()}</button>
          </td>
        </tr>
        <tr>
          <td className="hour" onClick={this.props.alterDateTime(-1, 'hour')}><Icon type="chevron-down" /></td>
          <td className="semicolon"></td>
          <td className="minute" onClick={this.props.alterDateTime(-1, 'minute')}><Icon type="chevron-down" /></td>
          <td className="timezone"></td>
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
    }
  },
  getInitialState: function() {
    return {
      isHidden: true,
      dateTime: moment(this.props.dateTime),
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
    return this.state.dateTime.format(this.props.inputFormat);
  },

  alterDateTime: function(amount, type) {
    return function(amount, type) {
      this.setState({
        dateTime: this.state.dateTime.add(amount, type)
      });
    }.bind(this, amount, type);
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
    var dropdownClasses = classSet({
      dropdown: true,
      hidden: this.state.isHidden
    });

    var mode;
    if (this.state.showDate) {
      mode = <TimePickerDate dateTime={this.state.dateTime} swap={this.showOther} />;
    } else {
      mode = <TimePickerTime dateTime={this.state.dateTime} swap={this.showOther} alterDateTime={this.alterDateTime} />;
    }

    return (
      <div className="time-picker-container" onClick={this.showDropdown}>
        <input className="time" type="text" value={this.getDateTime()} />
        <div className={dropdownClasses}>
          {mode}
        </div>
      </div>
    );
  }
});

module.exports = TimePicker
