import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Redirect } from 'react-router';

import { App } from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('The App component', () => {

    it('should render correctly', () => {
        const store = {
            token: 'something',
            loading: false,
        };

        const wrapper = shallow(
            <App
                match={{}}
                history={{}}
                login={store}
                dispatch={() => {}}
                location={{}}
            />
        );

        expect(wrapper.length).toBe(1);
    });

    it('should redirect when user is not logged', () => {
        const store = {
            token: null,
            loading: false,
        };

        const wrapper = shallow(
            <App
                match={{}}
                history={{}}
                login={store}
                dispatch={() => {}}
                location={{}}
            />
        );

        expect(wrapper.find(Redirect)).toHaveLength(1);
    });

    it('should display app when user is logged', () => {
        const store = {
            token: 'something',
            loading: false,
        };

        const wrapper = shallow(
            <App
                match={{}}
                history={{}}
                login={store}
                dispatch={() => {}}
                location={{}}
            />
        );

        expect(wrapper.find('.app-wrapper')).toHaveLength(1);
    });
});