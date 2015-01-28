var React = require('react')
var Device = require('./device.jsx')
var SideMenu = require('./side-menu.jsx')
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

  getInitialState: function(){
    return {
      menuExpanded: true
    }
  },

  render: function(){
    var renderedDevices = _.map(this.props.devices, this.renderDevice);

    return (
      <div>
        <SideMenu onNavIconClick={this.handleNavIconClick}/>
        <div id="main-container">
          <div className="content">
            <header>Home</header>
            <h1>Hello, {this.props.name}!</h1>
            {renderedDevices}
          </div>
        </div>
      </div>
    );
  },

  renderDevice: function(device){
    return <Device key={device.name} on={device.on} type={device.type} name={device.name} />;
  },

  handleNavIconClick: function() {
    const menuExpanded = this.state.menuExpanded;
    const newWidth = menuExpanded ? 0 : 300;
    this.expandDrawer(newWidth);
    this.setState({menuExpanded: !menuExpanded});
  },

  expandDrawer: function(width) {
    document.getElementById('menu-side').setAttribute("style","width:" + width + "px;");
    document.getElementById('main-container').setAttribute("style","margin-left:" + width + "px;");
  }
});

module.exports = Page;
