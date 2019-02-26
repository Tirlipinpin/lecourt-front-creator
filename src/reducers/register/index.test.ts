import register, { defaultState } from '.';
import { REGISTER_USER, REGISTER_USER_SUCCEEDED, REGISTER_USER_FAILED } from './constantes';

describe('register reducer', () => {
    it('should return initial state', () => {
        expect(register(defaultState, {})).toEqual(defaultState);
    });

    it('should start loading when register is triggered', () => {
        const action = {
            type: REGISTER_USER,
        };

        expect(register(defaultState, action)).toEqual({
            loading: true,
        });
    });

    it('should stop loading when register is successful', () => {
        const action = {
            type: REGISTER_USER_SUCCEEDED,
        };

        expect(register(defaultState, action)).toEqual({
            loading: false,
        });
    });

    it('should return an error state when register fails', () => {
        const action = {
            type: REGISTER_USER_FAILED,
            payload: 'error message',
        };

        expect(register(defaultState, action)).toEqual({
            loading: false,
        });
    });
});
