import React, { SyntheticEvent, FormEvent } from 'react';
import  { shallow, ShallowWrapper } from 'enzyme';

import { Login, LoginState } from '../Login';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

describe('the Login component', () => {
    let wrapper: ShallowWrapper;
    const dispatch = jest.fn();

    beforeEach(() => {
        wrapper = shallow(
            <Login
                dispatch={dispatch}
                loading={false}
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });

    test('should dispatch a FETCH_TOKEN action when submitting form', () => {
        const instance = wrapper.instance() as Login;
        const state: LoginState = {
            email: 'poney@is.magic',
            password: 'unicorn',
            rememberMe: false,
        }
        instance.setState(state);
        const event = {
            preventDefault: jest.fn(),
        } as unknown;

        instance.fetchToken(event as FormEvent);

        expect(dispatch).toHaveBeenCalledWith({
            type: 'FETCH_TOKEN',
            payload: state,
        });
    });

    test('should update email in state when calling handleEmail', () => {
        const instance = wrapper.instance() as Login;
        const event = {
            target: {
                value: 'poney@is.magic',
            },
        } as unknown;

        instance.handleEmail(event as SyntheticEvent);

        expect(instance.state).toEqual({
            email: 'poney@is.magic',
            password: '',
            rememberMe: false,
        });
    });
        
    test('should update password in state when calling handlePassword', () => {
        const instance = wrapper.instance() as Login;
        const event = {
            target: {
                value: 'unicorn',
            },
        } as unknown;

        instance.handlePassword(event as SyntheticEvent);

        expect(instance.state).toEqual({
            email: '',
            password: 'unicorn',
            rememberMe: false,
        });
    });

    test('should update rememberMe in state when calling handleRememberMe', () => {
        const instance = wrapper.instance() as Login;
        const event = {
            target: {
                checked: true,
            },
        } as unknown;

        instance.handleRememberMe(event as CheckboxChangeEvent);

        expect(instance.state).toEqual({
            email: '',
            password: '',
            rememberMe: true,
        });
    });
});
