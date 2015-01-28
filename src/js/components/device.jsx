var React = require('react')

var Device = React.createClass({
  render: function() {
    return (
      <div className={this.props.state + " device-outer-circle"}>
        {this.props.state}
      </div>
    );
  }
});

module.exports = Device;
