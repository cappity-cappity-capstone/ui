var React = require('react')
var Device = require('./device.jsx')

var Page = React.createClass({
  render: function(){
    return (
    <div>
      <h1>Hello, {this.props.name}!</h1>
      <Device state='on'/>
    </div>
    );
  }
});

module.exports = Page;
