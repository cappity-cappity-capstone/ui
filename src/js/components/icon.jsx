var React = require('react');

var Icon = React.createClass({
  propTypes: {
    type: React.PropTypes.string.isRequired
  },

  render: function(){
    var type = this.props.type;
    return <i className={"fa fa-" + type}></i>;
  }
});

module.exports = Icon;
