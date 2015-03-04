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
      email: null,
      password: null
    };
  },

  render: function() {
    return (
      <div className='login'>
        <div className='container-login-form'>
          <form onSubmit={this.handleLogin}>
            <div className='input-group underline'>
              <input type="text" name="email" valueLink={this.linkState('email')} required />
              <label for="email">
                <span>Email</span>
              </label>
            </div>
            <div className='input-group underline'>
              <input type="password" name="password" valueLink={this.linkState('password')} required />
              <label for="password">
                <span>Password</span>
              </label>
            </div>
            <div className='input-group button'>
              <input type="button" name="submit" value="Login" onClick={this.handleLogin} />
            </div>
          </form>
        </div>
      </div>
    );
  },

  handleLogin: function() {
    this.getAuthInterface().createSession(this.state.email, this.state.password,
      function(session) {
        Cookies.set("session_key", session.key, { expires: new Date(session.expiresOn)});
        location.reload();
      },
      function(error) {
      }
    );
  },

  getAuthInterface: function() {
    if (!(this._authInterface instanceof AuthInterface)) {
      this._authInterface = new AuthInterface(this.props.authHost);
    }

    return this._authInterface;
  }
});

module.exports = Login;
