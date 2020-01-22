import React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import { Router } from 'react-router';
import * as reactRedux from 'react-redux';
import { Store } from 'redux';
import { App } from '.';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';
import { ILoginStore } from '../../reducers/login';
import styles from './index.module.scss';

const { Provider } = reactRedux;

describe.skip('The App component', () => {
    let wrapper: ReactWrapper;
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
        const loginStore: ILoginStore = {
            token: 'something',
            loading: false,
        };
        const path = `/route/:id`;
        const match: match<{ id: string }> = {
            isExact: false,
            path,
            url: path.replace(':id', '1'),
            params: { id: "1" }
        };
        const store = {
            subscribe: jest.fn(),
            dispatch,
            getState: jest.fn(),
            replaceReducer: jest.fn(),
        } as unknown;

        wrapper = mount(
            <Provider store={store as Store}>
                <Router history={createMemoryHistory()}>
                    <App
                        match={match}
                        history={createMemoryHistory()}
                        login={loginStore}
                        location={createLocation(match.url)}
                    />
                </Router>
            </Provider>
        );
    });

    test('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });

    test('should redirect when user is not logged', () => {
        jest.spyOn(reactRedux, 'useSelector').mockReturnValue({ token: null });

        wrapper.render();
        console.log(wrapper.html());

        expect(wrapper.find('Redirect').exists()).toBe(true);
    });

    test('should display app when user is logged', () => {
        jest.spyOn(reactRedux, 'useSelector').mockReturnValue({ token: 'some-token' });

        wrapper.render();
        console.log(JSON.stringify(wrapper));

        expect(wrapper.find(`.${styles.appWrapper}`).exists()).toBe(true);
    });
});