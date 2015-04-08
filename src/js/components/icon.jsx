var React = require('react');

var Icon = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired
  },

  render: function(){
    var type = this.props.type;
    return (<i
      onClick={this.props.onClick}
      onTouchStart={this.props.onTouchStart}
      onTouchEnd={this.props.onTouchEnd}
      style={this.props.style}
      className={"fa fa-" + type}
      />
    );
  }
});

module.exports = Icon;
