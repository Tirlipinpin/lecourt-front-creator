import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import { Profile } from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('The Profile component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Profile />);
    });

    it('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
