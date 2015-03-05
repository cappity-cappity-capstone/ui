var React = require('react');
var _ = require('underscore');
var Cookies = require('cookies-js');

var AuthInterface = require('interfaces/auth_interface.js');
var DeviceInterface = require('interfaces/device_interface.js');

var Home = require('components/home.jsx');
var Login = require('components/login.jsx');

var authHost = 'http://cappitycappitycapstone.com';
var deviceHost = 'http://ccs.cappitycappitycapstone.com';

window.onload = function() {
  // because fuck if I know a better way to do this
  var isTouchDevice = 'ontouchstart' in document.documentElement;
  var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?!0:!1;
  var mobile = isMobileDevice || isMobileDevice;
  if (mobile) {
    document.getElementsByTagName('body')[0].className+=' touch';
  }

  var documentRoot = document.querySelector('#content-anchor');

  var authInterface = new AuthInterface(authHost);
  authInterface.getCurrentUser(function(user) {
    if (user.controlServer) {
      deviceHost = "http://" + user.controlServer.ip + ":" + user.controlServer.port;
    }
    var component = React.render(<Home email={user.email} name={user.name} deviceHost={deviceHost} mobile={mobile} authHost={authHost} user={user} />, documentRoot);

    var deviceInterface = new DeviceInterface(deviceHost);
    deviceInterface.getDevices(
      function (resp) {
        component.props.devices = resp;
        // devicesControlView is whether or not each device is showing its controls or not
        // on desktop we do it on :hover, but on Mobile we handle touches and thus we need to
        // add a controls class onTouch to show the controls
        devicesControlView = _.map(resp, function(item, index) { return false; });
        component.setState({ devicesControlView: devicesControlView });
      }
    );
  },
  function(error) {
    var component = React.render(<Login authHost={authHost}/>, documentRoot);
  });
};
