const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

jest.dontMock('../../src/js/components/page.jsx');

const Page = require('../../src/js/components/page.jsx')
const SideMenu = require('../../src/js/components/side-menu.jsx')
const Device = require('../../src/js/components/device.jsx')

describe('components/page', function () {
  var subject;

  beforeEach(function() {
    subject = TestUtils.renderIntoDocument(
      <Page />
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
