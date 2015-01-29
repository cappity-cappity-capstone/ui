var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../../src/js/components/device.jsx');

var Device = require('../../src/js/components/device.jsx')

describe('components/device', function () {
  var subject;

  beforeEach(function() {
    subject = TestUtils.renderIntoDocument(
      <Device on={true} type='outlet' name='Test Outlet' />
    );
  });

  it('renders the device name', function() {
    expect(
      TestUtils.findRenderedDOMComponentWithClass(subject, 'device-name').getDOMNode().textContent
    ).toBe( 'Test Outlet' );
  });

  it('renders the device icon', function() {
    expect(
      TestUtils.findRenderedDOMComponentWithTag(subject, 'i').getDOMNode().className
    ).toContain( 'icon-outlet' );
  });
});
