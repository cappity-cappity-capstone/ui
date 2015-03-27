var React = require('react');
var _ = require('underscore');
var md5 = require('js-md5');

var Device = require('components/device.jsx');
var SideMenu = require('components/side_menu.jsx');
var Header = require('components/header.jsx');

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
  email_hash: "",

  propTypes: {
    devices: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.string.isRequired,
        on: React.PropTypes.bool.isRequired,
        type: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired
      })
    ),
    deviceHost: React.PropTypes.string.isRequired,
    authHost: React.PropTypes.string.isRequired,
    mobile: React.PropTypes.bool.isRequired,
    email: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
  },

  getInitialState: function(){
    var widthCutoff  = 750;
    var viewportWidth = getViewportWidth();
    var menuExpanded = viewportWidth > widthCutoff;
    return {
      menuExpanded: menuExpanded,
      devicesControlView: []
    };
  },

  renderDevice: function(device, index){
    return (
      <Device key={device.id}
        id={device.id}
        on={device.on}
        type={device.type}
        name={device.name}
        host={this.props.deviceHost}
        mobile={this.props.mobile}
        onClickModule={this.handleOnModuleClick.bind(this, index)}
        showControls={this.state.devicesControlView[index]} />
    );
  },

  render: function(){
    if (this.email_hash === "") {
      this.props.email = this.props.email.replace(/ /g,'');
      this.props.email = this.props.email.toLowerCase();
      this.email_hash = md5(this.props.email);
    }

    var renderedDevices = this.props.devices.map(function(device, index) {
       return this.renderDevice(device, index);
    }, this);
    var menuExpandedClass = this.state.menuExpanded ? "" : "menu-collapsed";
    return (
      <div>
        <SideMenu email={this.props.email} profileImageUrl={this.getGravatarUrl()} menuExpanded={this.state.menuExpanded} authHost={this.props.authHost} />
        <div className={menuExpandedClass} id="main-container" onTouchMove={this.swallowMovement} onTouchEnd={this.handleOffModuleAction} onClick={this.handleOffModuleAction}>
          <Header homeName={this.props.name + "'s House"} onNavIconClick={this.handleNavIconClick}/>
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
      var devicesControlView = [];
      _.each(this.state.devicesControlView, function(item, index) {devicesControlView.push(false);});
      this.setState({devicesControlView: devicesControlView});
    }
  },

  // so this is kind of hacky, but basically we're trying to avoid triggering onTouchEnd when the user
  // is scrolling, so if the user is scrolling,
  isMoving: false,

  swallowMovement: function(event) {
    this.isMoving = true;
  },

  getGravatarUrl: function() {
    return "http://www.gravatar.com/avatar/" + this.email_hash + "?size=400&default=mm";
  }

});

module.exports = Home;
