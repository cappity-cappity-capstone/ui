var React = require('react');

var Login = React.createClass({
  render: function() {
    return (
      <div className='login'>
        <h1>Login</h1>
        <form method="post">
          <div className='input-group'>
            <label for="email">Email</label>
            <input type="text" name="email" />
          </div>
          <div className='input-group'>
            <label for="password">Password</label>
            <input type="password" name="password" />
          </div>
          <div className='input-group'>
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Login;
