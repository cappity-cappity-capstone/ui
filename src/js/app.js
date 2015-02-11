var React = require('react');
var _ = require('underscore');
var Router = require('react-router');

var DeviceInterface = require('interfaces/device_interface.js');

var Page = require('components/page.jsx');

window.onload = function() {
  // because fuck if I know a better way to do this
  var isTouchDevice = 'ontouchstart' in document.documentElement;
  var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?!0:!1;
  var mobile = isMobileDevice || isMobileDevice;
  if (mobile) {
    document.getElementsByTagName('body')[0].className+=' touch';
  }

  var documentRoot = document.querySelector('#content-anchor');
  var component = React.render(<Page/>, documentRoot);

  DeviceInterface.getDevices(
    function (resp) {
      component.props.devices = resp;
      // devicesControlView is whether or not each device is showing its controls or not
      // on desktop we do it on :hover, but on Mobile we handle touches and thus we need to
      // add a controls class onTouch to show the controls
      devicesControlView = [];
      _.each(resp, function(item, index) {devicesControlView.push(false);});
      component.setState({ devicesControlView: devicesControlView });
    }
  );
};
