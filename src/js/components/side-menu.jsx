var React = require('react')
var Icon = require('./icon.jsx')

var SideMenu = React.createClass({
  propTypes: {
    onNavIconClick: React.PropTypes.func
  },

  render: function(){
    return (
      <div className="menu">
        <aside id="menu-side">
          <div className="content">
            <div className="photo-profile"></div>
            <ul className="list-side-menu-options">
              <li>Logout</li>
              <li>Settings</li>
            </ul>
          </div>
        </aside>
        <a className="icon-side-menu" onClick={this.props.onNavIconClick}>
          <Icon type="navicon" />
        </a>
      </div>
    );
  }
});

module.exports = SideMenu
