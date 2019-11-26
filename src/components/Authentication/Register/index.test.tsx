import React, { FormEvent, SyntheticEvent } from 'react';
import  { shallow, ShallowWrapper } from 'enzyme';

import { Register, RegisterState } from '../Register';

describe('The Register component', () => {
    let wrapper: ShallowWrapper;
    const dispatch = jest.fn();

    beforeEach(() => {
        const store = {
            loading: false,
        };

        wrapper = shallow(
            <Register
                register={store}
                dispatch={dispatch}
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });

    test('should dispatch a REGISTER_USER action when submitting form', () => {
        const instance = wrapper.instance() as Register;
        const state: RegisterState = {
            displayName: 'poney',
            email: 'poney@is.magic',
            password: 'unicorn',
            passwordConfirm: 'unicorn',
        }
        instance.setState(state);
        const event = {
            preventDefault: () => {},
        } as FormEvent<any>;

        instance.registerUser(event);

        expect(dispatch).toHaveBeenCalledWith({
            type: 'REGISTER_USER',
            payload: state,
        });
    });

    test('should update displayName in state when calling handleDisplayName', () => {
        const instance = wrapper.instance() as Register;
        const event = {
            target: {
                value: 'chapeau',
            },
        } as unknown;

        instance.handleDisplayName(event as SyntheticEvent);

        expect(instance.state).toEqual({
            displayName: 'chapeau',
            email: '',
            password: '',
            passwordConfirm: '',
        });
    });

    test('should update email in state when calling handleEmail', () => {
        const instance = wrapper.instance() as Register;
        const event = {
            target: {
                value: 'poney@is.magic',
            },
        } as unknown;

        instance.handleEmail(event as SyntheticEvent);

        expect(instance.state).toEqual({
            displayName: '',
            email: 'poney@is.magic',
            password: '',
            passwordConfirm: '',
        });
    });
    
    test('should update password in state when calling handlePassword', () => {
        const instance = wrapper.instance() as Register;
        const event = {
            target: {
                value: 'unicorn',
            },
        } as unknown;

        instance.handlePassword(event as SyntheticEvent);

        expect(instance.state).toEqual({
            displayName: '',
            email: '',
            password: 'unicorn',
            passwordConfirm: '',
        });
    });

    test('should update passwordConfirm in state when calling handlePasswordConfirm', () => {
        const instance = wrapper.instance() as Register;
        const event = {
            target: {
                value: 'unicorn',
            },
        } as unknown;

        instance.handlePasswordConfirm(event as SyntheticEvent);

        expect(instance.state).toEqual({
            displayName: '',
            email: '',
            password: '',
            passwordConfirm: 'unicorn',
        });
    });
});
