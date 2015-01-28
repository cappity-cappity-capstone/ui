var React = require('react')
var Device = require('./device.jsx')
var _ = require('underscore')

var Page = React.createClass({
  propTypes: {
    devices: React.PropTypes.arrayOf(React.PropTypes.object),
    name: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      devices: [
        { on: true, type: "outlet", name: "Kitchen Outlet" },
        { on: false, type: "lock", name: "Cabinet" }
      ]
    };
  },

  render: function(){
    var renderedDevices = _.map(this.props.devices, this.renderDevice);

    return (
    <div>
      <h1>Hello, {this.props.name}!</h1>
      {renderedDevices}
    </div>
    );
  },

  renderDevice: function(device){
    return <Device on={device.on} type={device.type} name={device.name} />;
  }
});

module.exports = Page;
