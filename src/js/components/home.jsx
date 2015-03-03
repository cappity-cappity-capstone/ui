var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('underscore');

var Device = require('components/device.jsx');

React.initializeTouchEvents(true);

var Home = React.createClass({
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
    return {
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
        onClickModule={this.handleOnModuleClick(index)}
        showControls={this.state.devicesControlView[index]} />
    );
  },

  render: function(){
    var renderedDevices = _.map(this.props.devices, this.renderDevice, this);
    return (
      <div className='devices'>
        <Link to='login'>Login</Link>
        {renderedDevices}
      </div>
    )
  },

  handleOnModuleClick: function(index) {
    var self = this;
    return function() {
      var devicesControlView = self.state.devicesControlView;
      devicesControlView[index] = !devicesControlView[index];
      self.setState({devicesControlView: devicesControlView});
    };
  },

  handleOffModuleAction: function(event) {
    if (this.isMoving) {
      this.isMoving = false;
    } else {
      var devicesControlView = [];
      _.each(this.state.devicesControlView, function(item, index) {devicesControlView.push(false);});
      this.setState({devicesControlView: devicesControlView});
    }
  }
});

module.exports = Home;
