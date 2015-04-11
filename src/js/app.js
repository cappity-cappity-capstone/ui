var React = require('react');
var _ = require('underscore');
var Cookies = require('cookies-js');

var AuthInterface = require('interfaces/auth_interface.js');
var DeviceInterface = require('interfaces/device_interface.js');

var Home = require('components/home.jsx');
var Login = require('components/login.jsx');
var Searching = require('components/searching.jsx');

var authHost = 'http://localhost:2000';
//var authHost = 'http://cappitycappitycapstone.com';

window.onload = function() { renderPage(checkControlServer, renderLoginPage) };

renderPage = function(successCallback, errorCallback) {
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
    successCallback(documentRoot, user, mobile, authHost);
  },
  function(error) {
    errorCallback(documentRoot);
  });
};

onLoginSuccess = function() {
  renderPage(renderDevicesPage, renderLoginPage);
}

renderLoginPage = function(documentRoot) {
  React.render(<Login loginSuccessCallback={onLoginSuccess} authHost={authHost}/> , documentRoot);
}

renderDevicesPage = function(documentRoot, user, mobile, authHost, deviceHost) {
  var component = React.render(<Home user={user} deviceHost={deviceHost} authHost={authHost} mobile={mobile} />, documentRoot);

  var deviceInterface = new DeviceInterface(deviceHost);
  deviceInterface.getDevices(
    function (resp) {
      component.setProps({ devices: resp });
      // devicesControlView is whether or not each device is showing its controls or not
      // on desktop we do it on :hover, but on Mobile we handle touches and thus we need to
      // add a controls class onTouch to show the controls
      devicesControlView = _.map(resp, function(item) { return false; });
      component.setState({ devicesControlView: devicesControlView });
    }
  );
}

renderSearchingPage = function(documentRoot, user, mobile, authHost) {
  React.render(<Searching authHost={authHost} renderPage={renderPage.bind(undefined, checkControlServer, renderLoginPage)} />, documentRoot);
}

checkControlServer = function(documentRoot, user, mobile, authHost) {
  if (user.controlServer) {
    deviceHost = "http://" + user.controlServer.ip + ":" + user.controlServer.port;
    renderDevicesPage(documentRoot, user, mobile, authHost, deviceHost);
  } else {
    renderSearchingPage(documentRoot, user, mobile, authHost);
  }
}
