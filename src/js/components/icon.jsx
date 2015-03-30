var React = require('react');

var Icon = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired
  },

  render: function(){
    var type = this.props.type;
    return <i onClick={this.props.onClick} style={this.props.style} className={"fa fa-" + type}></i>;
  }
});

module.exports = Icon;
