var React = require('react');

var SideMenu = React.createClass({
  propTypes: {
    profileImageUrl: React.PropTypes.string.isRequired
  },

  render: function(){
    var imageStyle = {
      background: 'url(' + this.props.profileImageUrl + ') no-repeat;'
    }

    return (
      <div className="menu">
        <aside id="menu-side">
          <div className="content">
            <div className="photo-profile">
              <div className="image-circular" style={imageStyle}></div>
            </div>
            <ul className="list-side-menu-options">
              <li><a href="/logout">Logout</a></li>
              <li><a href="/settings">Settings</a></li>
            </ul>
          </div>
        </aside>
      </div>
    );
  }
});

module.exports = SideMenu
