var React = require('react');
var _ = require('underscore');
var Device = require('./device.jsx');
var SideMenu = require('./side_menu.jsx');
var Header = require('./header.jsx');
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

  getInitialState: function(){
    var widthCutoff  = 750;
    var viewportWidth = getViewportWidth();
    var menuExpanded = viewportWidth > widthCutoff;
    return {
      menuExpanded: menuExpanded,
      modulesShowControls: false
    }
  },

  renderDevice: function(device){
    return (
      <Device key={device.id}
        id={device.id}
        on={device.on}
        type={device.type}
        name={device.name}
        showControls={this.state.modulesShowControls} />
    );
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
    var menuExpandedClass = this.state.menuExpanded ? "" : "menu-collapsed";
    return (
      <div>
        <SideMenu profileImageUrl="/img/todd.jpg"  menuExpanded={this.state.menuExpanded}/>
        <div className={this.getTimeClass() + " " + menuExpandedClass} id="main-container" onTouchMove={this.swallowMovement} onTouchEnd={this.handleOffModuleAction}>
          <Header homeName="Chez Todd" onNavIconClick={this.handleNavIconClick}/>
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

  isMoving: false,

  handleOffModuleAction: function(event) {
    if (this.isMoving) {
      this.isMoving = false;
    } else {
      console.log('Single Tap Outside Module Detected');
      this.setState({modulesShowControls: false});
    }
  },

  swallowMovement: function(event) {
    console.log('moving');
    this.isMoving = true;
  }

});

module.exports = Page
