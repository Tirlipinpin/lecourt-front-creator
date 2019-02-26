import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import { Login } from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('the Login component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Login dispatch={() => {}} login={{ loading: false }} />);
    });

    it('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });
});
