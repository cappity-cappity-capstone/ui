var React = require('react');
var _ = require('underscore');
var Router = require('react-router');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute, Handler = Router.Handler;

var DeviceInterface = require('interfaces/device_interface.js');

var Page = require('components/page.jsx');
var Home = require('components/home.jsx');
var Login = require('components/login.jsx');
var Signup = require('components/signup.jsx');

var routes = [
  <Route handler={Page} path="/">
    <DefaultRoute handler={Home} />
  </Route>,
  <Route name="login" handler={Login} />,
  <Route name="signup" handler={Signup} />
];

//window.onload = function() {
  // because fuck if I know a better way to do this
  var isTouchDevice = 'ontouchstart' in document.documentElement;
  var isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?!0:!1;
  var mobile = isMobileDevice || isMobileDevice;
  if (mobile) {
    document.getElementsByTagName('body')[0].className+=' touch';
  }

  var documentRoot = document.querySelector('#content-anchor');
  Router.run(routes, function(Handler) {
    React.render(<Handler />, documentRoot);
  });
  //var component = React.render(<Page/>, documentRoot);

  /*DeviceInterface.getDevices(
    function (resp) {
      component.props.devices = resp;
      // devicesControlView is whether or not each device is showing its controls or not
      // on desktop we do it on :hover, but on Mobile we handle touches and thus we need to
      // add a controls class onTouch to show the controls
      devicesControlView = [];
      _.each(resp, function(item, index) {devicesControlView.push(false);});
      component.setState({ devicesControlView: devicesControlView });
    }
    );*/
  //};
