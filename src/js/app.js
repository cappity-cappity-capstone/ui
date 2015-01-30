var React = require('react');
var Router = require('react-router');

var DeviceInterface = require('./interfaces/device-interface.js');

var Page = require('./components/page.jsx');

window.onload = function() {
  var documentRoot = document.querySelector('#content-anchor');
  var component = React.render(<Page />, documentRoot);

  DeviceInterface.getDevices(
    function (resp) {
      component.setProps({ devices: resp });
    }
  );
}
