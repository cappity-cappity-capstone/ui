var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var DeviceInfo = require('components/device_info.jsx');
var StateInterface = require('interfaces/state_interface.js');

var DEVICE_TYPES = [
  'outlet',
  'stove',
  'gas-sensor',
  'lock'
];

var STATUS_COPY = {
  'outlet': {
    'on': 'on',
    'off': 'off'
  },

  'stove': {
    'on': 'on',
    'off': 'off'
  },

  'gas-sensor': {
    'on': 'on',
    'off': 'off'
  },

  'lock': {
    'on': 'locked',
    'off': 'unlocked'
  }
};

var VERB_COPY = {
  'outlet': {
    'on': 'on',
    'off': 'off',
    'font-size': '1em'
  },

  'stove': {
    'on': 'on',
    'off': 'off',
    'font-size': '1em'
  },

  'gas-sensor': {
    'on': 'on',
    'off': 'off',
    'font-size': '1em'
  },

  'lock': {
    'on': 'Lock',
    'off': 'Unlock',
    'font-size': '.7em'
  }
};

var Device = React.createClass({
  // usually setting state from a prop is bad practice
  // but since we're getting these states in a request in
  // app.js there is no other good way, after pageload though
  // this page is the source of tuth and nothing else will
  // change the state so it's okay
  getInitialState: function() {
    var state = this.props.on ? 'on' : 'off';
    return {
      deviceState: state,
      loadingClass: "",
      showInfo: false
    };
  },

  propTypes: {
    id: React.PropTypes.string.isRequired,
    on: React.PropTypes.bool.isRequired,
    type: React.PropTypes.oneOf(DEVICE_TYPES).isRequired,
    name: React.PropTypes.string.isRequired,
    mobile: React.PropTypes.bool.isRequired,
    host: React.PropTypes.string.isRequired
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({ deviceState: nextProps.on ? 'on' : 'off' });
  },

  render: function() {
    var status = STATUS_COPY[this.props.type][this.state.deviceState];
    var offVerb = VERB_COPY[this.props.type].off;
    var onVerb = VERB_COPY[this.props.type].on;
    var fontSize = VERB_COPY[this.props.type]["font-size"];

    var controlClass = this.props.showControls ? " control" : "";
    var deviceInfo;
    if(this.props.showControls && this.state.showInfo) {
      deviceInfo = <DeviceInfo {...this.props} onDeviceInfoClose={this.handleDeviceInfoClose} />;
    }

    if(this.state.loadingClass === " loading") {
      status = "Loading";
    }

    return (
      <div className="device">
        <div className="device-name">{this.props.name}</div>
        <div className={this.state.deviceState + " device-outer-circle" + controlClass + this.state.loadingClass} onTouchEnd={this.handDevicetouch} onTouchMove={this.swallowMovement}>
          <div className="device-loading-circle-container">
            <div className="device-loading-circle-mask">
              <div className="device-loading-circle"></div>
            </div>
          </div>
          <div className="device-inner-circle">
            <div className="device-control-circle">
              <div className="device-control-circle-crossbar"></div>
            </div>
            <div className="device-icon-background"></div>
            <div className="device-control-status">
              <span>{status}</span>
            </div>
            <div className="device-control-on" onClick={this.handleOnButtonAction}>
              <div className="device-control-button-container">
                <div className="fill"></div>
                <span style={{fontSize: fontSize}}>{onVerb}</span>
              </div>
            </div>
            <div className="device-control-off" onClick={this.handleOffButtonAction}>
              <div className="device-control-button-container">
                <div className="fill"></div>
                <span style={{fontSize: fontSize}}>{offVerb}</span>
              </div>
            </div>
            <div className="device-info">
              <i className="icon-info" onClick={this.handleInfoButtonAction}></i>
            </div>
            <div className="device-icon-container">
              <i className={"device-icon icon-" + this.props.type + "_" + this.state.deviceState}/>
            </div>
          </div>
        </div>
        <ReactCSSTransitionGroup transitionName="device-info">
          {deviceInfo}
        </ReactCSSTransitionGroup>
      </div>
    );
  },

  handDevicetouch: function(event) {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    if (this.isMoving) {
      this.isMoving = false;
    } else {
      if (!this.props.showControls) {
        this.props.onClickModule();
      }
    }
  },

  handleOnButtonAction: function(event) {
    event.stopPropagation();
    this.setState({
      loadingClass: " loading"
    });

    this.getStateInterface()
      .setState(this.props.id, true, this.deviceStateChangeSuccess, this.deviceStateChangeError);
  },

  handleOffButtonAction: function(event) {
    event.stopPropagation();
    this.setState({
      loadingClass: " loading"
    });

    this.getStateInterface()
      .setState(this.props.id, false, this.deviceStateChangeSuccess, this.deviceStateChangeError);
  },

  deviceStateChangeSuccess: function(response) {
    var deviceState = response.state ? 'on' : 'off';
    //this closes the controls after we click on or off in mobile
    if (this.props.mobile) {
      this.props.showControls = false;
      this.props.onClickModule();
    }
    this.setState({
      deviceState: deviceState,
      loadingClass: ""
    });
  },

  deviceStateChangeError: function(error) {
    this.setState({
      loadingClass: ""
    });
  },

  //info can probably be bootstrapped
  handleInfoButtonAction: function(event) {
    event.stopPropagation();
    event.preventDefault();

    if (!this.props.mobile) {
      this.props.onClickModule();
    }
    this.setState({showInfo: true});
  },

  handleDeviceInfoClose: function() {
    this.props.onClickModule();
    this.setState({showInfo: false});
  },

  // so this is kind of hacky, but basically we're trying to avoid triggering onTouchEnd when the user
  // is scrolling, so if the user is scrolling,
  isMoving: false,

  getStateInterface: function() {
    if (!(this._stateInterface instanceof StateInterface)) {
      this._stateInterface = new StateInterface(this.props.host);
    }

    return this._stateInterface;
  },

  swallowMovement: function(event) {
    event.stopPropagation();
    console.log('swallowing movement on a button');
    this.isMoving = true;
  }
});

module.exports = Device;
