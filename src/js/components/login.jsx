var React = require('react');
var addons = require('react/addons');
var _ = require('underscore');
var Cookies = require('cookies-js');

var AuthInterface = require('interfaces/auth_interface.js');
var Login = React.createClass({
  propTypes: {
    authHost: React.PropTypes.string.isRequired
  },

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      message: null,
      isSignup: false,
      name: null,
      email: null,
      password: null
    };
  },

  render: function() {
    var button_text = this.state.isSignup ? "Signup" : "Login";
    var toggle_text = this.state.isSignup ? "Login" : "Signup";
    var button_action = this.state.isSignup ? this.handleSignup : this.handleLogin;
    var name_input = !this.state.isSignup ? "" : <div className='input-group underline'><input type="text" name="name" valueLink={this.linkState('name')} required /><label htmlFor="name"><span>Name</span></label></div>;
    var message = !this.state.message ? "" : <div className='container-login-message'><span>{this.state.message}</span></div>;
    return (
      <div className='login'>
        <div className='container-signup-button'>
          <span className='signup'>
            <a onClick={this.handleModeSwitch}>{toggle_text}</a>
          </span>
        </div>
        <div className='container-login-form'>
          {message}
          <form onSubmit={button_action}>
            {name_input}
            <div className='input-group underline'>
              <input type="email" name="email" valueLink={this.linkState('email')} required />
              <label htmlFor="email">
                <span>Email</span>
              </label>
            </div>
            <div className='input-group underline'>
              <input type="password" name="password" valueLink={this.linkState('password')} required />
              <label htmlFor="password">
                <span>Password</span>
              </label>
            </div>
            <div className='input-group button'>
              <input type="submit" name="submit" value={button_text} />
            </div>
          </form>
        </div>
      </div>
    );
  },

  handleLogin: function(event) {
    var self = this;
    event.preventDefault();
    this.getAuthInterface().createSession(this.state.email, this.state.password,
      function(session) {
        console.log(session);
        Cookies.set("session_key", session.key, { expires: new Date(session.expiresOn)});
        self.props.loginSuccessCallback();
      },
      function(error) {
        self.setState({message: error.message});
      }
    );
  },

  handleSignup: function(event) {
    var self = this;
    event.preventDefault();
    this.getAuthInterface().addUser(this.state.name, this.state.email, this.state.password,
      function(session) {
        handleLogin();
      },
      function(error) {
        self.setState({message: error.message});
      }
    );
  },

  handleModeSwitch: function() {
    this.setState({isSignup: !this.state.isSignup});
  },

  getAuthInterface: function() {
    if (!(this._authInterface instanceof AuthInterface)) {
      this._authInterface = new AuthInterface(this.props.authHost);
    }

    return this._authInterface;
  }
});

module.exports = Login;
