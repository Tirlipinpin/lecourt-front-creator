import homepage, { defaultState } from '.';

describe('homepage reducer', () => {
    test('should return initial state', () => {
        expect(homepage(defaultState, {})).toEqual(defaultState);
    });
});

