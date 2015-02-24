var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('components/side_menu.jsx');

var SideMenu = require('components/side_menu.jsx');
var Icon = require('components/icon.jsx');

describe('components/side-menu', function () {
  var subject;

  beforeEach(function() {
    subject = TestUtils.renderIntoDocument(
      <SideMenu profileImageUrl="test.jpg" />
    );
  });

  it('renders the menu', function() {
    expect(TestUtils.findRenderedDOMComponentWithTag(subject, 'aside')).not.toBe( null );
  });
});
