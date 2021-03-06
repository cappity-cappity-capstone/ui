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
    var buttonText = this.state.isSignup ? "Signup" : "Login";
    var toggleText = this.state.isSignup ? "Login" : "Signup";
    var buttonAction= this.state.isSignup ? this.handleSignup : this.handleLogin;
    var nameInput, passConfirmInput;
    if (this.state.isSignup) {
      nameInput = (
        <div className='input-group underline'>
          <input type="text" name="name" valueLink={this.linkState('name')} required />
          <label htmlFor="name">
            <span>Name</span>
          </label>
        </div>
      );
      passConfirmInput = (
        <div className='input-group underline'>
          <input type="password" name="password-confirm" valueLink={this.linkState('passwordConfirm')} required />
          <label htmlFor="password-confirm">
            <span>Confirm Password</span>
          </label>
        </div>
      );
    }
    var message;
    if (this.state.message) {
      message = (
        <div className='container-login-message'>
          <span>{this.state.message}</span>
        </div>
      );
    }
    return (
      <div className='login'>
        <div className='container-signup-button'>
          <span className='signup'>
            <a onClick={this.handleModeSwitch}>{toggleText}</a>
          </span>
        </div>
        <div className='container-login-form'>
          {message}
          <form onSubmit={buttonAction}>
            {nameInput}
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
            {passConfirmInput}
            <div className='input-group button'>
              <input type="submit" name="submit" value={buttonText} />
            </div>
          </form>
        </div>
      </div>
    );
  },

  handleLogin: function(event) {
    var self = this;
    if (event) event.preventDefault();
    this.getAuthInterface().createSession(this.state.email, this.state.password,
      function(session) {
        console.log(session);
        Cookies.set("session_key", session.key, { expires: new Date(session.expiresOn)});
        self.props.loginSuccessCallback();
      },
      function(error) {
        self.setState({message: "Sorry, we don't know that user"});
      }
    );
  },

  handleSignup: function(event) {
    event.preventDefault();
    if (this.state.password === this.state.passwordConfirm) {
      this.getAuthInterface().addUser(this.state.name, this.state.email, this.state.password,
        function(session) {
          this.handleLogin();
        }.bind(this),
        function(error) {
          this.setState({message: error.message});
        }.bind(this)
      );
    }
    else {
      this.setState({message: 'Passwords do not match'});
    }
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
