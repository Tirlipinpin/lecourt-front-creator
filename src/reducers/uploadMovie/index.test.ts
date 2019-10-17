import uploadMovie, { defaultState } from '.';

describe('uploadMovie reducer', () => {
    it('should return initial state', () => {
        expect(uploadMovie(defaultState, {})).toEqual(defaultState);
    });

    it('should update persons when receiving FETCH_PERSONS_SUCCEEDED', () => {
        const action = {
            type: 'FETCH_PERSONS_SUCCEEDED',
            payload: [
                { personId: '42', name: 'laurent' },
            ],
        };

        expect(uploadMovie(defaultState, action)).toEqual({
            genres: [],
            persons: [{ personId: '42', name: 'laurent' }],
            visible: false,
        })
    });

    it('should update persons when receiving FETCH_GENRES_SUCCEEDED', () => {
        const action = {
            type: 'FETCH_GENRES_SUCCEEDED',
            payload: [
                { genreId: '42', name: 'laurent' },
            ],
        };

        expect(uploadMovie(defaultState, action)).toEqual({
            genres: [{ genreId: '42', name: 'laurent' }],
            persons: [],
            visible: false,
        })
    });

    it('should update visibility to true when receiving SHOW_UPLOAD_MOVIE_MODAL', () => {
        const action = {
            type: 'SHOW_UPLOAD_MOVIE_MODAL',
        };

        expect(uploadMovie(defaultState, action)).toEqual({
            genres: [],
            persons: [],
            visible: true,
        })
    });
});
