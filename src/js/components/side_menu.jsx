var React = require('react');

var AuthInterface = require('interfaces/auth_interface.js');

var SideMenu = React.createClass({
  propTypes: {
    profileImageUrl: React.PropTypes.string.isRequired,
    host: React.PropTypes.string.isRequired
  },

  render: function(){
    var imageStyle = {
      background: 'url(' + this.props.profileImageUrl + ') no-repeat;'
    };

    var menuExpandedClass = this.props.menuExpanded ? "" : "collapsed";
    return (
        <aside id="menu-side" className={menuExpandedClass}>
          <div className="content">
            <div className="photo-profile">
              <div className="image-circular" style={imageStyle}></div>
            </div>
            <ul className="list-side-menu-options">
              <li><a onClick={this.handleLogout}>Logout</a></li>
              <li><a href="/settings">Settings</a></li>
            </ul>
          </div>
        </aside>
    );
  },

  handleLogout: function() {
    this.getAuthInterface().deleteSession(function() {
      location.reload();
    });
  },

  getAuthInterface: function() {
    if (!(this._authInterface instanceof AuthInterface)) {
      this._authInterface = new AuthInterface(this.props.host);
    }

    return this._authInterface;
  }
});

module.exports = SideMenu;
