var React = require('react');
var Router = require('react-router');

var Page = require('./components/page.jsx');

window.onload = function() {
  var documentRoot = document.querySelector('#content-anchor');
  React.render(<Page/>, documentRoot)
}
