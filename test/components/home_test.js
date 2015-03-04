var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

jest.dontMock('components/home.jsx');

var Home = require('components/home.jsx');
var SideMenu = require('components/side_menu.jsx');
var Device = require('components/device.jsx');

describe('components/page', function () {
  var subject;
  var host = 'http://localhost';

  beforeEach(function() {
    subject = TestUtils.renderIntoDocument(
      <Home host={host} />
    );
  });

  it('renders the side menu', function() {
    expect(TestUtils.findRenderedComponentWithType(subject, SideMenu)).not.toBe( null );
  });

  describe('with devices', function() {
    beforeEach(function() {
      subject.setProps({
        devices: [
          { id: 1, on: true, type: 'outlet', name: 'Kitchen Outlet' },
          { id: 2, on: false, type: 'lock', name: 'Cabinet' }
        ]
      });
    });

    it('renders the devices', function() {
      expect(TestUtils.scryRenderedComponentsWithType(subject, Device).length).toBe(2);
    });
  });
});
