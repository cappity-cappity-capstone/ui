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

var TimePicker = React.createClass({
  getInitialState: function() {
    return { isHidden: true };
  },
  getTime: function() {
    return this.props.datetime.format('h:mm a');
  },
  componentDidMount: function() {
    document.addEventListener('click', this.hideIfNecessary, false);
  },
  componentWillUnmount: function() {
    document.removeEventListener('click', this.hideIfNecessary, false);
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
    return (
      <div className="time-picker-container" onClick={this.showDropdown}>
        <input className="time" type="text" value={this.getTime()} />
        <div className={dropdownClasses}>
          <div className="component">
            <div><Icon type="chevron-up" /></div>
            <div>3</div>
            <div><Icon type="chevron-down" /></div>
          </div>
          <div className="component">
            <div>:</div>
          </div>
          <div className="component">
            <div><Icon type="chevron-up" /></div>
            <div>01</div>
            <div><Icon type="chevron-down" /></div>
          </div>
          <div className="component">
            <div />
            <div>am</div>
            <div />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = TimePicker
