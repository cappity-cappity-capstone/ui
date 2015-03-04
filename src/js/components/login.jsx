var React = require('react');

var Login = React.createClass({
  render: function() {
    return (
      <div className='login'>
        <div className='container-login-form'>
          <form method="post">
            <div className='input-group underline'>
              <input type="text" name="email" required/>
              <label for="email">
                <span>Username</span>
              </label>
            </div>
            <div className='input-group underline'>
              <input type="password" name="password" required/>
              <label for="password">
                <span>Password</span>
              </label>
            </div>
            <div className='input-group button'>
              <input type="submit" name="submit" value="Login"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Login;
