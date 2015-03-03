var React = require('react');

var Signup = React.createClass({
  render: function() {
    return (
      <div className='signup'>
        <h1>Signup</h1>
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
            <label for="password-confirm">Password Confirmation</label>
            <input type="password" name="password-confirm" />
          </div>
          <div className='input-group'>
            <input type="submit" value="Signup" />
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Signup;
