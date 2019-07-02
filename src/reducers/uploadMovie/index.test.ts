import uploadMovie, { defaultState } from '.';
import {
    FETCH_PERSONS,
    FETCH_PERSONS_SUCCEEDED,
    FETCH_PERSONS_FAILED,
} from './constantes';

describe('uploadMovie reducer', () => {
    it('should return initial state', () => {
        expect(uploadMovie(defaultState, {})).toEqual(defaultState);
    });

    it('should start loading when uploadMovie is triggered', () => {
        const action = {
            type: FETCH_PERSONS,
        };

        expect(uploadMovie(defaultState, action)).toEqual({
            loading: true,
            persons: [],
        });
    });

    it('should stop loading and have persons when uploadMovie is successful', () => {
        const action = {
            type: FETCH_PERSONS_SUCCEEDED,
            payload: {
                data: [
                  'poney',
                ],
            },
        };

        expect(uploadMovie(defaultState, action)).toEqual({
            loading: false,
            persons: ['poney'],
        });
    });

    it('should return an error state when uploadMovie fails', () => {
        const action = {
            type: FETCH_PERSONS_FAILED,
            payload: 'error message',
        };

        expect(uploadMovie(defaultState, action)).toEqual({
            loading: false,
            persons: [],
        });
    });
});
