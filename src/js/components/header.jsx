var React = require('react');

var Icon = require('components/icon.jsx');
var HeaderInfo = require('components/header_info.jsx');

var Header = React.createClass({
  propTypes: {
    onNavIconClick: React.PropTypes.func,
    homeName: React.PropTypes.string.isRequired
  },

  render: function(){
    return (
      <header>
        <div className="header-menu-icon" onClick={this.handleMenuIconClick}>
          <Icon type="navicon"/>
        </div>
        <div className="header-text-container">
          <div className="header-title">{this.props.homeName}</div>
        </div>
        <HeaderInfo/>
      </header>
    );
  },

  handleMenuIconClick: function(event) {
    event.stopPropagation();
    this.props.onNavIconClick();
  }
});

module.exports = Header;
