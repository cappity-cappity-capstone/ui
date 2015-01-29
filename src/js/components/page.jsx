var React = require('react');
var _ = require('underscore');

var Device = require('./device.jsx');
var SideMenu = require('./side-menu.jsx');
var Header = require('./header.jsx');

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

  getTimeClass: function() {
    var hours = (new Date()).getHours();
    if (hours >= 17 || hours < 7) {
        return "dark";
    } else {
        return "light";
    }
  },

  render: function(){
    var renderedDevices = _.map(this.props.devices, this.renderDevice);
    return (
      <div>
        <SideMenu/>
        <div className={this.getTimeClass()} id="main-container">
          <Header homeName="Chez Todd" onNavIconClick={this.handleNavIconClick}/>
          <div className="content">
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
    var menuExpanded = this.state.menuExpanded;
    var newWidth = menuExpanded ? 0 : 300;
    this.expandDrawer(newWidth);
    this.setState({menuExpanded: !menuExpanded});
  },

  expandDrawer: function(width) {
    document.getElementById('menu-side').setAttribute("style","width:" + width + "px;");
    document.getElementById('main-container').setAttribute("style","margin-left:" + width + "px;");
  }
});

module.exports = Page
