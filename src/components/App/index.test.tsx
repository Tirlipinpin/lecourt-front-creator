import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { App } from '.';
import { ILoginStore } from '../../reducers/login';
import styles from './index.module.scss';

describe('The App component', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        const loginStore: ILoginStore = {
            token: 'something',
            loading: false,
        };

        wrapper = shallow(
            <App
                match={{}}
                history={{}}
                login={loginStore}
                dispatch={() => {}}
                location={{}}
                collapsed={false}
            />
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should redirect when user is not logged', () => {
        wrapper.setProps({
            login: {
                token: false,
            },
        });

        expect(wrapper.find('Redirect')).toHaveLength(1);
    });

    it('should display app when user is logged', () => {
        expect(wrapper.find(`.${styles.appContainer}`)).toHaveLength(1);
    });

    it('should collape navbar when collapsed is true', () => {
        wrapper.setProps({
            collapsed: true,
        });
        const Navbar = wrapper.find('Sider');

        expect(Navbar.props()).toMatchObject({
            collapsed: true,
        });
    });
});