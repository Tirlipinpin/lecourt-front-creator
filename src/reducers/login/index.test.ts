import login, { defaultState } from '.';
import { FETCH_TOKEN, FETCH_TOKEN_SUCCEEDED, FETCH_TOKEN_FAILED, LOGOUT } from './constants';

describe('login reducer', () => {
    test('should return initial state', () => {
        expect(login(defaultState, {})).toEqual(defaultState);
    });

    test('should start loading when fetch is triggered', () => {
        const action = {
            type: FETCH_TOKEN,
        };

        expect(login(defaultState, action)).toEqual({
            loading: true,
        });
    });

    test('should stop loading when fetch is successful', () => {
        const action = {
            type: FETCH_TOKEN_SUCCEEDED,
            payload: 'some token',
        };

        expect(login(defaultState, action)).toEqual({
            loading: false,
            token: 'some token',
        });
    });

    test('should return an error state when fetch fails', () => {
        const action = {
            type: FETCH_TOKEN_FAILED,
            payload: 'error message',
        };

        expect(login(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    test('should logout when LOGOUT action is triggered', () => {
        const action = {
            type: LOGOUT,
        };

        expect(login(defaultState, action)).toEqual({
            ...defaultState,
            token: null,
        });
    });
});
