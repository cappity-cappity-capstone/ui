var React = require('react');

var Icon = require('./icon.jsx');
var HeaderInfo = require('./header_info.jsx');

var Header = React.createClass({
  propTypes: {
    onNavIconClick: React.PropTypes.func,
    homeName: React.PropTypes.string.isRequired
  },

  render: function(){
    return (
      <header>
        <div className="header-menu-icon" onClick={this.props.onNavIconClick}>
          <Icon type="navicon"/>
        </div>
        <div className="container-header-text">
          <div className="header-title">{this.props.homeName}</div>
        </div>
        <HeaderInfo/>
      </header>
    );
  }
});

module.exports = Header
