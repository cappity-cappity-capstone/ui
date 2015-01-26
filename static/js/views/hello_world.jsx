var React = require('react')
var Device = require('./device_interface.jsx')

var HelloWorld = React.createClass({
    render: function(){
        return (
        <div>
            <h1>Hello, {this.props.name}!</h1>
            <Device state='on'/>
        </div>
        );
    }
});

module.exports = HelloWorld;
