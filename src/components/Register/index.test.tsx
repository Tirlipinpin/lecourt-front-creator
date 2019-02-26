import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import { Register } from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('The Register component', () => {
    let wrapper;

    beforeEach(() => {
        const store = {
            loading: false,
        };

        wrapper = shallow(<Register register={store} dispatch={() => {}} />);
    });

    it('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });
});
