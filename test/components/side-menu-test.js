const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

jest.dontMock('../../src/js/components/side-menu.jsx');

const SideMenu = require('../../src/js/components/side-menu.jsx')
const Icon = require('../../src/js/components/icon.jsx')

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

  it('renders the hambuger nav button', function() {
    expect(TestUtils.findRenderedComponentWithType(subject, Icon).props.type).toBe('navicon');
  });
});
