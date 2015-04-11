var React = require('react');

var AuthInterface = require('interfaces/auth_interface.js');

var Searching = React.createClass({
  getInitialState: function() {
    return { dots: '', dotsInterval: null }
  },
  componentDidMount: function() {
    this.setState({
      dotsInterval: setInterval(this.addDots, 750),
      searchingInterval: setInterval(this.associate, 750)
    });
  },
  componentWillUnmount: function() {
    clearInterval(this.state.dotsInterval);
    clearInterval(this.state.searchingInterval);
  },
  addDots: function() {
    if (this.state.dots.length > 2) {
      this.setState({ dots: '' });
    } else {
      this.setState({ dots: this.state.dots + '.' });
    }
  },
  associate: function() {
    var authInterface = new AuthInterface(this.props.authHost);
    authInterface.associateUser(function() {
      this.props.renderPage();
    }.bind(this));
  },
  render: function() {
    return (
      <div className="searching-hero">
        <div className="center">
          Trying to locate your Control Server{this.state.dots}
        </div>
      </div>
    );
  }
});

module.exports = Searching;
