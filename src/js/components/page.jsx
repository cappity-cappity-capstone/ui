var React = require('react');
var _ = require('underscore');

var Device = require('./device.jsx');
var SideMenu = require('./side-menu.jsx');
var Header = require('./header.jsx');

var Page = React.createClass({
  propTypes: {
    devices: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        on: React.PropTypes.bool.isRequired,
        type: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
      })
    ),
    name: React.PropTypes.string
  },

  getDefaultProps: function(){
    return {
      devices: [
        { id: 1, on: true, type: "outlet", name: "Kitchen Outlet" },
        { id: 2, on: false, type: "lock", name: "Cabinet" }
      ]
    };
  },

  getInitialState: function(){
    return {
      menuExpanded: true
    }
  },

  renderDevice: function(device){
    return <Device key={device.id} on={device.on} type={device.type} name={device.name} />;
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
        <SideMenu profileImageUrl="/img/todd.jpg" />
        <div className={this.getTimeClass()} id="main-container">
          <Header homeName="Chez Todd" onNavIconClick={this.handleNavIconClick}/>
          <div className="content">
            {renderedDevices}
          </div>
        </div>
      </div>
    );
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
