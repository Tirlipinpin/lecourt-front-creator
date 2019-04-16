import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import { Navbar } from '..';

Enzyme.configure({ adapter: new Adapter() });

describe('The Profile component', () => {
    let wrapper;

    beforeEach(() => {
        const match = {
            url: 'poney',
        };

        wrapper = shallow(
            <Navbar
                location={{ pathname: '' }}
                history={{ push: () => {} }}
                match={match}
                dispatch={() => {}}
                collapsed={false}
            />
        );
    });

    it('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
