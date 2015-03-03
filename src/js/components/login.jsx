var React = require('react');

var Login = React.createClass({
  render: function() {
    return (
      <div className='login'>
        <form method="post">
          <div className='input-row username'>
            <span className='input-group underline'>
              <input type="text" name="email" required/>
              <label for="email">
                <span>Username</span>
              </label>
            </span>
          </div>
          <div className='input-row password'>
            <span className='input-group underline'>
              <input type="password" name="password" required/>
              <label for="password">
                <span>Password</span>
              </label>
            </span>
          </div>
          <div className='input-row submit'>
            <div className='button'>
              <input type="submit" name="submit" value="Login"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Login;
