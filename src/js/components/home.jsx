var React = require('react');
var _ = require('underscore');
var md5 = require('js-md5');

var Alert = require('components/alert.jsx');
var Device = require('components/device.jsx');
var SideMenu = require('components/side_menu.jsx');
var Header = require('components/header.jsx');

var DeviceInterface = require('interfaces/device_interface.js');
var AlertInterface = require('interfaces/alert_interface.js');

React.initializeTouchEvents(true);

function getViewportWidth() {
  var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      width  = w.innerWidth || e.clientWidth || g.clientWidth,
      height = w.innerHeight|| e.clientHeight|| g.clientHeight;
      return width;
}

var Home = React.createClass({
  propTypes: {
    deviceHost: React.PropTypes.string.isRequired,
    authHost: React.PropTypes.string.isRequired,
    mobile: React.PropTypes.bool.isRequired,
    user: React.PropTypes.shape({
      email: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired
    }).isRequired
  },

  getInitialState: function(){
    var widthCutoff  = 750;
    var viewportWidth = getViewportWidth();
    var menuExpanded = viewportWidth > widthCutoff;
    return {
      menuExpanded: menuExpanded,
      devicesControlView: {},
      devices: [],
      alerts: []
    };
  },

  componentDidMount: function() {
    this.getDevices();
    this.checkAlerts();
    setInterval(this.getDevices, 3000);
    setInterval(this.checkAlerts, 3000);
  },

  getDevices: function() {
    this.getDeviceInterface().getDevices(
      function (resp) {
        this.setState({devices: resp});
      }.bind(this)
    );
  },

  checkAlerts: function() {
    this.getAlertInterface().getAlerts(
      function (resp) {
        this.setState({alerts: resp});
      }.bind(this)
    );
  },

  renderAlert: function(alert, index) {
    if (alert.state && alert.state.state) {
      return (<Alert key={alert.id} {...alert} />);
    }
  },

  renderDevice: function(device, index) {
    return (
      <Device key={device.id}
        id={device.id}
        on={device.on}
        type={device.type}
        name={device.name}
        host={this.props.deviceHost}
        mobile={this.props.mobile}
        onClickModule={this.handleOnModuleClick.bind(this, device.id)}
        showControls={this.state.devicesControlView[device.id] || false} />
    );
  },

  render: function(){
    var renderedAlerts = this.state.alerts.map(this.renderAlert, this);
    var renderedDevices = this.state.devices.map(this.renderDevice, this);
    var menuExpandedClass = this.state.menuExpanded ? "" : "menu-collapsed";

    return (
      <div>
        <SideMenu email={this.props.user.email} profileImageUrl={this.getGravatarUrl()} menuExpanded={this.state.menuExpanded} authHost={this.props.authHost} />
        <div className={menuExpandedClass} id="main-container" onTouchMove={this.swallowMovement} onTouchEnd={this.handleOffModuleAction} onClick={this.handleOffModuleAction}>
          <div className="alerts">
            {renderedAlerts}
          </div>
          <Header homeName={this.props.user.name + "'s House"} onNavIconClick={this.handleNavIconClick}/>
          <div className="content">
            {renderedDevices}
          </div>
        </div>
      </div>
    );
  },

  handleNavIconClick: function(event) {
    var menuExpanded = this.state.menuExpanded;
    this.setState({menuExpanded: !menuExpanded});
  },

  handleOnModuleClick: function(index) {
    event.stopPropagation();
    event.preventDefault();

    var devicesControlView = this.state.devicesControlView;
    devicesControlView[index] = !devicesControlView[index];
    this.setState({devicesControlView: devicesControlView});
  },

  handleOffModuleAction: function(event) {
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    if (this.isMoving) {
      this.isMoving = false;
    } else {
      this.setState({devicesControlView: {}});
    }
  },

  // so this is kind of hacky, but basically we're trying to avoid triggering onTouchEnd when the user
  // is scrolling, so if the user is scrolling,
  isMoving: false,

  swallowMovement: function(event) {
    this.isMoving = true;
  },

  getGravatarUrl: function() {
    return "http://www.gravatar.com/avatar/" + this.getEmailHash() + "?size=400&default=mm";
  },

  getEmailHash: function() {
    if (_.isEmpty(this._emailHash)) {
      var email = this.props.user.email;
      email = email.replace(/ /g,'').toLowerCase();
      this._emailHash = md5(email);
    }
    return this._emailHash;
  },

  getAlertInterface: function() {
    if (!(this._alertInterface instanceof AlertInterface)) {
      this._alertInterface = new AlertInterface(this.props.deviceHost);
    }

    return this._alertInterface;
  },

  getDeviceInterface: function() {
    if (!(this._deviceInterface instanceof DeviceInterface)) {
      this._deviceInterface = new DeviceInterface(this.props.deviceHost);
    }

    return this._deviceInterface;
  }

});

module.exports = Home;
