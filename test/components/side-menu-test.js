var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../../src/js/components/side-menu.jsx');

var SideMenu = require('../../src/js/components/side-menu.jsx');
var Icon = require('../../src/js/components/icon.jsx');

describe('components/side-menu', function () {
  var subject;

  beforeEach(function() {
    subject = TestUtils.renderIntoDocument(
      <SideMenu />
    );
  });

  it('renders the menu', function() {
    expect(TestUtils.findRenderedDOMComponentWithClass(subject, 'menu')).not.toBe( null );
  });
});
