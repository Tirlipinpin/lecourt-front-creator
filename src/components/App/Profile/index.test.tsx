import React from 'react';
import { shallow } from 'enzyme';

import { Profile } from '.';

describe('The Profile component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Profile />);
    });

    it('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
