var React = require('react');

var Alert = React.createClass({
  render: function() {
    return (
      <div className="alert">
        <strong>Triggered:</strong> {this.props.name}
      </div>
    );
  }
});

module.exports = Alert;
