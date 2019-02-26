import homepage, { defaultState } from '.';

describe('homepage reducer', () => {
    it('should return initial state', () => {
        expect(homepage(defaultState, {})).toEqual(defaultState);
    });
});

