var React = require('react');
var Router = require('react-router');

Device = require('./views/hello_world.jsx');

window.onload = function() {
  var documentRoot = document.querySelector('#moduleAnchor');
  React.render(<Device name="Dan"/>, documentRoot)
}
