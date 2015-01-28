var React = require('react')
var Icon = require('./icon.jsx')
var HeaderInfo = require('./header-info.jsx')

var Header = React.createClass({
  propTypes: {
    onNavIconClick: React.PropTypes.func,
    homeName: React.PropTypes.string.isRequired
  },

  render: function(){
    return (
        <header>
            <a className="header-menu-icon" onClick={this.props.onNavIconClick}>
              <Icon type="navicon"/>
            </a>
            <div className="container-header-text">
                <div className="header-title">{this.props.homeName}</div>
            </div>
            <HeaderInfo/>
        </header>
    );
  }
});

module.exports = Header
