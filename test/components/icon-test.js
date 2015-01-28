const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

jest.dontMock('../../src/js/components/icon.jsx');

const Icon = require('../../src/js/components/icon.jsx')

describe('components/icon', function () {
  var subject;

  beforeEach(function() {
    subject = TestUtils.renderIntoDocument(
      <Icon type='beer' />
    );
  });

  it('renders the icon', function() {
    expect(
      TestUtils.findRenderedDOMComponentWithTag(subject, 'i').getDOMNode().className
    ).toContain( 'fa-beer' );
  });
});
