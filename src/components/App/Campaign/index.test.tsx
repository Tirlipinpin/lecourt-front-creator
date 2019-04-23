import React, { SyntheticEvent } from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Campaign from '.';


describe('The Campaign component', () => {
    let wrapper: ShallowWrapper<Campaign>;

    beforeEach(() => {
        wrapper = shallow(
            <Campaign />
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });
});