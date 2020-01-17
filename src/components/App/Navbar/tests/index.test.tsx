import React from 'react';
import { shallow } from 'enzyme';

import { Navbar } from '..';

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

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
