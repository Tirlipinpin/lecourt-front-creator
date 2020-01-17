import register, { defaultState } from '.';
import { REGISTER_USER, REGISTER_USER_SUCCEEDED, REGISTER_USER_FAILED } from './constants';

describe('register reducer', () => {
    test('should return initial state', () => {
        expect(register(defaultState, {})).toEqual(defaultState);
    });

    test('should start loading when register is triggered', () => {
        const action = {
            type: REGISTER_USER,
        };

        expect(register(defaultState, action)).toEqual({
            loading: true,
        });
    });

    test('should stop loading when register is successful', () => {
        const action = {
            type: REGISTER_USER_SUCCEEDED,
        };

        expect(register(defaultState, action)).toEqual({
            loading: false,
        });
    });

    test('should return an error state when register fails', () => {
        const action = {
            type: REGISTER_USER_FAILED,
            payload: 'error message',
        };

        expect(register(defaultState, action)).toEqual({
            loading: false,
        });
    });
});
