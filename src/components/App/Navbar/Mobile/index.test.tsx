import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import { MobileNavbar } from '.';
import { NavbarStore } from '../../../reducers/navbar';

Enzyme.configure({ adapter: new Adapter() });

describe('The Profile component', () => {
    let wrapper;

    beforeEach(() => {
        const match = {
            url: 'poney',
        };

        const navbar: NavbarStore = {
            searchTerm: '',
        };

        wrapper = shallow(
            <MobileNavbar
                location={{ pathname: '' }}
                history={{ push: () => {} }}
                match={match}
                dispatch={() => {}}
                navbar={navbar}
            />
        );
    });

    it('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
