var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('../../src/js/components/device.jsx');

var Device = require('../../src/js/components/device.jsx');

describe('components/device', function () {
  var subject;

  beforeEach(function() {
    subject = TestUtils.renderIntoDocument(
      <Device id={1} on={true} type='outlet' name='Test Outlet' />
    );
  });

  it('renders the device name', function() {
    expect(
      TestUtils.findRenderedDOMComponentWithClass(subject, 'device-name').getDOMNode().textContent
    ).toBe( 'Test Outlet' );
  });

  it('renders the device icon', function() {
    expect(
      TestUtils.findRenderedDOMComponentWithClass(subject, 'device-icon').getDOMNode().className
    ).toContain( 'icon-outlet' );
  });

  it('renders the device controls', function() {
    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        subject, 'device-control-on'
      ).getDOMNode().textContent
    ).toBe( 'On' );
    expect(
      TestUtils.findRenderedDOMComponentWithClass(
        subject, 'device-control-off'
      ).getDOMNode().textContent
    ).toBe( 'Off' );
  });

  it('renders the device info button', function() {
    expect(
      TestUtils.findRenderedDOMComponentWithClass(subject, 'icon-info')
    ).not.toBe( null );
  });
});
