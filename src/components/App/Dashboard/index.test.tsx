import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import { Dashboard } from '.';

Enzyme.configure({ adapter: new Adapter() })

describe('the Homepage component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Dashboard />);
    });

    test('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });
});
